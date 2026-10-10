#!/usr/bin/env python3
"""线上验证第二批新内容：bank 5 轮 / barber 5 轮 / gym / shopping"""
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

    # 1. 场景地图（切 Tab）
    c.evaluate("document.querySelectorAll('button').forEach(b=>{if(b.textContent.includes('场景冒险'))b.click()})")
    time.sleep(1.5)
    t = c.text()
    check("场景地图含健身房", "健身房" in t)
    check("场景地图含网购与退货", "网购" in t)
    check("银行卡片显示 5 轮", ("5 次光顾" in t) or ("5/5" in t))
    check("console errors = 0（地图）", len(c.console_errors()) == 0)

    # 2. 数据层验证
    r = c.evaluate("""
      (function(){
        const out={};
        for(const id of ['bank','barber','gym','shopping']){
          const sc=SCENES.find(s=>s.id===id);
          out[id]={v:sc.visits.length, s:sc.visits.reduce((a,v)=>a+v.steps.length,0), i:sc.items.length};
        }
        out.total={scenes:SCENES.length, steps:SCENES.reduce((a,s)=>a+(s.visits?s.visits.reduce((x,v)=>x+v.steps.length,0):(s.steps?s.steps.length:0)),0)};
        return JSON.stringify(out);
      })()
    """)
    check("bank 5 轮 30 步", '"bank":{"v":5,"s":30' in r)
    check("barber 5 轮 30 步", '"barber":{"v":5,"s":30' in r)
    check("gym 3 轮 18 步 26 词条", '"gym":{"v":3,"s":18,"i":26}' in r)
    check("shopping 3 轮 18 步 25 词条", '"shopping":{"v":3,"s":18,"i":25}' in r)
    check("全站 11 场景", '"scenes":11' in r)
    check("全站总步数 446", '"steps":446' in r)

    # 3. 真实点击流：进健身房场景启动剧情
    c.evaluate("""
      (function(){
        const cards=[...document.querySelectorAll('.scene-card')];
        const g=cards.find(x=>x.textContent.includes('健身房'));
        if(g) g.click();
      })()
    """)
    time.sleep(2)
    t3 = c.text()
    check("健身房场景页打开（办卡参观轮次）", "办卡" in t3 or "参观" in t3)
    c.evaluate("""
      (function(){
        const btns=[...document.querySelectorAll('button')];
        const b=btns.find(x=>x.textContent.includes('开始')||x.textContent.includes('继续'));
        if(b) b.click();
      })()
    """)
    time.sleep(4)
    t4 = c.text()
    check("健身房剧情可启动（选项出现）", "membership" in t4 or "办卡" in t4 or "会员" in t4)
    check("console errors = 0（剧情）", len(c.console_errors()) == 0)

    # 4. 网购退货场景页
    c.evaluate("(function(){const b=[...document.querySelectorAll('button')].find(x=>x.textContent.includes('返回')||x.textContent.includes('地图'));if(b)b.click()})()")
    time.sleep(1.5)
    c.evaluate("""
      (function(){
        const cards=[...document.querySelectorAll('.scene-card')];
        const s=cards.find(x=>x.textContent.includes('网购'));
        if(s) s.click();
      })()
    """)
    time.sleep(2)
    t5 = c.text()
    check("网购场景页打开（含下单咨询）", "下单" in t5 or "咨询" in t5)
    check("console errors = 0（全流程）", len(c.console_errors()) == 0)

fails = [n for n, ok in results if not ok]
print(f"\n结果: {len(results)-len(fails)} 通过 / {len(fails)} 失败")
sys.exit(1 if fails else 0)
