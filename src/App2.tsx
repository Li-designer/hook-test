import { produce } from "immer";
import { Reducer, useReducer, useState, React } from "react";

interface Data {
  a: {
    c: {
      e: number;
      f: number;
    };
    d: number;
  };
  b: number;
}

interface Action {
  type: "add";
  num: number;
}

function reducer(state: Data, action: Action) {
  switch (action.type) {
    case "add":
      //对于嵌套比较多的对象，使用immer会更加方便
      return produce(state, (state) => {
        state.a.c.e += action.num;
      });

    /* return {
        ...state,
        a: {
          ...state.a,
          c: {
            ...state.a.c,
            e: state.a.c.e + action.num,
          },
        },
      }; */
  }
  return state;
}

function App() {
  const [obj, setObj] = useState({
    a: {
      c: {
        e: 0,
        f: 0,
      },
      d: 0,
    },
    b: 0,
  });

  const [res, dispatch] = useReducer<Reducer<Data, Action>, string>(
    reducer,
    "zero",
    (param) => {
      console.log(param, "param");
      return {
        a: {
          c: {
            e: 0,
            f: 0,
          },
          d: 0,
        },
        b: 0,
      };
    }
  );

  return (
    <div>
      <div onClick={() => dispatch({ type: "add", num: 2 })}>加</div>
      <div
        onClick={() => {
          setObj(
            produce(obj, (obj) => {
              obj.a.c.e++;
            })
          );
        }}
      >
        加
      </div>
      <div>{JSON.stringify(obj)}</div>
      <div>{JSON.stringify(res)}</div>
    </div>
  );
}

export default App;
