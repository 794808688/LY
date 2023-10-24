import * as React from 'react'

import { Button } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'

import './index.scss'

interface PropsType {
  like: number
  likes: number
  clickApproveHandle: () => void
  clickOpposeHandle: () => void
}
export default ({ like, likes, clickApproveHandle, clickOpposeHandle }: PropsType) => {
  return (
    <div className="approve-disapprove-container">
      <div className="approve-disapprove display-flex">
        <div className={`approve ${like == 1 && 'active'}`} onClick={clickApproveHandle}>
          <Button type="primary" icon={<CaretUpOutlined />}>
            <span style={{ display: `${like != 1 ? 'none' : ''}` }}>已</span>
            <span>
              <i style={{ display: `${like == 1 ? 'none' : ''}` }}>&nbsp;</i>
              <span>赞同&nbsp;</span>
            </span>
            <span>{likes}</span>
          </Button>
        </div>
        <div className={`oppose padding-left-5 ${like == 2 && 'active'}`}>
          <Button type="primary" icon={<CaretDownOutlined />} onClick={clickOpposeHandle} />
        </div>
      </div>
    </div>
  )
}
