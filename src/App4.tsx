import { useEffect, useRef, React, useState } from "react";

function App() {
  //  useRef返回一个可变的 ref 对象，其 .current 属性被初始化为传入的参数（initialValue）。
  const inputRef = useRef<HTMLInputElement>(null);
  const numRef = useRef<number>(0);
  const [, forceRender] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <div>
      <input ref={inputRef}></input>
      {/* 一般情况下不通过修改ref修改渲染内容,如果修改需要使用forceRender*/}
      <div
        onClick={() => {
          numRef.current++;
          forceRender(Math.random());
        }}
      >
        {numRef.current}
      </div>
    </div>
  );
}

export default App;
