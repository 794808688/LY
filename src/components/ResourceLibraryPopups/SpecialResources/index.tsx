import * as React from 'react'

import type { RadioChangeEvent } from 'antd'
import { Menu, Button, Radio, Checkbox, Empty, Input, Pagination, message } from 'antd'
const { Search } = Input
import { CheckOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'

import { setGlobResourceLibraryActiveList } from '~/store/module/resource-library'
import store from '~/store'
import DataResourceLibraryFileType from '~/mock/resource-library/DataResourceLibraryFileType.json'
import { apiGetSpecialResourceData } from '../service'
import { arrayUnique } from '~/utils/public'

const ResourceListItems = React.lazy(() => import('../ResourceListItems'))

import './index.scss'

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
  resourceLibraryModalOpen: boolean
  modalResourceListType?: 'select' | 'selected' | 'disable'
  setGlobResourceLibraryActiveList: (data: any[]) => void
}
function SpecialResources({
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
  resourceLibraryModalOpen,
  modalResourceListType,
  setGlobResourceLibraryActiveList,
}: Props) {
  const { globResourceLibraryActiveList } = store.getState()
  const [menusData, setMenusData] = React.useState<any>({}) // 专题资源 Menu 初始数据
  const [menusActive, setMenusActive] = React.useState<any[]>([]) // 专题资源 Menu 状态
  const [radioTypeValue, setRadioTypeValue] = React.useState<string>(DataResourceLibraryFileType[0].type) // 专题资源列表单选初始类型
  const [checkboxViewSelectedValue, setCheckboxViewSelectedValue] = React.useState<boolean>(false) // 查看专题资源已选
  const [checkboxActionAllValue, setCheckboxActionAllValue] = React.useState<boolean>(false) // 专题资源全选状态
  const [menuSearch, setMenuSearch] = React.useState<string>('')
  const [menuPage, setMenuPage] = React.useState<number>(1) // Menu 分页
  const [resourceListType, setResourceListType] = React.useState<'select' | 'selected' | 'disable'>(!modalResourceListType ? 'disable' : modalResourceListType) // 资源列表类型
  const pageSize = 10

  React.useEffect(() => {
    if (tabActiveKey === 'tab2') {
      setMenuSearch('')
      setMenuPage(1)
      menusActive.length > 0 && specialResourceClearMenuActiveHandler()
      getSpecialResourceMenusData(menuSearch, menuPage)
      setRadioTypeValue(DataResourceLibraryFileType[0].type)
      if (checkboxViewSelectedValue) setCheckboxViewSelectedValue(false)
    }
  }, [tabActiveKey])

  React.useEffect(() => {
    ;(!modalResourceListType || modalResourceListType !== 'select') &&
      menusData.list &&
      menusData.list.length > 0 &&
      specialResourceMenuDefultActive(menusData.list)
  }, [globResourceLibraryActiveList])

  React.useEffect(() => {
    if (checkboxViewSelectedValue) {
      setResourceListType('selected')
    } else {
      setResourceListType(!modalResourceListType ? 'disable' : modalResourceListType)
    }
  }, [checkboxViewSelectedValue])

  /**
   * @description: 专题搜索
   * @param {string} val
   * @return {*}
   */
  const onSpecialSearchHandler = (val: string) => {
    if (menuSearch === val) {
      message.warning('请勿重复搜索...')
    } else {
      setMenuSearch(val)
      getSpecialResourceMenusData(val, menuPage)
    }
  }

  /**
   * @description: Menu 分页操作
   * @param {number} page
   * @return {*}
   */
  const menuPageHandler = (page: number) => {
    setMenuPage(page)
    getSpecialResourceMenusData(menuSearch, page)
  }

  /**
   * @description: 专题资源 Menu 添加已选操作
   * @param {any} param1
   * @return {*}
   */
  const onSpecialResourceMenuAddHandler = ({ item, selectedKeys }: any) => {
    if (!modalResourceListType || modalResourceListType !== 'select') {
      const newArr: any = globResourceLibraryActiveList
      newArr.unshift({
        fname: item.props.title || item.props.info || '-',
        icloud_gid: item.props.icloud_gid || '0',
        fix: 'special',
        uid: item.props.uid || '0',
        name: item.props.nickname || '-',
        cover: item.props.cover || '',
        // 打钩属性 TODO:
        active: true,
      })

      setGlobResourceLibraryActiveList(arrayUnique(newArr))
    }

    console.log('selectedKeys', selectedKeys)

    setMenusActive([...selectedKeys])
    getSpecialResourceListData(selectedKeys)
  }

  /**
   * @description: 专题资源 Menu 移除已选操作
   * @param {any} param1
   * @return {*}
   */
  const onSpecialResourceMenuRemoveHandler = ({ item, selectedKeys }: any) => {
    // 打钩隐藏 TODO:
    item.props.elementRef.current.children[0].children[0].style = 'opacity: 0'
    const newArr = globResourceLibraryActiveList
    for (let i = 0; i < globResourceLibraryActiveList.length; i++) {
      const _item = globResourceLibraryActiveList[i]

      if (_item.icloud_gid && _item.icloud_gid === item.props.icloud_gid) {
        newArr.splice(i, 1)
      }
    }
    setGlobResourceLibraryActiveList(newArr)
    setMenusActive([...selectedKeys])
    getSpecialResourceListData(selectedKeys)
  }

  /**
   * @description: 专题资源 Radio 单选
   * @param {RadioChangeEvent} e
   * @return {*}
   */
  const onSpecialResourceRadioChangeHandler = async (e: RadioChangeEvent) => {
    const type = e.target.value

    ;(await clearResourceLibraryListAllActive(resourceLibraryListData)) && setResourceLibraryListActiveLength(0)

    setCheckboxActionAllValue(false)
    setRadioTypeValue(type)
  }

  /**
   * @description: 专题资源 Checkbox 查看已选
   * @return {*}
   */
  const onSpecialResourceCheckboxActiveViewSelectedChangeHandler = () => {
    setCheckboxViewSelectedValue(!checkboxViewSelectedValue)
  }

  return (
    <div className="special-resources-container">
      <div className="tab-box display-flex">
        <div className="search-menus-pagination display-flex flex-direction-column align-content-space-between">
          <div className="search-menus">
            <div className="search padding-right-10">
              <Search placeholder="专题搜索" onSearch={onSpecialSearchHandler} />
            </div>

            <div className="menus padding-top-20">
              {menusData.list && menusData.list.length > 0 ? (
                <Menu
                  id="menus_box"
                  mode="inline"
                  multiple
                  items={menusData.list}
                  selectedKeys={menusActive}
                  onSelect={onSpecialResourceMenuAddHandler}
                  onDeselect={onSpecialResourceMenuRemoveHandler}
                  disabled={checkboxViewSelectedValue}
                />
              ) : (
                <Empty />
              )}
            </div>
          </div>

          <div className="pagination">
            <Pagination
              simple
              hideOnSinglePage={true}
              pageSize={pageSize}
              current={menuPage}
              total={menusData.page && menusData.page.dataTotal}
              onChange={menuPageHandler}
            />
          </div>
        </div>

        <div className="list-box">
          <div className="actions display-flex justify-content-space-between">
            <div className="radios">
              <Radio.Group onChange={onSpecialResourceRadioChangeHandler} value={radioTypeValue}>
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
                  onChange={onSpecialResourceCheckboxActiveViewSelectedChangeHandler}
                  disabled={checkboxActionAllValue}
                >
                  查看已选
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
        </div>
      </div>

      <div className="confirm-cancel display-flex justify-content-end padding-top-10">
        <div className="confirm margin-right-10" hidden={!modalResourceListType || modalResourceListType !== 'select'}>
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

        <div className="cancel">
          <Button onClick={() => onClickResourceLibraryModalHandler('close')}>关闭</Button>
        </div>
      </div>
    </div>
  )

  /**
   * @description: 获取专题资源 Menu 数据
   * @return {*}
   */
  async function getSpecialResourceMenusData(search: string, page: number) {
    const res:any = await apiGetSpecialResourceData({ title: search, page, per: pageSize })

    if (res.code && res.code === 200 && res.data && res.data.list && res.data.list.length > 0) {
      res.data.list.map((item: any) => {
        item.key = item.icloud_gid
        item.label = (
          <>
            {/* 打钩图标 TODO: */}
            <CheckOutlined style={{ opacity: 0 }} />
            <span>{item.title}</span>
          </>
        )
        // 消除警告
        delete item.classid
      })
      setMenusData(res.data)
      ;(!modalResourceListType || modalResourceListType !== 'select') && specialResourceMenuDefultActive(res.data.list)
    }
  }

  /**
   * @description: 专题资 Menu 默认选中
   * @return {*}
   */
  function specialResourceMenuDefultActive(_menusData: any[]) {
    const menuActiveArr: any[] = []
    for (let i = 0; i < _menusData.length; i++) {
      const menuItem = _menusData[i]

      for (let j = 0; j < globResourceLibraryActiveList.length; j++) {
        const globItem = globResourceLibraryActiveList[j]
        if (globItem.icloud_gid && globItem.icloud_gid === menuItem.icloud_gid) {
          // 打钩操作 TODO:
          specialResourceMenuIconDefaultActive(globItem, i)
          menuActiveArr.push(globItem.icloud_gid)
        }
      }
    }

    getSpecialResourceListData(menuActiveArr)

    setMenusActive([...menuActiveArr])
  }

  /**
   * @description: 专题资源 Menu 图标默认状态 TODO:
   * @param {any} item
   * @return {*}
   */
  function specialResourceMenuIconDefaultActive(item: any, index: number) {
    const iconActive: any = document.querySelector('#menus_box')?.childNodes[index].childNodes[0].childNodes[0]
    if (item.active) {
      iconActive.style = 'opacity: 1'
    } else {
      iconActive.style = 'opacity: 0'
    }
  }

  /**
   * @description: 专题资源清空 Menu 选中状态
   * @return {*}
   */
  function specialResourceClearMenuActiveHandler() {
    setMenusActive([])
  }

  /**
   * @description: 获取专题资源列表数据
   * @return {*}
   */
  async function getSpecialResourceListData(arr: any[]) {
    const activeStr = arr.join(',')
    const newArr: any[] = []
    const res:any = await apiGetSpecialResourceData({ icloud: !activeStr ? 0 : 1, icloud_gid: activeStr })

    if (res.code && res.code === 200 && res.data && res.data.list && res.data.list.length > 0) {
      res.data.list.map((item: any, index: number) => {
        if (item.icloud && item.icloud.length > 0) newArr.push(...item.icloud)
      })
    }

    setResourceLibraryListData([...newArr])
  }
}

export default connect((globResourceLibraryActiveList: any[]) => globResourceLibraryActiveList, {
  setGlobResourceLibraryActiveList,
})(SpecialResources)
