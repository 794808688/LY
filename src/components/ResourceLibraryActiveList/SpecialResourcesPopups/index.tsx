import * as React from 'react'

import type { RadioChangeEvent } from 'antd'
import { Button, Radio } from 'antd'
import { nanoid } from 'nanoid'

import { apiGetSpecialResourceData } from '~/components/ResourceLibraryPopups/service'
import DataResourceLibraryFileType from '~/mock/resource-library/DataResourceLibraryFileType.json'

const ModalPublic = React.lazy(() => import('~/components/ModalPublic'))
import ResourceListItems from '~/components/ResourceLibraryPopups/ResourceListItems'

import './index.scss'

type Props = {
  modalOpen: boolean
  item: any
  onClickResourceLibraryModalHandler: (type: string) => void
}
const SpecialResourcesPopups: React.FC<Props> = ({ modalOpen, item, onClickResourceLibraryModalHandler }) => {
  const [specialResourcesListData, setSpecialResourcesListData] = React.useState<any[]>([])
  const [radioTypeValue, setRadioTypeValue] = React.useState<string>(DataResourceLibraryFileType[0].type) // 专题资源列表单选初始类型

  React.useEffect(() => {
    if (modalOpen) {
      getSpecialResourceListData()
      setRadioTypeValue(DataResourceLibraryFileType[0].type)
    }
  }, [modalOpen])

  /**
   * @description: 专题资源 Radio 单选
   * @param {RadioChangeEvent} e
   * @return {*}
   */
  const onSpecialResourceRadioChangeHandler = async (e: RadioChangeEvent) => {
    const type = e.target.value

    setRadioTypeValue(type)
  }

  return (
    <div className="special-resources-popups-container">
      <ModalPublic
        modalVisible={modalOpen}
        width={1008}
        modalFooter={false}
        closable={true}
        title={item.fname || '--'}
        modalHandleCancel={() => onClickResourceLibraryModalHandler('close')}
      >
        <div className="modal-box">
          <div className="content-actions-list">
            <div className="actions">
              <Radio.Group onChange={onSpecialResourceRadioChangeHandler} value={radioTypeValue}>
                {DataResourceLibraryFileType.map((item) => (
                  <Radio key={nanoid()} value={item.type} style={{ display: item.type === 'special' ? 'none' : '' }}>
                    {item.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>

            <div className="list">
              <ResourceListItems data={specialResourcesListData} resourceLibraryRadioTypeValue={radioTypeValue} resourceListType="disable" />
            </div>
          </div>

          {/* <div className="content-close display-flex justify-content-right padding-top-20">
            <Button onClick={() => onClickResourceLibraryModalHandler('close')}>关闭</Button>
          </div> */}
        </div>
      </ModalPublic>
    </div>
  )

  /**
   * @description: 获取专题子列表数据
   * @return {*}
   */
  async function getSpecialResourceListData() {
    const res = await apiGetSpecialResourceData({ icloud: 1, icloud_gid: item.icloud_gid })

    console.log('res', res)
    if (res.code && res.code === 200 && res.data && res.data.list && res.data.list[0] && res.data.list[0].icloud && res.data.list[0].icloud.length > 0) {
      setSpecialResourcesListData(res.data.list[0].icloud)
    }
  }
}
export default SpecialResourcesPopups
