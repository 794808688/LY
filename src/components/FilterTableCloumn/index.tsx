import { AlignRightOutlined } from '@ant-design/icons';
import { Button, Checkbox, Popover } from 'antd'
import * as React from 'react'
import './index.scss'
export default function FilterTableCloumn(porps:any) {

  const content = (
    <div className='filtertablecloumn-Popover-content'>
      <Checkbox.Group options={porps.options} value={porps.checkbox} onChange={porps.onChange} />
    </div>
  );
  return (
    <div className='filtertablecloumn'>
      <Popover placement="bottomLeft" content={content} trigger="click">
        <Button><AlignRightOutlined /></Button>
      </Popover>
    </div>
  )
}
