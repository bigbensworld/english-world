#!/usr/bin/env python3
"""对比原始站 vs Taro 站的关键元素尺寸（桌面 + 移动）。"""
import json
import sys

sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome  # noqa: E402

ORIG = "https://english-world.pages.dev/"
TARO = "https://eb1a2c7b.english-world-taro.pages.dev/"

MEASURE_JS = r"""
(() => {
  const q = (s) => document.querySelector(s);
  const box = (s) => {
    const el = q(s);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      w: Math.round(r.width),
      h: Math.round(r.height),
      fs: cs.fontSize,
      pad: cs.padding,
      bg: cs.backgroundColor,
      color: cs.color,
      radius: cs.borderRadius,
      shadow: cs.boxShadow === 'none' ? 'none' : 'yes',
    };
  };
  const rootFs = getComputedStyle(document.documentElement).fontSize;
  const bodyFs = getComputedStyle(document.body).fontSize;
  const h1 = q('h1');
  return {
    rootFs, bodyFs,
    docW: document.documentElement.clientWidth,
    scrollW: document.documentElement.scrollWidth,
    scrollH: document.documentElement.scrollHeight,
    title: document.title,
    h1: h1 ? { text: h1.innerText.trim().slice(0, 30), fs: getComputedStyle(h1).fontSize,
               w: Math.round(h1.getBoundingClientRect().width) } : null,
    el: {
      brandBar: box('.brand-bar') || box('header'),
      hero: box('.hero'),
      mapTitle: box('.map-title'),
      tabs: box('.home-tabs') || box('.tabs-wrap'),
      vlogSet: box('.vlog-set'),
      sceneCard: box('.scene-card'),
      sceneCover: box('.sc-cover'),
      scArt: box('.sc-art'),
      pathNext: box('.path-next'),
      lpStep: box('.lp-step'),
    },
    counts: {
      vlogSets: document.querySelectorAll('.vlog-set').length,
      sceneCards: document.querySelectorAll('.scene-card').length,
      lpSteps: document.querySelectorAll('.lp-step').length,
      tabs: document.querySelectorAll('.home-tab').length,
    },
    overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  };
})()
"""


def measure(chrome, url, width, height, label):
    chrome.send(
        "Emulation.setDeviceMetricsOverride",
        {"width": width, "height": height, "deviceScaleFactor": 1, "mobile": width < 500},
    )
    chrome.navigate(url, settle=3.5)
    data = chrome.evaluate(MEASURE_JS)
    errs = chrome.console_errors(10)
    data["consoleErrors"] = errs
    print(f"\n===== {label} @ {width}x{height} =====")
    print(json.dumps(data, ensure_ascii=False, indent=1))
    return data


def main():
    with Chrome() as c:
        c.install_console_capture()
        for w, h, name in [(1440, 900, "DESKTOP"), (390, 844, "MOBILE")]:
            measure(c, ORIG, w, h, f"ORIG {name}")
            measure(c, TARO, w, h, f"TARO {name}")


if __name__ == "__main__":
    main()