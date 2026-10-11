#!/usr/bin/env python3
"""线上验证第六批 3 场景：书店/租车/药店（双站）"""
import sys, time, json
sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome

results = []
def check(name, cond, extra=""):
    results.append((name, bool(cond), extra))
    print(("  ✅ " if cond else "  ❌ ") + name + (f" ({extra})" if extra else ""))

for url, label in [("https://english-world.pages.dev", "vanilla"), ("https://english-world-taro.pages.dev", "taro")]:
    print(f"\n===== {label}: {url} =====")
    with Chrome() as c:
        c.install_console_capture()
        c.navigate(url + "/?lang=zh-CN", settle=4)
        # 切到场景冒险 tab（默认慢速生活）
        c.evaluate("(function(){const t=[...document.querySelectorAll('.home-tab')].find(e=>e.textContent.includes('场景')); if(t) t.click();})()")
        time.sleep(1.5)
        # 1. 场景卡数
        n = c.evaluate("document.querySelectorAll('.scene-card').length")
        check("场景卡 18 张", n == 18, str(n))
        # 2. 新场景卡存在
        for kw in ["书店", "租车", "药店"]:
            found = c.evaluate(f"document.body.innerText.includes('{kw}')")
            check(f"地图含「{kw}」", found)
        # 3. 分组数量
        gn = c.evaluate("document.querySelectorAll('.scene-group-head').length")
        check("分组标题 4 个", gn == 4, str(gn))
        # 4. 数据层统计
        stats = c.evaluate("""(function(){try{let v=0,s=0,i=0;for(const sc of SCENES){v+=sc.visits.length;i+=sc.items.length;for(const x of sc.visits)s+=x.steps.length}return JSON.stringify({scenes:SCENES.length,visits:v,steps:s,items:i})}catch(e){return 'ERR:'+e.message}})()""")
        if stats and stats.startswith('{'):
            d = json.loads(stats)
            check("数据层 18 场景", d["scenes"] == 18, str(d["scenes"]))
            check("数据层 100 轮", d["visits"] == 100, str(d["visits"]))
            check("数据层 662 步", d["steps"] == 662, str(d["steps"]))
            check("数据层 619 词条", d["items"] == 619, str(d["items"]))
        else:
            check("数据层统计", False, str(stats)[:80])
        # 5. 进入药店场景看轮次 tab
        c.evaluate("(function(){const card=[...document.querySelectorAll('.scene-card')].find(x=>x.innerText.includes('药店')); if(card) card.click();})()")
        time.sleep(1.5)
        vt = c.evaluate("document.querySelectorAll('.visit-tab').length")
        vl = c.evaluate("document.querySelectorAll('.visit-tab.locked').length")
        check("药店 5 个轮次 tab", vt == 5, str(vt))
        check("默认锁定 4 轮", vl == 4, str(vl))
        # 6. 开始剧情
        c.evaluate("(function(){const btn=[...document.querySelectorAll('button, .btn')].find(x=>/开始|继续/.test(x.innerText)); if(btn) btn.click();})()")
        time.sleep(3.0)
        body = c.evaluate("document.body.innerText.length")
        check("剧情启动（页面有内容）", body and body > 500, str(body))
        # console errors
        errs = c.get_console_errors() if hasattr(c, 'get_console_errors') else []
        check("console errors = 0", len(errs) == 0, str(len(errs)))

print(f"\n==== 结果: {sum(1 for _,c,_ in results if c)}/{len(results)} 通过 ====")
sys.exit(0 if all(c for _,c,_ in results) else 1)
