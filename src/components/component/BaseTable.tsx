
import React, { useCallback, useState } from 'react'
import { Table } from 'antd'
import { PaginationProps } from 'antd/lib/pagination'
import { TableProps } from 'antd/lib/table'
import { PageResponseData } from '../../typings'
import { nanoid } from 'nanoid'

// 基本的表格组件，后续根据需求可继续完善

interface BaseTableProps<T> extends TableProps<T> {
  data: {
    list: T[]
    page: PageResponseData
  }
  scroll?: {}
  children: React.ReactNode
  onChange: (page: PaginationProps) => void
  loading: boolean
  // rowSelection:any
  // onclick:()=>void
}

function BaseTable<T extends { id?: number }>(props: BaseTableProps<T>) {
  const {
    data: { list, page},
    // ...resetProps
    // rowSelection
  } = props

  list &&
    list.length > 0 &&
    list.map((item: any) => {
      item.key = nanoid()
    })

  const [pagination, setPagination] = useState<PaginationProps>({
    defaultCurrent: 1,
    defaultPageSize: 10, //page.size,
    showSizeChanger: false,
  })

  const onTableChange = useCallback((pageParams: PaginationProps) => {
    setPagination(pageParams)
    props.onChange(pageParams)
  }, [])
  //多选框
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
  //   console.log('selectedRowKeys changed: ', selectedRowKeys);
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };
  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };
  return (
    <Table<T>
      // bordered
      // {...resetProps}
      // rowSelection={rowSelection}
      loading={props.loading}
      onChange={onTableChange}
      className={props.className}
      dataSource={list}
      scroll={props.scroll}
      // rowKey={(record:any) => `${record.id?record.id:(record.uid?record.uid:nanoid())}`}
      pagination={{
        ...pagination,
        current: page.page ? parseInt(page.page + '') : 1,
        total: page && page.dataTotal,
      }}
    >
      {props.children}
    </Table>
  )
}

export default BaseTable
