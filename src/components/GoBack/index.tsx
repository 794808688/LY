import * as React from 'react'
import { Tooltip } from 'antd'
import { RollbackOutlined } from '@ant-design/icons'
import './index.css'

export default function GoBack() {
  const backClickHandle = () => {
    window.history.back()
  }

  return (
    <>
      <Tooltip title="返回上级">
        <RollbackOutlined className="go-back-icon-style" onClick={backClickHandle} />
      </Tooltip>
    </>
  )
}
