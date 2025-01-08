import { Reducer, useReducer, React } from "react";
interface Data {
  result: number;
}

interface Action {
  type: "add" | "minus";
  num: number;
}

// 为什么要封装reducer ？因为reducer可以封装一些逻辑，方便维护。
// 如果直接使用useState的话，代码大量重复逻辑会比较复杂，难以维护。
function reducer(state: Data, action: Action) {
  switch (action.type) {
    case "add":
      return {
        // 🚩 不要像下面这样修改一个对象类型的 state：
        // state.age = state.age + 1;
        //...state,这样修改
        result: state.result + action.num,
      };
    case "minus":
      return {
        result: state.result - action.num,
      };
  }
  return state;
}

function App() {
  const [res, dispatch] = useReducer<Reducer<Data, Action>>(reducer, {
    result: 0,
  });
  const [resNum, dispatchNum] = useReducer<Reducer<Data, Action>, string>(
    reducer,
    "zero",
    (param) => {
      return {
        result: param === "zero" ? 0 : 1,
      };
    }
  );

  return (
    <div>
      <div onClick={() => dispatch({ type: "add", num: 2 })}>加</div>
      <div onClick={() => dispatch({ type: "minus", num: 1 })}>减</div>
      <div>{res.result}</div>
    </div>
  );
}

export default App;
