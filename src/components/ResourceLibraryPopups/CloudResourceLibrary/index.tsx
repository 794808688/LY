import * as React from 'react'

import type { RadioChangeEvent } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import { Menu, Radio, Checkbox, Empty, Pagination, Button } from 'antd'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'

import { setGlobResourceLibraryActiveList } from '~/store/module/resource-library'
import store from '~/store'
import DataResourceLibraryFileType from '~/mock/resource-library/DataResourceLibraryFileType.json'
import {
  apiGetSkillClassificationListData,
  apiGetThematicClassificationListData,
  apiGetTagClassificationListData,
  apiGetCloudResourceLibraryListData,
} from '../service'

const ResourceListItems = React.lazy(() => import('../ResourceListItems'))

import './index.scss'

/**
 * @description: 云资源库 Menu 数据
 * @return {*}
 */
const initCloudResourceLibraryMenusData = [
  { label: '技能分类', key: 'item-1', children: [] },
  { label: '专题', key: 'item-2', children: [] },
  { label: '标签', key: 'item-3', children: [] },
]
/**
 * @description: 云资源库 Menu 状态
 * @return {*}
 */
const initModalTab1Menu = [
  {
    activeKeys: [],
    openKeys: [initCloudResourceLibraryMenusData[0].key],
  },
  {
    activeKeys: [],
    openKeys: [],
  },
  {
    activeKeys: [],
    openKeys: [],
  },
]

type Props = {
  tabActiveKey: string
  onClickResourceLibraryModalHandler: (type: 'open' | 'close') => void
  setResourceLibraryActiveListHandler: () => void
  resourceLibraryData: any
  setResourceLibraryData: React.Dispatch<React.SetStateAction<any>>
  resourceLibraryListData: any[]
  setResourceLibraryListData: React.Dispatch<React.SetStateAction<any[]>>
  setResourceLibraryListAllActive: (data: any[]) => Promise<any>
  clearResourceLibraryListAllActive: (data: any[]) => Promise<any>
  setResourceLibraryArrActiveNumber: (activeLength: number) => void
  resourceLibraryListActiveLength: number
  setResourceLibraryListActiveLength: React.Dispatch<React.SetStateAction<number>>
  getResourceLibraryActiveLength: (type: string) => number
  onClickResourceLibraryListItemHandler: (index: number, callback: Function) => void
  pageSize: number
}
function CloudResourceLibrary({
  tabActiveKey,
  onClickResourceLibraryModalHandler,
  setResourceLibraryActiveListHandler,
  resourceLibraryData,
  setResourceLibraryData,
  resourceLibraryListData,
  setResourceLibraryListData,
  setResourceLibraryListAllActive,
  clearResourceLibraryListAllActive,
  setResourceLibraryArrActiveNumber,
  resourceLibraryListActiveLength,
  setResourceLibraryListActiveLength,
  onClickResourceLibraryListItemHandler,
  getResourceLibraryActiveLength,
  pageSize,
}: Props) {
  const [menusData, setMenusData] = React.useState<any[]>(initCloudResourceLibraryMenusData) // 云资源库 Menu 初始数据
  const [menusActive, setMenusActive] = React.useState<any[]>(initModalTab1Menu) // 云资源库 Menu 状态
  const [radioTypeValue, setRadioTypeValue] = React.useState<string>(DataResourceLibraryFileType[0].type) // 云资源库列表单选初始类型
  const [checkboxViewSelectedValue, setCheckboxViewSelectedValue] = React.useState<boolean>(false) // 查看云资源库已选
  const [checkboxActionAllValue, setCheckboxActionAllValue] = React.useState<boolean>(false) // 云资源库全选状态
  const [page, setPage] = React.useState<number | string>(1) // 云资源库分页
  const [resourceListType, setResourceListType] = React.useState<'select' | 'selected' | 'disable'>('select') // 资源列表类型
  const { globResourceLibraryActiveList } = store.getState()

  React.useEffect(() => {
    if (tabActiveKey === 'tab1') {
      cloudResourceLibraryClearMenuActiveHandler()
      getCloudResourceLibraryMenusData()
      setRadioTypeValue(DataResourceLibraryFileType[0].type)
      if (checkboxViewSelectedValue) setCheckboxViewSelectedValue(false)
    }
  }, [tabActiveKey])

  React.useEffect(() => {
    setRadioTypeValue(DataResourceLibraryFileType[0].type)
    setCheckboxActionAllValue(false)
    setResourceLibraryListActiveLength(0)
    getCloudResourceLibraryListData()
  }, [menusActive[0].activeKeys, menusActive[1].activeKeys, menusActive[2].activeKeys, page])

  React.useEffect(() => {
    if (checkboxViewSelectedValue) {
      setResourceListType('selected')
    } else {
      setResourceListType('select')
    }
  }, [checkboxViewSelectedValue])

  /**
   * @description: 云资源库展开Menu
   * @param {string} openKeys
   * @return {*}
   */
  const onCloudResourceLibraryOpenMenuChangeHandler = (openKeys: string[], index: number) => {
    menusActive[index].openKeys = openKeys
    setMenusActive([...menusActive])
  }

  /**
   * @description: 云资源库 Menu 操作
   * @param {any} params
   * @return {*}
   */
  const onCloudResourceLibraryMenuHandler = ({ selectedKeys }: { selectedKeys: string[] }, index: number) => {
    menusActive[index].activeKeys = selectedKeys
    setMenusActive([...menusActive])
    setPage(1)
  }

  /**
   * @description: 云资源库Radio单选
   * @param {RadioChangeEvent} e
   * @return {*}
   */
  const onCloudResourceLibraryRadioChangeHandler = async (e: RadioChangeEvent) => {
    const type = e.target.value

    ;(await clearResourceLibraryListAllActive(resourceLibraryListData)) && setResourceLibraryListActiveLength(0)

    setCheckboxActionAllValue(false)
    setRadioTypeValue(type)
  }

  /**
   * @description: 云资源库 Checkbox 查看已选
   * @param {CheckboxChangeEvent} e
   * @return {*}
   */
  const onCloudResourceLibraryCheckboxActiveViewSelectedChangeHandler = () => {
    setCheckboxViewSelectedValue(!checkboxViewSelectedValue)
  }

  /**
   * @description: 云资源库 Checkbox 本页全选/取消全选
   * @param {CheckboxChangeEvent} e
   * @return {*}
   */
  const onCloudResourceLibraryCheckboxActiveAllActionChangeHandler = async (e: CheckboxChangeEvent) => {
    setResourceLibraryListActiveLength(0)
    let newData: any[] = []

    if (!e.target.checked) {
      newData = await clearResourceLibraryListAllActive(resourceLibraryListData)
      setResourceLibraryListActiveLength(0)
    } else {
      newData = await setResourceLibraryListAllActive(resourceLibraryListData)
      setResourceLibraryListActiveLength(resourceLibraryListData.length)
    }
    e.target.checked && radioTypeValue !== DataResourceLibraryFileType[0].type && setRadioTypeValue(DataResourceLibraryFileType[0].type)

    setCheckboxActionAllValue(!checkboxActionAllValue)
    setResourceLibraryListData([...newData])
  }

  /**
   * @description: 云资源库分页操作
   * @param {number} page
   * @return {*}
   */
  const cloudResourceLibraryPageHandler = (page: number) => {
    setPage(page)
  }

  return (
    <div className="cloud-resource-library-container">
      <div className="tab-box display-flex">
        <div className="menus-box">
          <div
            className="clear-all text-align-center padding-bottom-10 color-999"
            hidden={menusActive[0].activeKeys.length <= 0 && menusActive[1].activeKeys.length <= 0 && menusActive[2].activeKeys.length <= 0}
            onClick={cloudResourceLibraryClearMenuActiveHandler}
          >
            <span>清空已选</span>
          </div>
          <div className="menus">
            {menusData && menusData.length > 0 ? (
              menusData.map((item, index) => (
                <div key={nanoid()} className="menu">
                  <Menu
                    selectedKeys={menusActive[index].activeKeys}
                    mode="inline"
                    multiple={index < 2 ? false : true}
                    items={[item]}
                    openKeys={menusActive[index].openKeys}
                    onOpenChange={(e) => onCloudResourceLibraryOpenMenuChangeHandler(e, index)}
                    onSelect={(e) => onCloudResourceLibraryMenuHandler(e, index)}
                    onDeselect={(e) => onCloudResourceLibraryMenuHandler(e, index)}
                    disabled={checkboxViewSelectedValue}
                  />
                </div>
              ))
            ) : (
              <div className="empty-box">
                <Empty />
              </div>
            )}
          </div>
        </div>

        <div className="list-box">
          <div className="actions display-flex justify-content-space-between">
            <div className="radios">
              <Radio.Group onChange={onCloudResourceLibraryRadioChangeHandler} value={radioTypeValue}>
                {DataResourceLibraryFileType.map((item) => (
                  <Radio
                    key={nanoid()}
                    value={item.type}
                    disabled={checkboxActionAllValue}
                    style={{ display: item.type === 'special' && !checkboxViewSelectedValue ? 'none' : '' }}
                  >
                    {item.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>

            <div className="checkbox display-flex">
              <div className="active-view-selected">
                <Checkbox
                  checked={checkboxViewSelectedValue}
                  onChange={onCloudResourceLibraryCheckboxActiveViewSelectedChangeHandler}
                  disabled={checkboxActionAllValue}
                >
                  查看已选
                </Checkbox>
              </div>

              <div className="active-all-action padding-left-10">
                <Checkbox
                  checked={checkboxActionAllValue}
                  disabled={!resourceLibraryListData || resourceLibraryListData.length <= 0 || checkboxViewSelectedValue ? true : false}
                  onChange={onCloudResourceLibraryCheckboxActiveAllActionChangeHandler}
                >
                  本页全选
                </Checkbox>
              </div>
            </div>
          </div>

          <div className="resource-list">
            <ResourceListItems
              tabActiveKey={tabActiveKey}
              data={
                !checkboxViewSelectedValue && resourceLibraryListData && resourceLibraryListData.length > 0
                  ? resourceLibraryListData
                  : checkboxViewSelectedValue && globResourceLibraryActiveList && globResourceLibraryActiveList.length > 0
                  ? globResourceLibraryActiveList
                  : []
              }
              resourceListType={resourceListType}
              resourceLibraryRadioTypeValue={radioTypeValue}
              onClickResourceLibraryListItemHandler={onClickResourceLibraryListItemHandler}
              setCheckboxActionAllValue={setCheckboxActionAllValue}
            />
          </div>

          <div className="pagination-box display-flex justify-content-center padding-top-20" hidden={checkboxViewSelectedValue}>
            <Pagination
              simple
              hideOnSinglePage={!resourceLibraryListData || resourceLibraryListData.length <= 0 ? true : false}
              pageSize={pageSize}
              onChange={cloudResourceLibraryPageHandler}
              current={!resourceLibraryData || !resourceLibraryData.page || !resourceLibraryData.page.page ? page : resourceLibraryData.page.page}
              total={!resourceLibraryData || !resourceLibraryData.page || !resourceLibraryData.page.dataTotal ? 0 : resourceLibraryData.page.dataTotal}
            />
          </div>
        </div>
      </div>

      <div className="confirm-cancel display-flex justify-content-end padding-top-10">
        <div className="cancel">
          <Button onClick={() => onClickResourceLibraryModalHandler('close')}>关闭</Button>
        </div>
        <div className="confirm padding-left-10">
          <Button
            type="primary"
            onClick={() => {
              setResourceLibraryActiveListHandler()
              setCheckboxActionAllValue(false)
            }}
            disabled={resourceLibraryListActiveLength <= 0}
          >
            添加
          </Button>
        </div>
      </div>
    </div>
  )

  /**
   * @description: 获取云资源库 Menu 数据: 技能分类、专题、标签
   * @return {*}
   */
  async function getCloudResourceLibraryMenusData() {
    const resArr: any = await Promise.allSettled([
      apiGetSkillClassificationListData({}),
      apiGetThematicClassificationListData({}),
      apiGetTagClassificationListData({}),
    ])

    menusData.map((item, index) => {
      item.children = setCloudResourceLibraryMenuArr(resArr, menusData, index)
    })

    setMenusData([...menusData])

    getCloudResourceLibraryListData()
  }

  /**
   * @description: 设置云资源库 Menu 数组
   * @param {any} oldArr
   * @param {any} newArr
   * @param {number} arrIndex
   * @return {*}
   */
  function setCloudResourceLibraryMenuArr(oldArr: any[], newArr: any[], arrIndex: number) {
    if (
      oldArr[arrIndex] &&
      oldArr[arrIndex].value &&
      oldArr[arrIndex].value.code === 200 &&
      oldArr[arrIndex].value.data &&
      oldArr[arrIndex].value.data.length > 0
    ) {
      newArr[arrIndex].children = setCloudResourceLibraryMenuArrTier(oldArr[arrIndex].value.data)
    } else {
      newArr[arrIndex].children = []
    }

    return newArr[arrIndex].children
  }

  /**
   * @description: 设置云资源库 Menu 数组层级
   * @param {any} arr
   * @return {*}
   */
  function setCloudResourceLibraryMenuArrTier(arr: any[]) {
    arr.map((item) => {
      item.key = item.key || item.value || item.subjectid || item.tagid || nanoid()
      item.label = item.label || item.subjectname || item.tagname || '--'
      item.children && item.children.length > 0 && setCloudResourceLibraryMenuArrTier(item.children)
    })

    return arr
  }

  /**
   * @description: 清空云资源库 Menu 选中状态
   * @return {*}
   */
  function cloudResourceLibraryClearMenuActiveHandler() {
    if (menusActive[0].activeKeys.length > 0 || menusActive[1].activeKeys.length > 0 || menusActive[2].activeKeys.length > 0) {
      if (menusActive[0].activeKeys.length > 0) menusActive[0].activeKeys = []
      if (menusActive[1].activeKeys.length > 0) menusActive[1].activeKeys = []
      if (menusActive[2].activeKeys.length > 0) menusActive[2].activeKeys = []
      setPage(1)

      setMenusActive([...menusActive])
    }
  }

  /**
   * @description: 获取云资源库列表数据
   * @return {*}
   */
  async function getCloudResourceLibraryListData() {
    const res = await apiGetCloudResourceLibraryListData({
      jobtype: menusActive[0].activeKeys.join(','),
      subject: menusActive[1].activeKeys.join(','),
      tag: menusActive[2].activeKeys.join(','),
      page,
      per: pageSize,
    })

    if (res.code === 200 && res.data && res.data.list && res.data.list.length > 0) {
      setResourceLibraryData(res.data)
      setResourceLibraryListData(res.data.list)
    } else {
      setResourceLibraryData({})
      setResourceLibraryListData([])
    }
  }
}

export default connect((globResourceLibraryActiveList: any[]) => globResourceLibraryActiveList, {
  setGlobResourceLibraryActiveList,
})(CloudResourceLibrary)
