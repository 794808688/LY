import * as React from 'react'

import { Tabs } from 'antd'
import { connect } from 'react-redux'

import { setGlobResourceLibraryActiveList } from '~/store/module/resource-library'
import store from '~/store'
import { arrayUnique } from '~/utils/public'

const ModalPublic = React.lazy(() => import('~/components/ModalPublic'))
const CloudResourceLibrary = React.lazy(() => import('./CloudResourceLibrary'))
const SpecialResources = React.lazy(() => import('./SpecialResources'))
const PersonalResources = React.lazy(() => import('./PersonalResources'))

import './index.scss'

interface Props {
  resourceLibraryModalOpen: boolean
  onClickResourceLibraryModalHandler: (type: 'open' | 'close') => void
  modalTabActive?: 'tab1' | 'tab2' | 'tab3'
  modalTabStatus?: 'disable'
  modalResourceListType?: 'select' | 'selected' | 'disable'
  setGlobResourceLibraryActiveList: (data: any[]) => void
}
function ResourceLibraryPopups({
  resourceLibraryModalOpen,
  onClickResourceLibraryModalHandler,
  modalTabActive,
  modalTabStatus,
  modalResourceListType,
  setGlobResourceLibraryActiveList,
}: Props) {
  const { globResourceLibraryActiveList } = store.getState()
  const [tabActiveKey, setTabActiveKey] = React.useState<string>(!modalTabActive ? 'tab1' : modalTabActive) // Tab 选中
  const [resourceLibraryData, setResourceLibraryData] = React.useState<any>({}) // 资源库列表总数据
  const [resourceLibraryListData, setResourceLibraryListData] = React.useState<any[]>([]) // 资源库列表数组
  const [resourceLibraryListActiveLength, setResourceLibraryListActiveLength] = React.useState<number>(0) // 资源库列表选中总长度
  const pageSize = 8

  /**
   * @description: Tab 切换
   * @param {string} activeKey
   * @return {*}
   */
  const onClickTabHandler = (activeKey: string) => {
    setTabActiveKey(activeKey)
  }

  /**
   * @description: 资源库列表 Item 选中控制
   * @param {number} index
   * @return {*}
   */
  const onClickResourceLibraryListItemHandler = (index: number, callback: Function) => {
    let length: number = 0
    if (!resourceLibraryListData[index].active) {
      resourceLibraryListData[index].active = true
      length = getResourceLibraryActiveLength('add')
    } else {
      resourceLibraryListData[index].active = false
      length = getResourceLibraryActiveLength('cut')
    }
    setResourceLibraryListActiveLength(length)
    setResourceLibraryArrActiveNumber(length)

    callback(length < resourceLibraryListData.length ? false : true)
    setResourceLibraryListData([...resourceLibraryListData])
  }

  return (
    <div className="resource-library-popups-container">
      <div className="content-modal">
        <ModalPublic modalVisible={resourceLibraryModalOpen} width={1218} modalFooter={false} closable={false}>
          <div className="tabs-content-box">
            <Tabs size="large" activeKey={tabActiveKey} onChange={onClickTabHandler}>
              <Tabs.TabPane tab="云资源库" key="tab1" disabled={modalTabStatus && modalTabStatus === 'disable' ? true : false}>
                <CloudResourceLibrary
                  tabActiveKey={tabActiveKey}
                  onClickResourceLibraryModalHandler={onClickResourceLibraryModalHandler}
                  setResourceLibraryActiveListHandler={setResourceLibraryActiveListHandler}
                  resourceLibraryData={resourceLibraryData}
                  setResourceLibraryData={setResourceLibraryData}
                  resourceLibraryListData={resourceLibraryListData}
                  setResourceLibraryListData={setResourceLibraryListData}
                  setResourceLibraryListAllActive={setResourceLibraryListAllActive}
                  clearResourceLibraryListAllActive={clearResourceLibraryListAllActive}
                  setResourceLibraryArrActiveNumber={setResourceLibraryArrActiveNumber}
                  resourceLibraryListActiveLength={resourceLibraryListActiveLength}
                  setResourceLibraryListActiveLength={setResourceLibraryListActiveLength}
                  getResourceLibraryActiveLength={getResourceLibraryActiveLength}
                  onClickResourceLibraryListItemHandler={onClickResourceLibraryListItemHandler}
                  pageSize={pageSize}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="专题资源" key="tab2">
                <SpecialResources
                  tabActiveKey={tabActiveKey}
                  onClickResourceLibraryModalHandler={onClickResourceLibraryModalHandler}
                  setResourceLibraryActiveListHandler={setResourceLibraryActiveListHandler}
                  resourceLibraryData={resourceLibraryData}
                  setResourceLibraryData={setResourceLibraryData}
                  resourceLibraryListData={resourceLibraryListData}
                  setResourceLibraryListData={setResourceLibraryListData}
                  setResourceLibraryListAllActive={setResourceLibraryListAllActive}
                  clearResourceLibraryListAllActive={clearResourceLibraryListAllActive}
                  setResourceLibraryArrActiveNumber={setResourceLibraryArrActiveNumber}
                  resourceLibraryListActiveLength={resourceLibraryListActiveLength}
                  setResourceLibraryListActiveLength={setResourceLibraryListActiveLength}
                  getResourceLibraryActiveLength={getResourceLibraryActiveLength}
                  onClickResourceLibraryListItemHandler={onClickResourceLibraryListItemHandler}
                  resourceLibraryModalOpen={resourceLibraryModalOpen}
                  modalResourceListType={modalResourceListType}
                />
              </Tabs.TabPane>
              <Tabs.TabPane tab="个人资源" key="tab3" disabled={modalTabStatus && modalTabStatus === 'disable' ? true : false}>
                <PersonalResources onClickResourceLibraryModalHandler={onClickResourceLibraryModalHandler} />
              </Tabs.TabPane>
            </Tabs>
          </div>
        </ModalPublic>
      </div>
    </div>
  )

  /**
   * @description: 获取资源库选中长度
   * @param {string} type 增减类型 add || cut
   * @return {*}
   */
  function getResourceLibraryActiveLength(type: string) {
    let resultLength = resourceLibraryListActiveLength
    if (type === 'add') {
      resultLength >= resourceLibraryListData.length ? resourceLibraryListData.length : resultLength++
    } else if (type === 'cut') {
      resultLength <= 0 ? 0 : resultLength--
    }
    return resultLength
  }

  /**
   * @description: 设置资源库数组 activeNumber
   * @param {number} activeLength
   * @return {*}
   */
  function setResourceLibraryArrActiveNumber(activeLength: number) {
    const activeArr = new Array(activeLength).fill('active')
    const newArr: any[] = []
    resourceLibraryListData.map((item) => {
      if (item.active) {
        newArr.push(item)
      }
    })
    activeArr.map((_:any, newIndex) => {
      newArr.map((item, index) => {
        if (newIndex === index) {
          item.activeNumber = index + 1
        }
      })
    })
  }

  /**
   * @description: 设置 资源库列表全部选中
   * @param {any} data
   * @return {*}
   */
  function setResourceLibraryListAllActive(data: any[]) {
    return new Promise((resolve) => {
      data.map((item, index) => {
        item.active = true
        item.activeNumber = index + 1
      })

      resolve(data)
    })
  }

  /**
   * @description: 清空 资源库列表全部选中
   * @param {any} data
   * @return {*}
   */
  function clearResourceLibraryListAllActive(data: any[]) {
    return new Promise((resolve) => {
      data.map((item) => {
        delete item.active
        delete item.activeNumber
      })

      resolve(data)
    })
  }

  /**
   * @description: 设置资源库已选列表
   * @return {*}
   */
  function setResourceLibraryActiveListHandler() {
    resourceLibraryListData.map((item) => {
      if (item.active) {
        globResourceLibraryActiveList.push(item)
        delete item.active
        delete item.activeNumber
      }
    })

    setGlobResourceLibraryActiveList(arrayUnique(globResourceLibraryActiveList))
    setResourceLibraryListActiveLength(0)
  }
}

export default connect((globResourceLibraryActiveList: any[]) => globResourceLibraryActiveList, {
  setGlobResourceLibraryActiveList,
})(ResourceLibraryPopups)
