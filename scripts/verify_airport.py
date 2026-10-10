#!/usr/bin/env python3
"""线上验证：机场场景（5 场景地图 + 机场 v1 值机全流程 + 安检/登机文案 + console errors=0）"""
import sys
sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome

BASE = "https://english-world.pages.dev"
results = []

def check(name, cond):
    results.append((name, cond))
    print(("  ✅ " if cond else "  ❌ ") + name)

with Chrome() as c:
    c.install_console_capture()

    # --- 用例 1：首页地图有 5 个场景卡 + 机场卡存在 ---
    c.navigate(BASE + "/?lang=zh-CN", settle=4)
    text = c.text()
    check("首页含「机场」场景卡", "机场" in text)
    check("首页含登机牌词条文案（机场卡描述/标题）", "值机" in text or "✈️" in text)
    scene_count = c.evaluate("""
      (function(){
        var cards = document.querySelectorAll('.scene-card');
        return cards.length;
      })()
    """)
    check("场景卡数量 = 5（实际 %s）" % scene_count, scene_count == 5)

    # --- 用例 2：进入机场场景（模拟点击卡片）→ 场景页出现机场 intro/3 轮 ---
    c.evaluate("""
      (function(){
        var cards = Array.prototype.slice.call(document.querySelectorAll('.scene-card'));
        var ap = cards.find(function(el){ return el.innerText.indexOf('机场') >= 0; });
        if (ap) ap.click();
        return !!ap;
      })()
    """)
    import time; time.sleep(3)
    text = c.text()
    check("机场场景页已打开（intro 出现）", "国际机场" in text or "值机" in text)
    check("机场场景页含 3 轮标题（值机托运/安检口/登机起飞）",
          ("值机托运" in text) and ("安检口" in text) and ("登机起飞" in text))

    # --- 用例 3：机场词条（词汇册数据层）15 个 ---
    item_count = c.evaluate("""
      (function(){
        if (typeof SCENES === 'undefined') return -1;
        var ap = SCENES.find(function(s){ return s.id === 'airport'; });
        return ap ? ap.items.length : -2;
      })()
    """)
    check("SCENES 里机场词条 = 15（实际 %s）" % item_count, item_count == 15)

    # --- 用例 4：机场 v1 值机剧情第 1 步（隐藏测试模式解锁 + 开始冒险）---
    # 点击场景标题 5 次解锁全部轮次（隐藏测试模式），再从数据层驱动一轮完整 v1
    flow_ok = c.evaluate("""
      (function(){
        try {
          var title = document.getElementById('sceneTitle');
          if (title) { for (var i=0;i<5;i++) title.click(); }
          return 'unlocked';
        } catch(e) { return 'err:' + e.message; }
      })()
    """)
    check("隐藏测试模式触发无异常（%s）" % flow_ok, flow_ok == "unlocked")
    import time; time.sleep(1.5)

    # 直接用游戏引擎跑 v1 全流程（数据层，不依赖动画时序）
    flow = c.evaluate("""
      (function(){
        try {
          enterScene('airport', 0);
          startAdventure();
          var steps = state.currentVisit.steps;
          var btn = { classList:{add:function(){}}, disabled:false, textContent:'',
                      querySelector:function(){return {onclick:null};}, querySelectorAll:function(){return [];},
                      children:[], appendChild:function(){} };
          var box = { children:[], appendChild:function(cc){ this.children.push(cc); },
                      querySelectorAll:function(){ return this.children; } };
          for (var i=0;i<steps.length;i++) {
            chooseOption(steps[i].options.find(function(o){return o.ok;}), btn, box, steps[i]);
            if (i < steps.length-1) nextStep();
          }
          finishAdventure();
          return 'ok:progress=' + state.progress['airport:v1'] + ',unlocked=' + state.unlockedVisits.airport +
                 ',phrases=' + Object.keys(state.phrases).filter(function(k){return k.indexOf('airport:v1:')===0;}).length;
        } catch(e) { return 'err:' + e.message; }
      })()
    """)
    print("  → v1 全流程结果: " + str(flow))
    check("机场 v1 值机 8 步全流程通关（progress=8）", str(flow).startswith("ok:progress=8,"))
    check("v1 通关后解锁数 ≥1（测试模式已预解锁，实际见输出）", "unlocked=" in str(flow) and int(str(flow).split("unlocked=")[1].split(",")[0]) >= 1)
    check("v1 语块 8 条入册（phrases=8）", "phrases=8" in str(flow))

    # --- 用例 5：v2 安检 + v3 登机数据层快速通关（解锁链完整）---
    flow23 = c.evaluate("""
      (function(){
        try {
          var btn = { classList:{add:function(){}}, disabled:false, textContent:'',
                      querySelector:function(){return {onclick:null};}, querySelectorAll:function(){return [];},
                      children:[], appendChild:function(){} };
          var box = { children:[], appendChild:function(cc){ this.children.push(cc); },
                      querySelectorAll:function(){ return this.children; } };
          var out = [];
          [1,2].forEach(function(vi){
            enterScene('airport', vi);
            startAdventure();
            var steps = state.currentVisit.steps;
            for (var i=0;i<steps.length;i++) {
              chooseOption(steps[i].options.find(function(o){return o.ok;}), btn, box, steps[i]);
              if (i < steps.length-1) nextStep();
            }
            finishAdventure();
            out.push('v' + (vi+1) + ':' + state.progress['airport:v' + (vi+1)]);
          });
          return 'ok:' + out.join(',') + ',unlocked=' + state.unlockedVisits.airport;
        } catch(e) { return 'err:' + e.message; }
      })()
    """)
    print("  → v2/v3 结果: " + str(flow23))
    check("机场 v2 安检 6 步 + v3 登机 7 步通关", str(flow23) == "ok:v2:6,v3:7,unlocked=2")
    check("3 轮全部通关（unlocked 封顶 2）", "unlocked=2" in str(flow23))

    # --- 用例 6：机场素材入册（boarding pass / tray 等 collected）---
    collected = c.evaluate("""
      (function(){
        var ids = ['airport:boardingpass','airport:luggage','airport:tray','airport:gate'];
        return ids.filter(function(k){ return state.collected[k]; }).length;
      })()
    """)
    check("机场订单/奖励素材词条已收集（4/4，实际 %s）" % collected, collected == 4)

    # --- 用例 7：console errors 必须为 0 ---
    errs = c.console_errors()
    check("console.error 累计 = 0（实际 %s）" % len(errs), len(errs) == 0)
    for e in errs[:5]:
        print("    ⚠️ " + e[:160])

failed = [n for n, ok in results if not ok]
print("")
print("结果: %d 通过 / %d 失败" % (len(results) - len(failed), len(failed)))
sys.exit(1 if failed else 0)
