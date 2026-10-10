#!/usr/bin/env python3
"""下载 Fluent Emoji 3D PNG 到 assets/icons/。
来源: microsoft/fluentui-emoji @ 1ffb34c (MIT License, (c) Microsoft Corporation)
本地代理阻断 raw.githubusercontent，改走 gh api (已认证)。
"""
import subprocess, base64, json, os, sys

REPO = "microsoft/fluentui-emoji"
OUT = "/Users/alice/WorkBuddy/3/english-world/assets/icons"
os.makedirs(OUT, exist_ok=True)

# (单词id, 仓库路径)
FILES = {
    "coffee":    "assets/Hot beverage/3D/hot_beverage_3d.png",
    "latte":     "assets/Bubble tea/3D/bubble_tea_3d.png",
    "tea":       "assets/Teacup without handle/3D/teacup_without_handle_3d.png",
    "juice":     "assets/Cup with straw/3D/cup_with_straw_3d.png",
    "cake":      "assets/Shortcake/3D/shortcake_3d.png",
    "croissant": "assets/Croissant/3D/croissant_3d.png",
    "cookie":    "assets/Cookie/3D/cookie_3d.png",
    "muffin":    "assets/Cupcake/3D/cupcake_3d.png",
    "sandwich":  "assets/Sandwich/3D/sandwich_3d.png",
    "cup":       "assets/Teapot/3D/teapot_3d.png",
    "menu":      "assets/Tear-off calendar/3D/tear-off_calendar_3d.png",
    "barista":   "assets/Cooking/3D/cooking_3d.png",
    "apple":     "assets/Red apple/3D/red_apple_3d.png",
    "banana":    "assets/Banana/3D/banana_3d.png",
    "grape":     "assets/Grapes/3D/grapes_3d.png",
    "milk":      "assets/Glass of milk/3D/glass_of_milk_3d.png",
    "bread":     "assets/Bread/3D/bread_3d.png",
    "egg":       "assets/Egg/3D/egg_3d.png",
    "fish":      "assets/Fish/3D/fish_3d.png",
    "cheese":    "assets/Cheese wedge/3D/cheese_wedge_3d.png",
    "carrot":    "assets/Carrot/3D/carrot_3d.png",
    "broccoli":  "assets/Broccoli/3D/broccoli_3d.png",
    "tomato":    "assets/Tomato/3D/tomato_3d.png",
    "cart":      "assets/Shopping cart/3D/shopping_cart_3d.png",
}

ok, fail = 0, []
for key, path in FILES.items():
    dst = os.path.join(OUT, key + ".png")
    if os.path.exists(dst) and os.path.getsize(dst) > 1000:
        ok += 1
        continue
    r = subprocess.run(
        ["gh", "api", f"repos/{REPO}/contents/{path}"],
        capture_output=True, text=True, timeout=60,
    )
    try:
        meta = json.loads(r.stdout)
        data = base64.b64decode(meta["content"])
        if len(data) < 1000:
            raise ValueError("too small")
        with open(dst, "wb") as f:
            f.write(data)
        ok += 1
        print(f"ok {key} ({len(data)//1024}KB)")
    except Exception as e:
        fail.append((key, str(e)[:60]))
        print(f"FAIL {key}: {e}")

print(f"\ndownloaded {ok}/{len(FILES)}")
if fail:
    print("failed:", fail)
    sys.exit(1)
