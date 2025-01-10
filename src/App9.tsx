import { useEffect, Reducer, useState, useReducer, useRef, React } from "react";
// 闭包陷阱
// 闭包陷阱是指在 JavaScript 中，内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后。

interface Action {
  type: "add" | "minus";
  num: number;
}

function reducer(state: number, action: Action) {
  switch (action.type) {
    case "add":
      return state + action.num;
    case "minus":
      return state - action.num;
  }
  return state;
}

function App() {
  /* const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
		// 这里的 count 是闭包陷阱无法获取到最新的值
      console.log(count);
      setCount(count + 1);
    }, 1000);
  }, []); */

  // 解决方案1
  /* const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
    const timer = setInterval(() => {
      // 这里的 count 是闭包陷阱无法获取到最新的值
      setCount(count + 1);
    }, 1000);
    return () => {
      console.log("clearInterval");
      clearInterval(timer);
    };
  }, [count]); */

  // 解决方案2
  /* const [count, dispatch] = useReducer<Reducer<number, Action>>(reducer, 0);

  useEffect(() => {
    console.log(count);

    setInterval(() => {
      // 这里使用 dispatch 可以获取到最新的值
      dispatch({ type: "add", num: 1 });
    }, 1000);
  }, []); */

  // 解决方案3
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  };
  const ref = useRef(updateCount);

  ref.current = updateCount;

  useEffect(() => {
    const timer = setInterval(() => ref.current(), 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>{count}</div>;
}

export default App;
