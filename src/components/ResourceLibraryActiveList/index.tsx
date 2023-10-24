import * as React from 'react'

import { DeleteOutlined, UnorderedListOutlined, StarTwoTone } from '@ant-design/icons'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import store from '~/store'
import { setGlobResourceLibraryActiveList } from '~/store/module/resource-library'

import DraggableElement from '~/components/Draggables/DraggableElement'
const SpecialResourcesPopups = React.lazy(() => import('./SpecialResourcesPopups'))

import './index.scss'

interface Props {
  setGlobResourceLibraryActiveList: (arr: any[]) => void
}
/**
 * @description: 资源库已选列表
 * @param {Props} param1
 * @return {*}
 */
function ResourceLibraryActiveList({ setGlobResourceLibraryActiveList }: Props) {
  const { globResourceLibraryActiveList } = store.getState()
  const [specialResourceModalOpen, setSpecialResourceModalOpen] = React.useState<boolean>(false)
  const [specialItem, setSpecialItem] = React.useState<any>({})

  /**
   * @description: 专题标题点击
   * @param {any} item
   * @return {*}
   */
  const onClickSpecialResourceItemPreviewHandler = (item: any) => {
    setSpecialItem(item)
    setSpecialResourceModalOpen(true)
  }

  // 删除云资源库单个已选item
  const onClickCloudResourceLibraryActiveItemDeleteHandler = (e: any, index: number) => {
    e.stopPropagation()
    const newArr = globResourceLibraryActiveList
    newArr.splice(index, 1)
    setGlobResourceLibraryActiveList(newArr)
  }

  /**
   * @description: 拖动数据操作
   * @param {number} dragIndex
   * @param {number} hoverIndex
   * @return {*}
   */
  const onDropHandler = (dragIndex: number, hoverIndex: number) => {
    const newArr = globResourceLibraryActiveList

    newArr.splice(dragIndex < hoverIndex ? hoverIndex + 1 : hoverIndex, 0, newArr[dragIndex])
    newArr.splice(dragIndex < hoverIndex ? dragIndex : dragIndex + 1, 1)
    console.log(newArr)
    setGlobResourceLibraryActiveList(newArr)
  }

  /**
   * @description: 资源库弹窗操作
   * @param {string} type
   * @return {*}
   */
  const onClickResourceLibraryModalHandler = (type: string) => {
    if (type === 'open') {
      setSpecialResourceModalOpen(true)
    } else if (type === 'close') {
      setSpecialResourceModalOpen(false)
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="resource-library-active-list-container">
        <div className="active-list padding-top-10">
          {globResourceLibraryActiveList &&
            globResourceLibraryActiveList.length > 0 &&
            globResourceLibraryActiveList.map((item, index) => (
              <DraggableElement
                ele="div"
                className={`active-item ${item.icloud_gid && !item.icloudid ? 'cursor-pointer' : 'cursor-move'}`}
                index={index}
                onDropHandler={onDropHandler}
                key={nanoid()}
              >
                <div
                  className="display-flex justify-content-space-between align-items-center"
                  onClick={() => item.icloud_gid && !item.icloudid && onClickSpecialResourceItemPreviewHandler(item)}
                >
                  <div className={`file-icon-name display-flex align-items-center color-666`}>
                    <div className="icon font-size-16 font-weight-600" style={{ display: item.icloud_gid && !item.icloudid ? '' : 'none' }}>
                      <StarTwoTone twoToneColor="#eb913a" />
                    </div>
                    <div className={`name text-hidden-1${item.icloud_gid && !item.icloudid ? ' margin-left-10' : ''}`}>
                      <span title={item.fname}>{item.fname}</span>
                    </div>
                  </div>
                  <div className="delete-icon color-999" onClick={(e) => onClickCloudResourceLibraryActiveItemDeleteHandler(e, index)}>
                    <DeleteOutlined />
                  </div>
                </div>
              </DraggableElement>
            ))}
        </div>
      </div>

      <SpecialResourcesPopups modalOpen={specialResourceModalOpen} item={specialItem} onClickResourceLibraryModalHandler={onClickResourceLibraryModalHandler} />
    </DndProvider>
  )
}

export default connect((globResourceLibraryActiveList: any[]) => globResourceLibraryActiveList, {
  setGlobResourceLibraryActiveList,
})(ResourceLibraryActiveList)
