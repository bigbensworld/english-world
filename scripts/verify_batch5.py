#!/usr/bin/env python3
# 第五批内容线上验证 v2：修正 Tab 选择器
import sys, time
sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome

BASE = "https://english-world.pages.dev"
results = []
def check(name, ok, detail=""):
    results.append((name, ok, detail))
    print(("  ✅ " if ok else "  ❌ ") + name + (f"（{detail}）" if detail else ""))

with Chrome() as c:
    c.install_console_capture()
    c.navigate(BASE + "/?lang=zh-CN", settle=4)
    text = c.text()
    check("首页加载（含价值主张）", "不敢开口" in text or "英语" in text)

    # vlog 列表直接在首页慢速生活 tab 下（默认 tab）——检查新 3 集
    text = c.text()
    check("新 vlog 集：做晚餐出现", "做晚餐" in text or "Cooking Dinner" in text)
    check("新 vlog 集：打理花园出现", "打理花园" in text or "Gardening" in text)
    check("新 vlog 集：居家健身出现", "居家健身" in text or "Home Workout" in text)

    # 切到场景冒险 Tab
    c.evaluate("(function(){const t=[...document.querySelectorAll('.home-tab')].find(e=>e.textContent.includes('场景')); if(t) t.click();})()")
    time.sleep(1.5)
    text = c.text()
    check("场景分组：校园生活出现", "校园生活" in text)
    check("图书馆场景卡出现", "图书馆" in text)
    check("宠物医院场景卡出现", "宠物医院" in text)
    check("学校场景卡出现", "学校" in text)
    n = c.evaluate("document.querySelectorAll('.scene-card').length")
    check("场景卡总数 15", n == 15, str(n))

    # 进图书馆场景，验证 5 轮 tab
    c.evaluate("(function(){const cards=[...document.querySelectorAll('.scene-card')]; const t=cards.find(e=>e.textContent.includes('图书馆')); if(t) t.click();})()")
    time.sleep(1.5)
    text = c.text()
    check("图书馆页打开", "图书馆" in text)
    check("图书馆 5 轮 tab（第 5 次光顾）", "第 5 次" in text)
    # 启动剧情验证第一步渲染
    c.evaluate("(function(){const b=[...document.querySelectorAll('button')].find(e=>e.textContent.includes('开始')||e.textContent.includes('继续')); if(b) b.click();})()")
    time.sleep(3)
    text = c.text()
    check("图书馆 v1 剧情启动（台词出现）", "library card" in text or "借书证" in text or "图书馆" in text)

    # 数据层验证
    lib_info = c.evaluate("(function(){if(typeof SCENES==='undefined') return null; const s=SCENES.find(x=>x.id==='library'); return s ? s.visits.length + '轮/' + s.visits.reduce((a,v)=>a+v.steps.length,0) + '步/' + s.items.length + '词条' : 'not found';})()")
    check("图书馆数据层 5轮/31步/37词条", lib_info == "5轮/31步/37词条", str(lib_info))
    vet_info = c.evaluate("(function(){const s=SCENES.find(x=>x.id==='vet'); return s ? s.visits.length + '轮/' + s.visits.reduce((a,v)=>a+v.steps.length,0) + '步/' + s.items.length + '词条' : 'not found';})()")
    check("宠物医院数据层 5轮/33步/36词条", vet_info == "5轮/33步/36词条", str(vet_info))
    sch_info = c.evaluate("(function(){const s=SCENES.find(x=>x.id==='school'); return s ? s.visits.length + '轮/' + s.visits.reduce((a,v)=>a+v.steps.length,0) + '步/' + s.items.length + '词条' : 'not found';})()")
    check("学校数据层 5轮/29步/34词条", sch_info == "5轮/29步/34词条", str(sch_info))
    total = c.evaluate("(function(){return SCENES.length + '场景/' + SCENES.reduce((a,s)=>a+s.visits.reduce((x,v)=>x+v.steps.length,0),0) + '步/' + SCENES.reduce((a,s)=>a+(s.items?s.items.length:0),0) + '词条';})()")
    check("全站统计 15场景/564步/538词条", total == "15场景/564步/538词条", str(total))
    vn = c.evaluate("(function(){return typeof VLOGS!=='undefined' ? VLOGS.length : -1;})()")
    check("vlog 12 集", vn == 12, str(vn))
    vd = c.evaluate("(function(){return typeof VLOG_DICT!=='undefined' ? Object.keys(VLOG_DICT).length : -1;})()")
    check("VLOG_DICT 565 词条", vd == 565, str(vd))

    errs = c.console_errors()
    check("console errors = 0", len(errs) == 0, str(errs[:3]) if errs else "")

print()
passed = sum(1 for _, ok, _ in results if ok)
print(f"结果: {passed} 通过 / {len(results) - passed} 失败")
sys.exit(0 if passed == len(results) else 1)
