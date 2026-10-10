#!/bin/bash
# 下载 Fluent Emoji 3D PNG（MIT, microsoft/fluentui-emoji@1ffb34c）
# raw.githubusercontent 被本地代理阻断，改走 GitHub Contents API
set -e
API="https://api.github.com/repos/microsoft/fluentui-emoji/contents/assets"
OUT="/Users/alice/WorkBuddy/3/english-world/assets/icons"

# 图标名 -> Fluent Emoji 资源目录名映射
items="Coffee:coffee Latte:latte?Tea:tea Cup With Straw:cupstraw
Shortcake:shortcake Croissant:croissant Cookie:cookie Cupcake:cupcake
Sandwich:sandwich Teacup Without Handle:teacup Menu:menu? Cook:cook
Red Apple:apple Banana:banana Grapes:grapes Glass Of Milk:glassmilk
Bread:bread Egg:egg Fish:fish Cheese Wedge:cheese Carrot:carrot
Broccoli:broccoli Tomato:tomato Shopping Cart:shoppingcart"

ok=0; fail=""
for pair in $items; do
  dir="${pair%%:*}"; name="${pair##*:}"
  # 处理占位项（无对应资源时跳过）
  if [[ "$name" == *"?"* ]]; then
    name="${name%\?}"
  fi
  file="${name}_3d.png"
  if [[ -s "$OUT/$file" ]]; then ok=$((ok+1)); continue; fi
  meta=$(curl -s --max-time 20 "$API/$dir/3D/${file}.png" 2>/dev/null || true)
  # 直接用 download_url 转 base64 blob 下载
  sha=$(curl -s --max-time 20 "$API/$dir/3D" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d[0]['sha'] if isinstance(d,list) and d else '')" 2>/dev/null || true)
  if [[ -z "$sha" ]]; then
    # 该目录 3D 下可能只有一个文件，尝试直接列出
    sha=$(curl -s --max-time 20 "$API/$dir/3D/" | python3 -c "import json,sys; d=json.load(sys.stdin); print(d[0]['sha'] if isinstance(d,list) and d else '')" 2>/dev/null || true)
  fi
  if [[ -z "$sha" ]]; then
    fail="$fail $dir"; continue
  fi
  curl -s --max-time 30 "https://api.github.com/repos/microsoft/fluentui-emoji/git/blobs/$sha" | python3 -c "import json,sys,base64; d=json.load(sys.stdin); open('$OUT/$file','wb').write(base64.b64decode(d['content']))" 2>/dev/null || { fail="$fail $dir"; continue; }
  ok=$((ok+1))
done
echo "downloaded ok=$ok"
[[ -n "$fail" ]] && echo "failed:$fail"
exit 0
