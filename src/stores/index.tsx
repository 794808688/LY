import { create } from 'zustand'
import { APP_NAME } from '~/config'
import LocalStore from '~/utils/store'

interface PrjConf { logo: string, name: string }
interface ProjectConfig {
  prjConf: PrjConf
  setPrjConf: (prjConf: PrjConf) => void
  getPrjConf: () => PrjConf
}
/**
 * @description: 项目配置
 * @param {type} create
 * @return {type}
 */
export const useProjectConfig = create<ProjectConfig>(set => ({
  prjConf: { logo: '', name: '' },
  setPrjConf: (prjConf: PrjConf) => {
    LocalStore.setValue(`${APP_NAME}_projectConfig`, prjConf)
    set({ prjConf })
  },
  getPrjConf: () => {
    const prjConf: PrjConf = LocalStore.getValue(`${APP_NAME}_projectConfig`) || { logo: '', name: '' }
    return prjConf
  }
}))