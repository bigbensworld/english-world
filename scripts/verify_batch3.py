#!/usr/bin/env python3
"""线上验证第三批：分组 UI + gym/shopping 5 轮 + 无跨场景污染"""
import sys
sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome
import time

BASE = "https://english-world.pages.dev"
results = []

def check(name, cond):
    results.append((name, bool(cond)))
    print(("✅ " if cond else "❌ ") + name)

with Chrome() as c:
    c.install_console_capture()
    c.navigate(BASE + "/?lang=zh-CN", settle=4)
    c.evaluate("document.querySelectorAll('button').forEach(b=>{if(b.textContent.includes('场景冒险'))b.click()})")
    time.sleep(1.5)
    t = c.text()

    # 1. 分组 UI
    check("分组标题：🏠 日常高频", "日常高频" in t)
    check("分组标题：✈️ 旅行出行", "旅行出行" in t)
    check("分组标题：🚑 应急保障", "应急保障" in t)
    check("分组计数：7 个场景", "7 个场景" in t)

    # 2. 数据层：补轮 + 无污染
    r = c.evaluate("""
      (function(){
        const out={};
        for(const s of SCENES){ out[s.id]={v:s.visits?s.visits.length:1, i:s.items?s.items.length:0}; }
        return JSON.stringify(out);
      })()
    """)
    check("gym 5 轮 42 词条", '"gym":{"v":5,"i":42}' in r)
    check("shopping 5 轮 41 词条", '"shopping":{"v":5,"i":41}' in r)
    check("airport 无污染 23 词条", '"airport":{"v":5,"i":23}' in r)
    check("hotel 无污染 24 词条", '"hotel":{"v":5,"i":24}' in r)
    r2 = c.evaluate("SCENES.reduce((a,s)=>a+(s.visits?s.visits.reduce((x,v)=>x+v.steps.length,0):(s.steps?s.steps.length:0)),0)")
    check("全站总步数 431（407+24）", r2 == 431)

    # 3. 分组内场景齐全（11 卡）
    cards = c.evaluate("document.querySelectorAll('.scene-card').length")
    check("场景卡片共 11 张", cards == 11)

    # 4. 点击流：健身房 5 轮 tab
    c.evaluate("""
      (function(){
        const cards=[...document.querySelectorAll('.scene-card')];
        const g=cards.find(x=>x.textContent.includes('健身房'));
        if(g) g.click();
      })()
    """)
    time.sleep(2)
    t3 = c.text()
    check("健身房场景页含 v5 文化轮次 tab", "健身文化与礼仪" in t3 or "文化与礼仪" in t3)
    check("console errors = 0", len(c.console_errors()) == 0)

fails = [n for n, ok in results if not ok]
print(f"\n结果: {len(results)-len(fails)} 通过 / {len(fails)} 失败")
sys.exit(1 if fails else 0)
