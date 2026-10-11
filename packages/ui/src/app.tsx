import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
// 吉祥物（悬浮球）：挂在 app 层作为常驻单例，对齐原站 append 到 body 的行为。
// ⚠️ 摆放顺序关键（双重坑）：
//    ① 不能放在页面内部：路由页转场带 transform，会劫持 position:fixed 的包含块
//    ② 不能放在 children 之后：Taro 路由 CSS 用 :not(:last-child) 隐藏非末尾子元素，
//       Mascot 成为 .taro_router 最后一个子元素后，所有页面都会 display:none → 全站白屏！
//    放在 children 之前即可两全：Mascot 在 .taro_page 外（fixed 不受劫持），页面是 last-child（可见）。
import Mascot from "./components/Mascot";
import "./app.css";

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    console.log("English World UI launched.");
  });
  return (
    <>
      <Mascot />
      {children}
    </>
  );
}

export default App;
