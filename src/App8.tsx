import { memo, useEffect, useCallback, useState, useMemo, React } from "react";

// memo + useMemo + useCallback
/* 如果子组件用了 memo，那给它传递的对象、函数类的 props 就需要用 
useMemo、useCallback 包裹，否则，每次 props 都会变，memo 就没用了。

反之，如果 props 使用 useMemo、useCallback，但是子组件没有被 memo 包裹，
那也没意义，因为不管 props 变没变都会重新渲染，只是做了无用功。 */

function Aaa() {
  const [, setNum] = useState(1);
  const [count, setCount] = useState(2);

  useEffect(() => {
    setInterval(() => {
      setNum(Math.random());
    }, 2000);
  }, []);

  // callback={bbbCallback} 会让memo失效
  // function bbbCallback() {}
  const bbbCallback = useCallback(function () {
    // xxx
  }, []);

  const count2 = useMemo(() => {
    return count * 10;
  }, [count]);

  return (
    <div>
      {/* <Bbb count={count}></Bbb> */}
      <MemoBbb count={count2} callback={bbbCallback}></MemoBbb>
    </div>
  );
}

interface BbbProps {
  count: number;
}

function Bbb(props: BbbProps) {
  // 不加memo每次触发Aaa的render都会触发Bbb的render
  console.log("bbb render");

  return <h2>{props.count}</h2>;
}

const MemoBbb = memo(Bbb);

export default Aaa;
