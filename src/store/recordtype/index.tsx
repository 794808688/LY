import { createStore } from 'redux'

const type = {
  name: "0"
}

function reducer(state = type, action: any) {

  // 有数据更新时, 返回一个新的state
  if (action.type === "change") {
    return { ...state, name: action.name }
  }

  return state
}

const storetype = createStore(reducer)

export default storetype