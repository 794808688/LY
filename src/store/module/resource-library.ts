import { Reducer } from 'redux'
import { IAction } from '../types'

const defaultResourceLibraryActiveList: any[] = []

const SET_RESOURCE_LIBRARY_ACTIVE_LIST = 'SET_RESOURCE_LIBRARY_ACTIVE_LIST'

export const setGlobResourceLibraryActiveList: (activeList: any[]) => IAction<any[]> = (activeList: any[]) => ({
  type: SET_RESOURCE_LIBRARY_ACTIVE_LIST,
  payload: activeList,
})

const resourceLibraryActiveList: Reducer<any[], IAction<any>> = (state = defaultResourceLibraryActiveList, action: IAction<any>) => {
  const { type, payload } = action

  switch (type) {
    case SET_RESOURCE_LIBRARY_ACTIVE_LIST:
      return [...payload]

    default:
      return state
  }
}

export default resourceLibraryActiveList
