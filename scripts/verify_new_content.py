#!/usr/bin/env python3
"""线上验证 english-world 新内容：vlog 6 集 / bank / barber / transport v4v5"""
import sys
sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome

BASE = "https://english-world.pages.dev"
results = []

def check(name, cond):
    results.append((name, bool(cond)))
    print(("✅ " if cond else "❌ ") + name)

with Chrome() as c:
    c.install_console_capture()
    c.navigate(BASE + "/?lang=zh-CN", settle=4)

    # 1. 首页：vlog tab 集数（新访客默认慢速生活）
    t = c.text()
    check("首页含新 vlog 集 Grocery Run", "Grocery Run" in t)
    check("首页含新 vlog 集 Doing Laundry", "Doing Laundry" in t)
    check("首页含新 vlog 集 Cleaning the House", "Cleaning the House" in t)
    check("console errors = 0（首页）", len(c.console_errors()) == 0)

    # 2. 切到场景冒险 tab，验证 9 场景
    c.evaluate("document.querySelectorAll('[data-tab],.tab-btn,button').forEach(b=>{if(b.textContent.includes('场景冒险'))b.click()})")
    import time; time.sleep(1.5)
    t2 = c.text()
    check("场景地图含银行", "银行" in t2)
    check("场景地图含理发店", "理发店" in t2)

    # 3. 进入银行场景（数据层验证，避免点击流）
    r = c.evaluate("""
      (function(){
        const sc = SCENES.find(s=>s.id==='bank');
        return JSON.stringify({visits:sc.visits.length, steps:sc.visits.reduce((a,v)=>a+v.steps.length,0), items:sc.items.length, v1title:sc.visits[0].title});
      })()
    """)
    check("bank 场景数据层 3 轮", '"visits":3' in r)
    check("bank 场景数据层 18 步", '"steps":18' in r)
    check("bank 25 词条", '"items":25' in r)

    # 4. barber 场景
    r2 = c.evaluate("""
      (function(){
        const sc = SCENES.find(s=>s.id==='barber');
        return JSON.stringify({visits:sc.visits.length, steps:sc.visits.reduce((a,v)=>a+v.steps.length,0), items:sc.items.length});
      })()
    """)
    check("barber 场景 3 轮 18 步 24 词条", '"visits":3' in r2 and '"steps":18' in r2 and '"items":24' in r2)

    # 5. transport 5 轮
    r3 = c.evaluate("""
      (function(){
        const sc = SCENES.find(s=>s.id==='transport');
        return JSON.stringify({visits:sc.visits.length, steps:sc.visits.reduce((a,v)=>a+v.steps.length,0)});
      })()
    """)
    check("transport 5 轮 36 步", '"visits":5' in r3 and '"steps":36' in r3)

    # 6. vlog 数据层 6 集 + 新 anim 类存在
    r4 = c.evaluate("""
      (function(){
        return JSON.stringify({vlogs:VLOGS.length, ids:VLOGS.map(v=>v.id).join(','), dict:Object.keys(VLOG_DICT).length});
      })()
    """)
    check("vlog 6 集", '"vlogs":6' in r4)
    check("新集 ids 正确", 'grocery' in r4 and 'laundry' in r4 and 'cleaning' in r4)
    check("VLOG_DICT 扩容（>250）", c.evaluate("(Object.keys(VLOG_DICT).length)") > 250)

    # 7. 真实点击流：进入银行 v1 第一步可玩（点击场景卡）
    c.evaluate("""
      (function(){
        const cards=[...document.querySelectorAll('.scene-card')];
        const bank=cards.find(x=>x.textContent.includes('银行'));
        if(bank) bank.click();
      })()
    """)
    time.sleep(2)
    t3 = c.text()
    check("银行场景页打开（含开户轮次）", "开户" in t3)
    check("console errors = 0（银行场景）", len(c.console_errors()) == 0)

    # 8. 启动剧情验证一步
    c.evaluate("""
      (function(){
        const btns=[...document.querySelectorAll('button')];
        const b=btns.find(x=>x.textContent.includes('开始')||x.textContent.includes('继续'));
        if(b) b.click();
      })()
    """)
    time.sleep(4)
    t4 = c.text()
    check("银行剧情可启动（出现选项）", "I'd like to open" in t4 or "开一个" in t4 or "账户" in t4)
    check("console errors = 0（剧情运行）", len(c.console_errors()) == 0)

fails = [n for n, ok in results if not ok]
print(f"\n结果: {len(results)-len(fails)} 通过 / {len(fails)} 失败")
sys.exit(1 if fails else 0)
