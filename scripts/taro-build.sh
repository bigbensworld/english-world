#!/bin/zsh
# Taro build wrapper：以 packages/ui 为 cwd 调用（绕开 shell cd 坑）
export PATH="/Users/alice/.workbuddy/binaries/node/versions/22.22.2-3/bin:$PATH"
cd /Users/alice/WorkBuddy/3/english-world/packages/ui || exit 1
exec node node_modules/.bin/taro "$@"
