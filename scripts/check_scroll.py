#!/usr/bin/env python3
"""检查 Taro 站点滚动行为 + 各层容器高度/overflow。"""
import json
import sys
import time

sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome  # noqa: E402

TARO = "https://e998f1d8.english-world-taro.pages.dev/"
ORIG = "https://english-world.pages.dev/"

JS = r"""
(() => {
  const info = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      h: el.scrollHeight, ch: el.clientHeight,
      overflowY: cs.overflowY, position: cs.position,
      height: cs.height, maxH: cs.maxHeight,
    };
  };
  return {
    html: info('html'),
    body: info('body'),
    app: info('#app'),
    taroPage: info('.taro_page'),
    pagePad: info('.page-pad'),
    scrollY_before: window.scrollY,
    docScrollH: document.documentElement.scrollHeight,
    bodyScrollH: document.body.scrollHeight,
  };
})()
"""


def main():
    with Chrome() as c:
        for label, url in [("ORIG", ORIG), ("TARO", TARO)]:
            c.send("Emulation.setDeviceMetricsOverride",
                   {"width": 1440, "height": 900, "deviceScaleFactor": 1, "mobile": False})
            c.navigate(url, settle=3.5)
            d = c.evaluate(JS)
            print(f"\n===== {label} DESKTOP 1440x900 =====")
            print(json.dumps(d, ensure_ascii=False, indent=1))
            # 尝试滚动
            c.evaluate("window.scrollTo(0, 600)")
            time.sleep(0.6)
            print("after scrollTo(0,600): scrollY =", c.evaluate("window.scrollY"),
                  "| innerScroll =", c.evaluate("(() => { const e=document.scrollingElement; return e ? e.scrollTop : null; })()"))
            # 若 window 滚不动，试内部容器
            print("body scrollTop:", c.evaluate("document.body.scrollTop"))


if __name__ == "__main__":
    main()