#!/usr/bin/env python3
"""复现：Taro 版 vlog Quiz「全对毕业」路径 → 白屏？
方案：monkeypatch Audio 构造器抓 Quiz 自动播放的目标句 mp3 src → cardIdx → words[0] 匹配选项点击。
第一集 Morning Routine 7 张正常卡的 words[0]：alarm clock/open/brush/slice/pour/put on/step outside
"""
import sys, time
sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome

BASE = sys.argv[1] if len(sys.argv) > 1 else "https://english-world-taro.pages.dev"
CARD_WORDS = ["alarm clock", "open", "brush", "slice", "pour", "put on", "step outside"]

results = []
def check(name, cond, extra=""):
    results.append((name, bool(cond), extra))
    print(("  ✅ " if cond else "  ❌ ") + name + (f" ({extra})" if extra else ""))

with Chrome() as c:
    c.install_console_capture()
    c.navigate(BASE, settle=4)

    print("== 1. 打开第一集 ==")
    c.evaluate("(function(){const el=[...document.querySelectorAll('.home-tab')].find(x=>x.textContent.includes('慢速生活')); if(el) el.click();})()")
    time.sleep(0.8)
    c.evaluate("(function(){const el=[...document.querySelectorAll('.vlog-set')][0]; if(el) el.click();})()")
    time.sleep(1.2)

    # monkeypatch Audio 抓 src
    c.evaluate("(function(){window.__asrcs=[];const OA=window.Audio;window.Audio=function(s){try{window.__asrcs.push(String(s));}catch(e){} return new OA(s);};})()")

    # 快进到最后一张卡解锁 Quiz
    for _ in range(20):
        t = c.evaluate("(function(){const t2=document.body.innerText; return t2.includes('去闯 Quiz')||t2.includes('再闯一次');})()")
        if t: break
        c.evaluate("(function(){const el=[...document.querySelectorAll('*')].find(x=>x.childElementCount===0&&(x.textContent||'').includes('下一张')); if(el) el.click();})()")
        time.sleep(0.35)

    print("== 2. 进 Quiz，全对作答 ==")
    c.evaluate("(function(){const el=[...document.querySelectorAll('*')].find(x=>x.childElementCount===0&&/去闯 Quiz|再闯一次/.test(x.textContent||'')); if(el) el.click();})()")

    for q in range(6):
        time.sleep(1.8)  # 等 useEffect 900ms 延迟 + 索引加载 + 播放
        state = c.evaluate("(function(){const t2=document.body.innerText; if(t2.includes('本集毕业')||t2.includes('差一点点')) return 'done'; if(t2.includes('QUIZ TIME')) return 'quiz'; return 'other';})()")
        if state == "done":
            break
        if state != "quiz":
            print(f"    ⚠️ 非预期状态: {state}")
            break
        # 抓最新 mp3 src → cardIdx
        info = c.evaluate("(function(){const a=window.__asrcs||[];const mp3s=a.filter(s=>s.includes('/audio/vlog/'));const last=mp3s[mp3s.length-1]||'';const m=last.match(/_([0-9]+)\\.mp3/);return JSON.stringify({last,m:m?m[1]:null});})()")
        print(f"    audio src: {info}")
        import json as _j
        try:
            d = _j.loads(info)
            ci = int(d["m"]) if d.get("m") is not None else None
        except Exception:
            ci = None
        if ci is None or ci >= len(CARD_WORDS):
            print("    ⚠️ 无法定位目标卡，点第一项")
            c.evaluate("(function(){const el=[...document.querySelectorAll('.option')][0]; if(el) el.click();})()")
            continue
        word = CARD_WORDS[ci]
        clicked = c.evaluate(f"""(function(){{
          const els=[...document.querySelectorAll('.option')];
          const el=els.find(x=>x.textContent.includes('{word}'));
          if(el){{el.click();return true;}} return false;
        }})()""")
        print(f"    Q{q+1}: target card {ci} ({word}) clicked={clicked}")

    time.sleep(1.5)
    print("== 3. 毕业结算页渲染状态 ==")
    vis = c.evaluate("(function(){const p=document.querySelector('.taro_page'); if(!p) return 'no-page'; const cs=getComputedStyle(p); const r=p.getBoundingClientRect(); return cs.display+'/'+Math.round(r.height);})()")
    check("结算页视觉可见", vis.split("/")[0] != "none" and int(vis.split("/")[1]) > 100, vis)
    txt = c.text()
    is_pass = "本集毕业" in txt
    check("结算文案出现（毕业/差一点）", is_pass or "差一点点" in txt, txt[:80])
    errs = c.console_errors()
    check("console 0 错误", len(errs) == 0, "; ".join(errs[:3])[:200])
    if is_pass:
        print("    ✅ 已走到全对毕业路径且未白屏")
    else:
        print("    ⚠️ 未走到毕业路径（答题匹配失败？），白屏结论待定")

    ok = sum(1 for _, v, _ in results if v)
    print(f"\n{ok}/{len(results)} passed")
