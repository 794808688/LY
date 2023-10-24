import { BarsOutlined, CheckOutlined, SyncOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Input, message, Modal, Table, Upload } from 'antd'
import * as React from 'react'
const { Search } = Input
import './index.scss'
import { apigetresource } from './service'
import { getDateAll } from '~/utils/public'
import AdminConfig from '~/config'
import store from '~/store'
export default function ImgResources(props: any) {
  const user = store.getState().user
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [page, setPage] = React.useState<{ page: number; size: number; total?: number }>({ page: 1, size: 10, total: 0 })
  const [resource, setresource] = React.useState<{ list: any[]; page: any }>({ list: [], page: {} })
  const [loading, setLoading] = React.useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);
  const [search, setSearch] = React.useState<string>();
  React.useEffect(() => {
    getresource()
  }, [isModalOpen, page, search])

  const openM = (val: boolean) => {
    setIsModalOpen(val)
    setSelectedRowKeys([])
  }

  const columns: any = [
    { title: 'ID', dataIndex: 'icloudid', align: 'center', className: 'fontsize' },
    {
      title: '预览', dataIndex: 'img', align: 'center', className: 'fontsize', width: 130,
      render: (text: any, record: any) => (
        <div className='imgresources-colums-img'>
          {props.type == 'mp4' ? <a target="blank" href={AdminConfig.API_SOURCE + '/' + record.fpath} className='components-imgresources-colums-img'><img className='img' src={AdminConfig.API_SOURCE + '/' + record.cover} alt="" /></a> :
            <a target="blank" href={AdminConfig.API_SOURCE + '/' + record.fpath} className='components-imgresources-colums-img'><img className='img' src={AdminConfig.API_SOURCE + '/' + record.fpath} alt="" /></a>}
        </div>)
    },
    {
      title: '文件名', dataIndex: 'fname', align: 'center', className: 'fontsize',
      render: (text: any, record: any) => (
        <div>{text}</div>
      )
    },
    { title: '类型', dataIndex: 'fix', align: 'center', className: 'fontsize' },
    {
      title: '创建日期', dataIndex: 'time', align: 'center', className: 'fontsize',
      render: (text: any, record: any) => (
        <div>{getDateAll(text * 1000, 'y-m-d 时:分:秒')}</div>
      )
    },
    {
      title: '操作', dataIndex: 'id', align: 'center', className: 'fontsize', fixed: 'right',
      render: (text: any, record: any) => (
        <Button type="dashed" size='small' onClick={() => props.selectimg(record, openM, props.type)}><CheckOutlined />选择</Button>
      )
    },
  ]

  const praps: any = {
    name: 'Filedata',
    accept: ".bmp,.gif,.png,.jpeg,.jpg",
    action: `${AdminConfig.API_URL}${AdminConfig.LOCAL_PATH}?mod=9&do=901&type=73&uid=${user.uid}&localstore=${user.localstore}`,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    beforeUpload() {
      setLoading(true)
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        setLoading(false)
        getresource()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
  };
  const propsmp: any = {
    name: 'Filedata',
    accept: ".mp4",
    action: `${AdminConfig.API_URL}${AdminConfig.LOCAL_PATH}?mod=9&do=901&type=74&uid=${user.uid}&localstore=${user.localstore}`,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    beforeUpload() {
      setLoading(true)
    },
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`)
        setLoading(false)
        getresource()
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`)
      }
    },
  };

  const pageChangeHandle = ({ current, pageSize }: any) => {
    setPage({ page: current as number, size: pageSize as number })
  }

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true

  }

  const hasSelected = selectedRowKeys.length > 0

  const onSearch = (value: string) => {
    setSearch(value)
  }
  return (
    <div className='components-imgresources'>
      <div onClick={() => openM(true)}>{props.children}</div>
      <Modal className='components-imgresources-Modal' title="资源库" width={800} footer={false} maskClosable={false} visible={isModalOpen} onCancel={() => openM(false)}>
        <div style={{ marginBottom: 16 }} className='display-flex storeswiper-button'>
          <Button onClick={getresource}><SyncOutlined /></Button>
          {props.type == 'mp4' ? <Upload {...propsmp} listType="picture" className="StoreSwiper-Modal-upload-list-inline">
            <Button style={{ marginLeft: 10 }} loading={loading}><UploadOutlined />上传</Button>
          </Upload> : <Upload {...praps} listType="picture" className="StoreSwiper-Modal-upload-list-inline">
            <Button style={{ marginLeft: 10 }} loading={loading}><UploadOutlined />上传</Button>
          </Upload>}
          {props.select == true ? <Button style={{ marginLeft: 10 }} disabled={!hasSelected} onClick={() => props.selectimg(selectedRowKeys, openM)}><CheckOutlined />选择</Button> : null}
          <Search placeholder={'搜索'} style={{ width: 200, marginLeft: 10 }} allowClear enterButton onSearch={onSearch} />
        </div>
        {props.select == true ? <Table
          onChange={pageChangeHandle}
          pagination={{ hideOnSinglePage: true, current: page.page, defaultPageSize: page.size, total: resource.page?.dataTotal }}
          columns={columns}
          dataSource={resource.list}
          size='small'
          rowKey='fpath'
          scroll={{ y: 380 }}
          rowSelection={rowSelection}
        /> :
          <Table
            onChange={pageChangeHandle}
            pagination={{ hideOnSinglePage: true, current: page.page, defaultPageSize: page.size, total: resource.page?.dataTotal }}
            columns={columns}
            dataSource={resource.list}
            size='small'
            rowKey='icloudid'
            scroll={{ y: 380 }}
          />
        }
      </Modal>
    </div>
  )
  //获取资源库
  async function getresource() {
    const res: any = await apigetresource({ ...page, search: search, type: props.type == 'mp4' ? '74' : '73' })
    if (res.code === 200) {
      // console.log(res)
      setresource(res.data)
    }
  }
}