#!/usr/bin/env python3
"""深入检查 Taro 首页 DOM 结构：tab、场景组、类名。"""
import json
import sys

sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome  # noqa: E402

TARO = "https://e998f1d8.english-world-taro.pages.dev/"

JS = r"""
(() => {
  const cls = {};
  document.querySelectorAll('*').forEach(el => {
    el.classList.forEach(c => { cls[c] = (cls[c]||0)+1; });
  });
  const keys = Object.keys(cls).sort((a,b)=>cls[b]-cls[a]).slice(0, 60);
  const tabTexts = [...document.querySelectorAll('.home-tab')].map(e => e.innerText.trim());
  const groupTitles = [...document.querySelectorAll('.scene-group-title, .group-title, .sg-title')].map(e=>e.innerText.trim());
  const main = document.querySelector('#app') || document.body;
  return {
    classTop: keys.map(k => k + ':' + cls[k]),
    tabTexts,
    groupTitles,
    bodyText: (document.body.innerText||'').slice(0, 1200),
    appChildren: main.children.length,
    appHTMLlen: main.innerHTML.length,
  };
})()
"""


def main():
    with Chrome() as c:
        c.send("Emulation.setDeviceMetricsOverride",
               {"width": 1440, "height": 900, "deviceScaleFactor": 1, "mobile": False})
        c.navigate(TARO, settle=4)
        print(json.dumps(c.evaluate(JS), ensure_ascii=False, indent=1))
        print("\n--- click SCENES tab (index 1) ---")
        c.evaluate("(() => { const t=document.querySelectorAll('.home-tab'); if(t[1]) t[1].click(); return t.length; })()")
        import time
        time.sleep(2.5)
        out = c.evaluate(JS)
        print(json.dumps({k: out[k] for k in ("classTop", "groupTitles")}, ensure_ascii=False, indent=1))
        print("bodyText:", (out.get("bodyText") or "")[:600])
        print("sceneCards:", c.evaluate("document.querySelectorAll('.scene-card').length"))
        print("sc-cover bg:", c.evaluate("(() => { const e=document.querySelector('.sc-cover'); return e?getComputedStyle(e).background.slice(0,120):null; })()"))
        print("sc-art fs:", c.evaluate("(() => { const e=document.querySelector('.sc-art'); return e?getComputedStyle(e).fontSize:null; })()"))


if __name__ == "__main__":
    main()