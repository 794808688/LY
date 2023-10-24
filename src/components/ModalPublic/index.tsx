import * as React from 'react'

import { Modal } from 'antd'

interface PropsType {
  width?: number
  title?: string
  modalVisible: boolean
  closable?: boolean
  modalFooter?: React.ReactNode[] | boolean
  modalHandleOk?: () => void
  modalHandleCancel?: () => void
  children: React.ReactChild
}
export default function ModalPublic({ width, title, modalVisible, closable, modalHandleOk, modalHandleCancel, modalFooter, children }: PropsType) {
  return (
    <Modal
      getContainer={false}
      width={width}
      title={title}
      visible={modalVisible}
      closable={closable}
      onOk={modalHandleOk}
      onCancel={modalHandleCancel}
      footer={modalFooter}
    >
      {children}
    </Modal>
  )
}
