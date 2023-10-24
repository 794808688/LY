import { Reducer } from 'redux'
import { IAction } from '../types'
import { getToken, setToken, removeToken } from '../../utils/cookie'
import LocalStore from '../../utils/store'
import AdminConfig from '~/config/index'

export interface UserState {
  rule: any
  token: string
  avatar: string | undefined
  nickname: string
  account: any
  mobile: string
  role: number
  uid: number
  id: number
  lv: any
  node: any[]
  autonode: number
  domain: string | undefined
  school: any
  schoolid: string
  sid: number
  localstore: string
  authmod: any
  localstore_outtime: any
  authid: number
  createtime?:any
  time?:any
  phone?: any
  realname?:string
  tel?:string | number
  classid?:string | number
  sex?:string 
  age?:string | number
  cardtype?:string | number
  card?:string | number
  pwd?:any
  team_id?:string | number
}

// const USER_KEY = 'hp-Admin-user';

const localUser = LocalStore.getValue<UserState>(AdminConfig.USER_KEY) || {}

const defaultUser: UserState = {
  token: getToken(),
  avatar: '',
  nickname: '',
  account: '',
  mobile: '',
  role: 0,
  rule: '',
  uid: 0,
  id: 0,
  schoolid: '',
  lv: [],
  node: [],
  autonode: 0,
  domain: AdminConfig.BASENAME,
  school: {},
  sid: 0,
  authmod: ['10000', '10001'],
  localstore: '',
  localstore_outtime: '',
  authid: 1,
  ...localUser,
  team_id:'1',
  // createtime:0,
}

const SET_USER_INFO = 'SET_USER_INFO'

const SET_USER_LOGOUT = 'SET_USER_LOGOUT'

export const setUserInfo: (user: UserState) => IAction<UserState> = (user: UserState) => ({
  type: SET_USER_INFO,
  payload: user,
})

export const logout: () => IAction<null> = () => ({
  type: SET_USER_LOGOUT,
  payload: null,
})

const userReducer: Reducer<UserState, IAction<any>> = (state = defaultUser, action: IAction<any>) => {
  const { type, payload } = action

  switch (type) {
    case SET_USER_INFO:
      setToken(payload.token)
      LocalStore.setValue(AdminConfig.USER_KEY, payload)
      return {
        ...payload,
      }
    case SET_USER_LOGOUT:
      removeToken()
      LocalStore.removeValue(AdminConfig.USER_KEY)
      return {
        ...defaultUser,
      }
    default:
      return state
  }
}

export default userReducer
