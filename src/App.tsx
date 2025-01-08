import React from "react";
import { useState, useEffect } from "react";
import "./App.css";

async function queryData() {
  const data = await new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(666);
    }, 2000);
  });
  return data;
}

function App() {
  const [num, setNum] = useState(() => {
    const num1 = 1 + 2;
    const num2 = 2 + 3;
    return num1 + num2;
  });

  // 请求数据、定时器等这些异步逻辑，我们都会放在 useEffect 里。
  /* 绝大多数情况下，用 useEffect，它能避免因为 effect 逻辑执行时间长导致页面卡顿（掉帧）。
  但如果你遇到闪动的问题比较严重，那可以用 useLayoutEffect，但要注意 effect
  逻辑不要执行时间太长。 */

  useEffect(() => {
    // 定时器
    const timer = setInterval(() => {
      console.log("11111", num);
    }, 1000);
    // 每次都会执行
    console.log("xxxxxxxxxx");
    queryData().then((data) => {
      setNum(data);
    });
    return () => {
      console.log("clean up");
      clearInterval(timer);
    };
  }, [num]);

  return <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>;
}

export default App;
