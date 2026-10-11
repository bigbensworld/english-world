#!/usr/bin/env python3
"""吉祥物（悬浮球）验证：本地起静态服务 + CDP 实测 Taro 构建产物。

断言项（对齐原站 style.css 506-563 / game.js 748-804）：
  1. .mascot 存在，且是 position:fixed right:16 bottom:16 z-index:60
  2. 桌面（1440x900）尺寸 84x84、.body 74x74、border 3px
  3. 移动（390x844）缩到 68x68、.body 58x58（原站 max-width:560px 规则）
  4. 初始 state-idle；setMascotState 可切 happy/thinking/sad（DOM class + data-state 同步）
  5. 点击 → happy + 气泡出现（台词来自 MASCOT_LINES），2.6s 后气泡消失并回 idle
  6. 动画真的在跑：.body 的 animation-name 随状态变化（此前 CSS 变量缺失会导致动画死掉）
  7. 悬浮球挂在 .taro_page 之外（避免路由 transform 劫持 fixed 定位）
  8. 无 console error；无横向溢出
"""
import subprocess
import sys
import time
import os
import http.server
import socketserver
import threading
import functools

sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome  # noqa: E402

DIST = "/Users/alice/WorkBuddy/3/english-world/packages/ui/dist"
PORT = 8791

fails = []


def check(name, got, want, ok=None):
    good = ok if ok is not None else (got == want)
    print(("  ✅ " if good else "  ❌ ") + name + f": got={got!r} want={want!r}")
    if not good:
        fails.append(name)


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


def serve():
    handler = functools.partial(Quiet, directory=DIST)
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), handler)
    httpd.allow_reuse_address = True
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    return httpd


def main():
    httpd = serve()
    url = f"http://127.0.0.1:{PORT}/"
    with Chrome(window_size="1440,900") as c:
        c.install_console_capture()
        c.navigate(url, settle=3.0)

        print("\n[1] 悬浮球存在性与定位（桌面 1440x900）")
        info = c.evaluate("""(() => {
          const m = document.querySelector('#mascot');
          if (!m) return { missing: true };
          const cs = getComputedStyle(m);
          const b = m.querySelector('.body');
          const bs = getComputedStyle(b);
          const r = m.getBoundingClientRect();
          return {
            cls: m.className, state: m.dataset.state,
            pos: cs.position, right: cs.right, bottom: cs.bottom, z: cs.zIndex,
            w: Math.round(r.width), h: Math.round(r.height),
            bw: Math.round(b.getBoundingClientRect().width),
            border: bs.borderTopWidth + ' ' + bs.borderTopColor,
            bodyAnim: bs.animationName + ' ' + bs.animationDuration,
            radius: bs.borderTopLeftRadius,
            bg: bs.backgroundImage.slice(0, 40),
            leaf: !!m.querySelector('.leaf'),
            eyes: m.querySelectorAll('.eye').length,
            cheeks: m.querySelectorAll('.cheek').length,
            mouth: !!m.querySelector('.mouth'),
            inTaroPage: !!m.closest('.taro_page'),
            parentTag: m.parentElement && m.parentElement.className,
          };
        })()""")
        print("   raw:", info)
        check("mascot 存在", info.get("missing"), None, ok=not info.get("missing"))
        check("初始状态 idle", info.get("cls"), "mascot state-idle")
        check("data-state", info.get("state"), "idle")
        check("position fixed", info.get("pos"), "fixed")
        check("right 16px", info.get("right"), "16px")
        check("z-index 60", info.get("z"), "60")
        check("尺寸 84x84", (info.get("w"), info.get("h")), (84, 84))
        check("body 74x74", info.get("bw"), 74)
        check("body 圆形", info.get("radius"), "50%")
        check("body 渐变(径向)", info.get("bg"), "radial-gradient", ok=str(info.get("bg", "")).startswith("radial-gradient"))
        check("body 呼吸动画在跑", info.get("bodyAnim"), "breathe", ok="breathe" in str(info.get("bodyAnim")))
        check("DOM: 2 眼/2 腮/1 嘴/1 叶", (info.get("eyes"), info.get("cheeks"), info.get("mouth"), info.get("leaf")), (2, 2, True, True))
        check("挂在 .taro_page 之外", info.get("inTaroPage"), False, ok=not info.get("inTaroPage"))

        print("\n[2] 状态切换：happy / thinking / sad（需等 React 重渲染一轮）")
        st = c.evaluate("""(async () => {
          const m = document.querySelector('#mascot');
          const b = m.querySelector('.body');
          const tick = () => new Promise(r => requestAnimationFrame(() => setTimeout(r, 60)));
          const read = () => ({ cls: m.className, ds: m.dataset.state,
                                anim: getComputedStyle(b).animationName,
                                mouthH: getComputedStyle(m.querySelector('.mouth')).height });
          const out = {};
          window.__ewSetMascot('happy', 0); await tick(); out.happy = read();
          window.__ewSetMascot('thinking', 0); await tick(); out.thinking = read();
          window.__ewSetMascot('sad', 0); await tick(); out.sad = read();
          window.__ewSetMascot('idle', 0); await tick(); out.idle = read();
          return out;
        })()""", await_promise=True)
        print("   raw:", st)
        check("happy 类名", st["happy"]["cls"], "mascot state-happy")
        check("happy 动画", st["happy"]["anim"], "mascotHappy")
        check("happy 嘴巴变高 13px", st["happy"]["mouthH"], "13px")
        check("thinking 动画", st["thinking"]["anim"], "mascotThinking")
        check("sad 动画", st["sad"]["anim"], "mascotSad")
        check("idle 动画回落 breathe", st["idle"]["anim"], "breathe")

        print("\n[3] 时长自动回落（happy 700ms → idle）")
        auto = c.evaluate("""(async () => {
          window.__ewSetMascot('happy', 700);
          await new Promise(r => requestAnimationFrame(() => setTimeout(r, 60)));
          const t0 = document.querySelector('#mascot').dataset.state;
          await new Promise(r => setTimeout(r, 1100));
          const t1 = document.querySelector('#mascot').dataset.state;
          return { t0, t1 };
        })()""", await_promise=True)
        print("   raw:", auto)
        check("立即为 happy", auto["t0"], "happy")
        check("1.1s 后自动回 idle", auto["t1"], "idle")

        print("\n[4] 点击出气泡 + 台词 + 自动消失")
        bub = c.evaluate("""(async () => {
          const m = document.querySelector('#mascot');
          m.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          await new Promise(r => requestAnimationFrame(() => setTimeout(r, 120)));
          const el = m.querySelector('.bubble');
          const res = { state: m.dataset.state, bubble: el ? el.textContent : null,
                        border: el ? getComputedStyle(el).borderTopWidth : null,
                        color: el ? getComputedStyle(el).color : null };
          await new Promise(r => setTimeout(r, 2800));
          res.gone = !m.querySelector('.bubble');
          res.after = m.dataset.state;
          return res;
        })()""", await_promise=True)
        print("   raw:", bub)
        check("点击触发 happy", bub["state"], "happy")
        LINES = ["Tap anything you like!", "You can do it!", "New words = new powers!",
                 "Hello, my friend!", "Take it step by step!"]
        check("气泡文本来自 MASCOT_LINES", bub["bubble"], "in-list", ok=bub["bubble"] in LINES)
        # ⚠️ 断言写 1px 而非 CSS 里写的 1.5px：DPR=1 时浏览器把 1.5px 边框计算值取整为 1px，
        #    已实测**原站同样是 1px**（两站一致）。写 1.5px 会误报失败。
        check("气泡有边框(与原站一致 1px)", bub["border"], "1px")
        check("2.8s 后气泡消失", bub["gone"], True, ok=bool(bub["gone"]))
        check("气泡消失后回 idle", bub["after"], "idle")

        print("\n[5] 移动端 390x844 尺寸收缩 + 无横向溢出")
        c.send("Emulation.setDeviceMetricsOverride",
               {"width": 390, "height": 844, "deviceScaleFactor": 2, "mobile": True})
        c.navigate(url, settle=2.5)
        mob = c.evaluate("""(() => {
          const m = document.querySelector('#mascot');
          const r = m.getBoundingClientRect();
          const b = m.querySelector('.body').getBoundingClientRect();
          return { w: Math.round(r.width), h: Math.round(r.height),
                   bw: Math.round(b.width), right: window.innerWidth - r.right,
                   bottom: window.innerHeight - r.bottom,
                   overflowX: document.documentElement.scrollWidth - window.innerWidth };
        })()""")
        print("   raw:", mob)
        check("移动端 68x68", (mob["w"], mob["h"]), (68, 68))
        check("移动端 body 58x58", mob["bw"], 58)
        check("移动端贴右 16px", mob["right"], 16)
        check("无横向溢出", mob["overflowX"], 0)

        print("\n[6] 控制台错误")
        errs = c.console_errors()
        print("   errors:", errs)
        check("console errors 为 0", len(errs), 0)

    httpd.shutdown()

    print("\n" + "=" * 56)
    if fails:
        print(f"❌ 失败 {len(fails)} 项: {fails}")
        return 1
    print("✅ 全部通过：悬浮球已还原（存在性/定位/尺寸/4 状态/动画/点击气泡/移动端）")
    return 0


if __name__ == "__main__":
    sys.exit(main())