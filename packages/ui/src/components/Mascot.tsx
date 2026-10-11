// 吉祥物（悬浮球）：对齐原站 style.css .mascot 的 DOM 结构与状态机。
// 由 app.tsx 常驻渲染，跨页面/跨视图（首页、场景、vlog、词汇册）始终可见。
import { View, Text } from "@tarojs/components";
import { useMascot, pokeMascot } from "../mascotStore";

export default function Mascot() {
  const { state, bubble } = useMascot();
  return (
    <View
      id="mascot"
      className={`mascot state-${state}`}
      data-state={state}
      role="status"
      aria-label={`英语学习助手，当前状态：${state}`}
      onClick={pokeMascot}
    >
      <View className="body">
        <View className="eye l" />
        <View className="eye r" />
        <View className="cheek l" />
        <View className="cheek r" />
        <View className="mouth" />
        <Text className="leaf">🌱</Text>
      </View>
      {bubble ? <View className="bubble">{bubble}</View> : null}
    </View>
  );
}