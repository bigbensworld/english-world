#!/bin/zsh
# Taro build wrapper：以 packages/ui 为 cwd 调用（绕开 shell cd 坑）
# weapp 输出到 dist-weapp（默认 dist 会被 weapp 产物覆盖，导致 H5 部署拿到小程序文件！）
export PATH="/Users/alice/.workbuddy/binaries/node/versions/22.22.2-3/bin:$PATH"
cd /Users/alice/WorkBuddy/3/english-world/packages/ui || exit 1

if [[ "$*" == *"--type weapp"* ]]; then
  # 编译后把 dist 挪到 dist-weapp（Taro config 的 outputRoot 若设为 dist-weapp，
  # H5 端也会受影响，故用构建后移动的笨办法，稳妥）
  node node_modules/.bin/taro "$@"
  rc=$?
  if [[ $rc -eq 0 ]]; then
    rm -rf dist-weapp
    mv dist dist-weapp
    echo "[taro-build] weapp 产物已移至 dist-weapp/"
  fi
  exit $rc
fi

exec node node_modules/.bin/taro "$@"
