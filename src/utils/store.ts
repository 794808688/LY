import { getStorage, removeStorage, setStorage } from "~/storage"

function stringify(value: any): string {
  return JSON.stringify(value)
}

function parse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T
  } catch (error) {
    return null
  }
}

interface ILocalStore {
  setValue(key: string, data: any): ILocalStore
  getValue<T>(key: string, defaultValue?: T): T | null
  removeValue(key: string): ILocalStore
}

const LocalStore: ILocalStore = {
  setValue(key: string, data: any): ILocalStore {
    // 一小时
    const hoursSecond: number = 3600
    // 一天
    const day1Second: number = hoursSecond * 24
    // 一周
    const week1Second: number = day1Second * 7
    // 当前秒
    const currentSecond: number = Date.now() / 1000
    // 过期时间(秒)
    const expire: number = currentSecond + day1Second
    // const expire: number = currentSecond + 20
    setStorage(key, data, { expire })
    return this
  },
  getValue<T>(key: string, defaultValue?: T): T | null {
    return getStorage(key) || defaultValue || null

    // const value: any = getStorage(key)
    // if (!value) return defaultValue || null
    // const data: any = parse<T>(value)
    // if (data.localstore_outtime > 0 && new Date().getTime() > data.localstore_outtime * 1000) {
    //   localStorage.removeItem(key)
    //   return defaultValue || null
    // }
    // return data
  },
  removeValue(key: string): ILocalStore {
    removeStorage(key)
    return this
  },
}

export default LocalStore
