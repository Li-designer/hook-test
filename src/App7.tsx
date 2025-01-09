import { createContext, Component, React } from "react";

const countContext = createContext(111);

// class 组件是通过 Consumer 来取 context 的值
class Ccc extends Component {
  render() {
    return <h2>context 的 值为：{this.props.count}</h2>;
  }
}

function Bbb() {
  return (
    <div>
      <countContext.Consumer>
        {(count) => <Ccc count={count}></Ccc>}
      </countContext.Consumer>
    </div>
  );
}
