import * as React from 'react'
import {
  PaperClipOutlined,
  FileExcelOutlined,
  FileWordOutlined,
  FileZipOutlined,
  SoundOutlined,
  VideoCameraOutlined,
  FilePdfOutlined,
  FilePptOutlined,
  Html5Outlined,
  FileTextOutlined,
  FileMarkdownOutlined,
} from '@ant-design/icons'

export default function IconGetNode(iconStr: string) {
  const node: any = {}
  node[iconStr] = <PaperClipOutlined />
  iconStr.indexOf('xls') !== -1 && (node[iconStr] = <FileExcelOutlined />)
  iconStr.indexOf('doc') !== -1 && (node[iconStr] = <FileWordOutlined />)
  iconStr.indexOf('pdf') !== -1 && (node[iconStr] = <FilePdfOutlined />)
  iconStr.indexOf('ppt') !== -1 && (node[iconStr] = <FilePptOutlined />)
  iconStr.indexOf('zip') !== -1 && (node[iconStr] = <FileZipOutlined />)
  iconStr.indexOf('mp4') !== -1 && (node[iconStr] = <VideoCameraOutlined />)
  iconStr.indexOf('mp3') !== -1 && (node[iconStr] = <SoundOutlined />)
  iconStr.indexOf('htm') !== -1 && (node[iconStr] = <Html5Outlined />)
  iconStr.indexOf('txt') !== -1 && (node[iconStr] = <FileTextOutlined />)
  iconStr.indexOf('md') !== -1 && (node[iconStr] = <FileMarkdownOutlined />)
  return node[iconStr]
}
