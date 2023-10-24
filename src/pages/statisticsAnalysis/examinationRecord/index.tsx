import * as React from 'react'
import { Button, Divider, Form, Input, Modal, Select, Table, Tag, message } from 'antd'
import PageWrap from '~/components/component/PageWrap'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Search } = Input;

export default function examinationRecord(){
  const [page, setPage] = React.useState<{ page: number; size: number; total?: number }>({ page: 1, size: 10, total: 0, })
  const [data, setData] = React.useState<{ list: any[]; page: any }>({ list: [], page: {} })
  const [params, setparams] = React.useState<any>({})

  React.useEffect(() => {
    // getSysNoticeList()
  }, [page])

  const pageChangeHandle = ({ current, pageSize }: any) => {
    setPage({ page: current as number, size: pageSize as number })
  }
  const columns: any = [
    {
      title: '序号',
      dataIndex: '',
    },
    {
      title: '计划名称',
      dataIndex: '',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: any, record: any) => (
        record.status == 1 ? <Tag color="success">已发布</Tag> : <Tag color="default">待发布</Tag>
      )
    },
    {
      title: '操作',
      width: 200,
      fixed: 'right',
      render: (text: string, record: any) => (
        <div>
          <span className='cursor-pointer-hover'>导出</span>
          <Divider type="vertical" style={{ margin: '0 10px', backgroundColor: '#bbb' }} />
          <span className='cursor-pointer' style={{ color: '#ff4d4f' }} onClick={() => reset(record)}>删除</span>
        </div>
      ),
    },
  ]

  //搜索
  const onSearch = (value: any) => {
    params.nickname = value
    setparams({ ...params })
    setPage({ page: 1, size: 10 })
  }
  //删除公告
  const reset = (record: any) => {
    Modal.confirm({
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该公告, 是否继续?',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        // delSysNotice({ id: record.id })
      }
    });
  }

  return (
    <PageWrap>
      <div className="display-flex align-items-center justify-content-space-between margin-bottom-20">
        <div>
          <Search placeholder='请输入标题' style={{ width: 200 }} allowClear enterButton onSearch={onSearch} />
        </div>
        <div>
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={data.list}
        pagination={{ hideOnSinglePage: true, current: data.page.page, defaultPageSize: page.size, total: data.page.dataTotal }}
        onChange={pageChangeHandle}
      />
    </PageWrap>
  )
  //获取列表
  // async function getSysNoticeList() {
  //   const res: any = await apigetSysNoticeList({ ...page })
  //   if (res.code === 200) {
  //     setData(res.data)
  //   }
  // }

}
