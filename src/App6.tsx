import { createContext, useContext, React } from "react";
// 跨任意层组件传递数据，我们一般用 Context。Context 的作用是对它所包含的组件树提供全局共享数据的一种方式。

const countContext = createContext(111);

function Aaa() {
  return (
    <div>
      <countContext.Provider value={222}>
        <Bbb></Bbb>
      </countContext.Provider>
    </div>
  );
}

function Bbb() {
  return (
    <div>
      <Ccc></Ccc>
    </div>
  );
}

function Ccc() {
  const count = useContext(countContext);
  return <h2>context 的值为：{count}</h2>;
}

export default Aaa;
