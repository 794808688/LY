import React, { useEffect, useState } from "react"
import { Button, Input, Modal, Upload, message } from "antd"
import { UploadProps } from "antd/lib/upload"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import AdminConfig from "~/config"
import store from "~/store"
import { apiUpdateProjectConfig } from "./service"
import { useProjectConfig } from "~/stores"

interface Props {
  title?: string
}
const ProjectSettings: React.FC<Props> = (props) => {
  if (props.title) document.title = props.title

  const user = store.getState().user
  const [prjConf, setPrjConf] = useProjectConfig((state) => [state.prjConf, state.setPrjConf, state.getPrjConf])
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({ open: false })

  const uploadProps: UploadProps = {
    name: 'Filedata',
    listType: "picture-card",
    accept: ".bmp,.gif,.png,.jpeg,.jpg",
    action: `${AdminConfig.API_URL}${AdminConfig.LOCAL_PATH}?mod=9&do=901&uid=${user.uid}&localstore=${user.localstore}`,
    headers: {
      authorization: 'authorization-text',
    },
    showUploadList: false,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        setLoading(true)
      }
      if (info.file.status === 'done') {
        setPrjConf({ ...prjConf, logo: info?.file?.response?.data?.path || '' })
        message.success(`上传成功`)
        setLoading(false)
      } else if (info.file.status === 'error') {
        message.error(`上传失败`)
        setLoading(false)
      }
    },
  }

  /**
   * @description: logo项目名修改确认
   * @return {type}
   */
  const logoNameEditConfirm = () => {
    updateProjectConfig()
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-[8px]">Logo</div>
    </div>
  )

  return (
    <div className='project-settings-container [&_.edits]:flex [&_.edis]:items-center [&>.edit-item]:bg-gray-50 [&>.edit-item]:p-[30px] [&>.edit-item]:rounded-md'>
      <div className="edit-item edit-logo-name">
        <div className="edits [&>.edit]:flex [&>.edit]:items-center [&>.edit>.name]:w-[150px] [&>.edit>.name]:text-[14px] [&>.edit>.name]:font-bold">
          <div className="edit edit-logo">
            <div className="name">Logo设置：</div>
            <Upload {...uploadProps} >
              {prjConf.logo ? <img src={AdminConfig.API_SOURCE + '/' + prjConf.logo} alt="logo" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>
          <div className="edit edit-name ml-[50px]">
            <div className="name">项目名设置：</div>
            <Input placeholder="输入项目名称" value={prjConf.name} onChange={(e) =>
              setPrjConf({ ...prjConf, name: e.target.value })
            } />
          </div>
        </div>
        <div className="button-confirm mt-[50px] flex justify-end">
          <Button type="primary" onClick={() => setOptions({ ...options, open: true })}>确认设置</Button>
        </div>
      </div>

      <Modal
        title="修改确认"
        visible={options.open}
        onOk={logoNameEditConfirm}
        onCancel={() => setOptions({ ...options, open: false })}
        okText="确认"
        cancelText="取消"
      >
        是否确认修改以上配置?
      </Modal>
    </div>
  )

  /**
   * @description: 修改项目配置
   * @return {type}
   */
  async function updateProjectConfig() {
    try {
      const res: any = await apiUpdateProjectConfig({ uid: user.uid, localstore: user.localstore, appver: prjConf.name, appverpath: prjConf.logo })
      if (res.code && res.code === 200) {
        message.success(`修改成功!`)
        setOptions({ ...options, open: false })
      }
    } catch (err: any) {
      throw new Error(err)
    } finally {
      // finish
    }
  }
}
export default ProjectSettings