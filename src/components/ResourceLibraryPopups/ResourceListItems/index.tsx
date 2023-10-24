import * as React from 'react'

import { Empty } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'

import { setGlobResourceLibraryActiveList } from '~/store/module/resource-library'
import store from '~/store'
import AdminConfig from '~/config'
import DataResourceLibraryFileType from '~/mock/resource-library/DataResourceLibraryFileType.json'

import EmptyImageSvg from '~/components/StatusInsetSvgs/EmptyImage.svg'

import './index.scss'

interface Props {
  data: any[]
  /**
   * @description: 单选类型
   */
  resourceLibraryRadioTypeValue: string
  /**
   * @description: 列表 item 点击
   */
  onClickResourceLibraryListItemHandler?: any
  /**
   * @description: 资源全选状态
   */
  setCheckboxActionAllValue?: any
  tabActiveKey?: string
  /**
   * @description: 资源列表类型
   */
  resourceListType: 'select' | 'selected' | 'disable'
  /**
   * @description: 查看已选
   */
  setGlobResourceLibraryActiveList: (data: any[]) => void
}
function ResourceItems({
  data,
  resourceListType,
  resourceLibraryRadioTypeValue,
  onClickResourceLibraryListItemHandler,
  setCheckboxActionAllValue,
  setGlobResourceLibraryActiveList,
}: Props) {
  const { globResourceLibraryActiveList } = store.getState()
  const siftData: any[] = []

  fileTypeSiftHandler()

  /**
   * @description: 删除已选
   * @param {number} index
   * @return {*}
   */
  const onClickSelectedRemoveHandler = (index: number) => {
    const newArr = globResourceLibraryActiveList
    newArr.splice(index, 1)
    setGlobResourceLibraryActiveList(newArr)
  }

  return (
    <div className="resource-items-container display-flex flex-wrap-wrap">
      {siftData && siftData.length > 0 ? (
        siftData.map((item, index) => (
          <div key={nanoid()} className="resource-item position-relative">
            <div
              className={`item-face${resourceListType === 'select' && item.active ? ' active' : ''} ${resourceListType}`}
              style={{
                backgroundImage: `url(${!item.cover ? EmptyImageSvg : `${AdminConfig.API_SOURCE}/${item.cover}`})`,
              }}
              onClick={() =>
                resourceListType === 'select'
                  ? onClickResourceLibraryListItemHandler(index, (state: boolean) => {
                      setCheckboxActionAllValue(state)
                    })
                  : false
              }
            >
              {item.activeNumber && (
                <div className="active-number font-size-18 font-weight-600 color-fff">
                  <span>{item.activeNumber}</span>
                </div>
              )}
              {resourceListType === 'selected' && (
                <div className="selected-remove-icon color-fff font-size-18 font-weight-600" onClick={() => onClickSelectedRemoveHandler(index)}>
                  <CloseOutlined />
                </div>
              )}
            </div>
            <div className="item-name margin-top-5 color-666 font-size-13 text-hidden-1">
              <span title={!item.fname ? '--' : item.fname}>{!item.fname ? '--' : item.fname}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-box">
          <Empty />
        </div>
      )}
    </div>
  )

  /**
   * @description: 文件类型筛选
   * @return {*}
   */
  function fileTypeSiftHandler() {
    data.map((item: any) => {
      if (resourceLibraryRadioTypeValue === DataResourceLibraryFileType[0].type) {
        siftData.push(item)
      } else if (resourceLibraryRadioTypeValue === DataResourceLibraryFileType[4].type) {
        if (
          !DataResourceLibraryFileType[1].type.includes(item.fix) &&
          !DataResourceLibraryFileType[2].type.includes(item.fix) &&
          !DataResourceLibraryFileType[3].type.includes(item.fix) &&
          !DataResourceLibraryFileType[3].type.includes(item.fix)
        ) {
          siftData.push(item)
        }
      } else {
        if (resourceLibraryRadioTypeValue.includes(item.fix)) {
          siftData.push(item)
        }
      }
    })

    console.log('siftData', siftData)
  }
}

export default connect((globResourceLibraryActiveList: any[]) => globResourceLibraryActiveList, {
  setGlobResourceLibraryActiveList,
})(ResourceItems)
