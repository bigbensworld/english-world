#!/usr/bin/env python3
"""语法闯关 + 发音辨音模块 CDP 验证脚本"""
import sys, time
sys.path.insert(0, "/Users/alice/.workbuddy/skills/cdp-live-web-verify/scripts")
from cdp_client import Chrome

BASE = "http://localhost:8901/index.html"

def main():
    results = []
    def check(name, cond):
        results.append((name, cond))
        print(("  ✅ " if cond else "  ❌ ") + name)

    with Chrome(block_external=True) as c:
        c.install_console_capture()
        c.navigate(BASE, settle=2.0)

        print("== 1. 首页第三个 Tab ==")
        txt = c.text()
        check("首页有「🎓 语法闯关」Tab", "语法闯关" in txt)
        # 点语法 tab
        c.evaluate("""
          (() => {
            const tabs = document.querySelectorAll('.home-tab');
            for (const t of tabs) if (t.dataset.tab === 'grammar') t.click();
            return true;
          })()
        """)
        time.sleep(0.5)
        txt = c.text()
        check("语法面板渲染入口卡", "语法闯关" in txt and "发音辨音" in txt)
        check("入口卡显示进度 0/8", "0/8" in txt)
        check("辨音进度 0/8 组", "0/8 组已毕业" in txt)

        print("== 2. 进入语法世界 ==")
        c.evaluate("document.getElementById('geGrammar').click()")
        time.sleep(0.6)
        txt = c.text()
        check("语法世界标题", "语法闯关 · Grammar Quest" in txt)
        check("8 个关卡全部渲染", "Be 动词" in txt and "疑问句" in txt and "单复数" in txt)
        check("第 2 关锁定", "🔒" in txt)
        check("辨音区块渲染", "Sound Detectives" in txt or "发音辨音" in txt)

        print("== 3. 第 1 关修句师（fix）==")
        c.evaluate("document.querySelectorAll('.grammar-level')[0].click()")
        time.sleep(0.6)
        txt = c.text()
        check("修句师题面", "修句师" in txt)
        check("进度显示 1/8", "1/8" in txt)
        check("三个选项", c.evaluate("document.querySelectorAll('#gqOpts .adv-opt').length") == 3)

        print("== 4. 答对推进全流程 ==")
        # 循环答对 8 题混合题型
        for i in range(10):
            r = c.evaluate("""
              (() => {
                // fix 题：找 ok 选项（通过点击后反馈判断太慢，直接用数据定位）
                const lv = grammarState.currentLevel;
                if (!lv) return 'no-level';
                const q = lv.qs[grammarState.qIdx];
                if (!q) return 'done';
                if (q.type === 'fix') {
                  const opts = [...document.querySelectorAll('#gqOpts .adv-opt')];
                  const target = opts.find(o => o.textContent.includes(q.options.find(x => x.ok).text));
                  if (target) { target.click(); return 'fix-ok'; }
                  return 'fix-noopt';
                } else if (q.type === 'factory') {
                  // 依次点击 answer 里的词
                  const words = q.answer.split(' ');
                  for (const w of words) {
                    const pool = [...document.querySelectorAll('.factory-word')];
                    const el = pool.find(e => !e.classList.contains('used') && e.textContent === w);
                    if (el) el.click(); else return 'factory-noword:' + w;
                  }
                  document.getElementById('factoryCheck').click();
                  return 'factory-ok';
                } else if (q.type === 'detective') {
                  if (q.bad === null) {
                    // 陷阱题：点第一个词即可触发提示并推进
                    document.querySelector('.detective-word').click();
                    return 'trap-ok';
                  }
                  const toks = [...document.querySelectorAll('.detective-word')];
                  const target = toks.find(e => e.textContent.replace(/[.,!?]/g, '') === q.bad.split(' ')[0]);
                  if (target) { target.click(); return 'det-ok'; }
                  return 'det-noword:' + q.bad;
                }
                return 'unknown';
              })()
            """)
            if r == 'done':
                break
            if not r or not str(r).endswith('-ok'):
                check("题型交互 " + str(i) + " (" + str(r) + ")", False)
                return finish(results)
            time.sleep(2.3)  # 等待反馈 + 自动推进
        txt = c.text()
        check("通关结算页", ("通关！" in txt or "差一点点" in txt) and "返回闯关地图" in txt)

        print("== 5. 通关持久化 + 解锁 ==")
        saved = c.evaluate("JSON.parse(localStorage.getItem('englishWorldV2')).grammarDone")
        check("be-verbs 通关已存", saved and saved.get("be-verbs") is True if isinstance(saved, dict) else False)
        # 真实路径：刷新页面后（grammarLoad 重新读档）第二关应解锁
        c.navigate(BASE, settle=2.0)
        c.evaluate("""
          (() => {
            const tabs = document.querySelectorAll('.home-tab');
            for (const t of tabs) if (t.dataset.tab === 'grammar') t.click();
            return true;
          })()
        """)
        time.sleep(0.4)
        c.evaluate("document.getElementById('geGrammar').click()")
        time.sleep(0.6)
        r2 = c.evaluate("""
          (() => {
            const lv2 = document.querySelectorAll('.grammar-level')[1];
            return { cls: lv2.className, meta: lv2.querySelector('.gl-meta').textContent };
          })()
        """)
        check("刷新后第 2 关已解锁", isinstance(r2, dict) and "locked" not in r2.get("cls", ""))

        print("== 6. 发音辨音 ==")
        c.evaluate("document.querySelectorAll('.sound-group')[0].click()")
        time.sleep(0.6)
        txt = c.text()
        check("辨音题面", "听声音" in txt and "播放" in txt)
        check("两个词选项", c.evaluate("document.querySelectorAll('.sound-opt').length") == 2)
        check("进度 1/6", "1/6" in txt)
        r = c.evaluate("""
          (() => {
            const opts = [...document.querySelectorAll('.sound-opt')];
            const t = opts.find(o => o.textContent.trim() === grammarState._target);
            if (t) { t.click(); return 'ok'; }
            return 'notfound';
          })()
        """)
        check("答对辨音题", r == 'ok')
        time.sleep(1.6)

        print("== 7. 返回地图不炸 ==")
        c.evaluate("document.getElementById('sqExit').click()")
        time.sleep(0.5)
        c.evaluate("document.getElementById('grammarBack').click()")
        time.sleep(0.5)
        txt = c.text()
        check("回到首页地图", "慢速生活" in txt and "场景冒险" in txt)

        errs = c.console_errors()
        check("console 0 错误", len(errs) == 0)
        if errs:
            for e in errs[:5]:
                print("    ERROR:", e[:150])

    # 合并两次会话的 console 错误检查
    return finish(results)

def finish(results):
    n_ok = sum(1 for _, c in results if c)
    print("")
    print(f"结果: {n_ok}/{len(results)} 通过")
    return 0 if n_ok == len(results) else 1

if __name__ == "__main__":
    sys.exit(main())
