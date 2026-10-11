#!/usr/bin/env python3
"""真实交互链路验证：场景剧情中的吉祥物状态接线。

覆盖：
  - 切 tab / 进场景 / 返回 → idle（原站 game.js:204/620、vlog.js:733）
  - 开始剧情、选项就绪 → thinking（原站 game.js:348/451）
  - 答错 → sad 700（原站 game.js:516）
  - retry 阶段可重选并答对 → happy 700（原站 game.js:486 + 534 adv.lock=false）
  - 悬浮球在场景/词汇册等子视图下仍 fixed 常驻
"""
import functools
import http.server
import socketserver
import sys
import threading

sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome  # noqa: E402

DIST = "/Users/alice/WorkBuddy/3/english-world/packages/ui/dist"
PORT = 8811
fails = []


def ck(name, ok):
    print(("  ✅ " if ok else "  ❌ ") + name)
    if not ok:
        fails.append(name)


class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a):
        pass


httpd = socketserver.TCPServer(("127.0.0.1", PORT), functools.partial(Q, directory=DIST))
httpd.allow_reuse_address = True
threading.Thread(target=httpd.serve_forever, daemon=True).start()

with Chrome(window_size="1440,900") as c:
    c.install_console_capture()
    c.navigate(f"http://127.0.0.1:{PORT}/", settle=3)
    ev = lambda js: c.evaluate(js, await_promise=True)  # noqa: E731

    print("\n[1] 导航链路：切 tab → 进场景 → 开始剧情 → 选项就绪")
    r = ev("""(async () => {
      const w = ms => new Promise(r => setTimeout(r, ms));
      const st = () => document.querySelector('#mascot').dataset.state;
      const out = {};
      const tab = [...document.querySelectorAll('.home-tab')].find(e => e.textContent.includes('场景冒险'));
      tab.click(); await w(300);
      out.tab = st();
      out.cards = document.querySelectorAll('.scene-card').length;
      document.querySelector('.scene-card').click(); await w(400);
      out.enter = st();
      out.fixed = getComputedStyle(document.querySelector('#mascot')).position;
      const start = [...document.querySelectorAll('.btn')].find(e => /开始剧情|继续|再玩一次/.test(e.textContent));
      start.click(); await w(150);
      out.start = st();
      let waited = 0;
      while (!document.querySelectorAll('.option').length && waited < 6000) { await w(200); waited += 200; }
      out.task = st();
      out.opts = document.querySelectorAll('.option').length;
      return out;
    })()""")
    print("   raw:", r)
    ck("切 tab 后 idle", r["tab"] == "idle")
    ck("场景卡 15 个", r["cards"] == 15)
    ck("进入场景后 idle", r["enter"] == "idle")
    ck("悬浮球在场景页仍 fixed", r["fixed"] == "fixed")
    ck("开始剧情 → thinking", r["start"] == "thinking")
    ck("选项就绪 → thinking", r["task"] == "thinking")
    ck("有 3 个选项", r["opts"] == 3)

    print("\n[2] 答错 → sad，随后 retry 重选答对 → happy")
    r2 = ev("""(async () => {
      const w = ms => new Promise(r => setTimeout(r, ms));
      const st = () => document.querySelector('#mascot').dataset.state;
      const out = { log: [] };
      for (let round = 0; round < 6; round++) {
        let waited = 0;
        while (!document.querySelectorAll('.option').length && waited < 6000) { await w(200); waited += 200; }
        const opts = [...document.querySelectorAll('.option')];
        if (!opts.length) { out.log.push({ round, note: 'finish-or-idle' }); break; }
        // 先点最后一个选项（通常是干扰项）
        opts[opts.length - 1].click(); await w(120);
        const s1 = st();
        out.log.push({ round, clickedLast: true, state: s1 });
        if (s1 === 'sad') {
          out.sawSad = true;
          // retry 阶段：正确项带 .ok，点它应能答对
          const okEl = document.querySelector('.option.ok');
          if (!okEl) { out.log.push({ round, note: 'no .option.ok in retry' }); break; }
          okEl.click(); await w(150);
          const s2 = st();
          out.log.push({ round, clickedOk: true, state: s2 });
          if (s2 === 'happy') { out.sawHappyAfterRetry = true; out.retryWorks = true; }
          break;
        }
        if (s1 === 'happy') { out.sawHappy = true; break; }
      }
      return out;
    })()""")
    for line in r2.get("log", []):
        print("     ", line)
    ck("答错 → sad", bool(r2.get("sawSad")))
    ck("retry 可重选（未卡死）", bool(r2.get("retryWorks")))
    ck("重选答对 → happy", bool(r2.get("sawHappyAfterRetry")))

    print("\n[3] 返回首页 → idle")
    r3 = ev("""(async () => {
      const w = ms => new Promise(r => setTimeout(r, ms));
      const back = [...document.querySelectorAll('.btn')].find(e => e.textContent.includes('返回'));
      if (back) { back.click(); await w(350); }
      return { state: document.querySelector('#mascot').dataset.state,
               hasMascot: !!document.querySelector('#mascot') };
    })()""")
    print("   raw:", r3)
    ck("返回后仍存在悬浮球", r3["hasMascot"])
    ck("返回后 idle", r3["state"] == "idle")

    print("\n[4] 控制台")
    errs = c.console_errors()
    print("   errors:", errs)
    ck("console errors 为 0", len(errs) == 0)

httpd.shutdown()
print("\n" + "=" * 60)
if fails:
    print(f"❌ 失败 {len(fails)}: {fails}")
    sys.exit(1)
print("✅ 真实交互链路全部通过（导航/答错 sad/重选答对 happy/返回 idle）")