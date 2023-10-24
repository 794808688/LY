import * as React from 'react'
import { Empty } from 'antd'

export default function EmptyDataPlaceholder() {
  return (
    <Empty
      description="暂无数据"
      image={Empty.PRESENTED_IMAGE_SIMPLE}
    />
  )
}