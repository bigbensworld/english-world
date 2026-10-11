import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
// 吉祥物（悬浮球）：挂在 app 层作为常驻单例，对齐原站 append 到 body 的行为。
// ⚠️ 必须渲染在 children（.taro_page）之外：Taro 路由页在转场时带 transform，
//    若挂在页面内部，position:fixed 会被该 transform 建立的包含块劫持而错位。
import Mascot from "./components/Mascot";
import "./app.css";

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    console.log("English World UI launched.");
  });
  return (
    <>
      {children}
      <Mascot />
    </>
  );
}

export default App;
