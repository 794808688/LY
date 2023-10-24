import React, { useEffect, useRef, useState } from 'react'

import { Modal } from 'antd'
import flvJs from 'flv.js'
import { nanoid } from 'nanoid'
// import { apiAddPlayer } from '~/api/service'

// import flvUrl from './2128new.flv'
// import mp4Url from './1.m4v'

export interface VideoDataType {
  id?: number | string
  title?: string
  url?: string
  type?: string
  nickname?: string
  time?: number
  cover?: string
}

export interface VideoProps {
  playData: VideoDataType
  visible?: boolean
}

/**
 * @description: 弹窗播放视频
 * @param {VideoProps} props :{type: 'flv' | 'mp4', url: 播放地址, title: 弹窗title}
 * @return {*}
 */
export default function ModalVideo(props: VideoProps) {
  const flvRef = useRef<flvJs.Player>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(false)
  const [videoData, setVideoData] = useState<VideoDataType>({})

  const initVideo = () => {
    if (flvJs.isSupported()) {
      flvRef.current = flvJs.createPlayer(
        {
          type: videoData.type || 'mp4',
          url: videoData.url || '',
          isLive: false,
          cors: true,
          hasVideo: true,
          hasAudio: true,
          withCredentials: false,
        },
        {
          enableStashBuffer: true,
          stashInitialSize: 1024 * 1000,
          lazyLoadMaxDuration: 60 * 1000,
          autoCleanupSourceBuffer: false,
          seekType: 'range',
          reuseRedirectedURL: true,
          // headers: {
          //   Authorization: `MoBaiTest ${nanoid()}`,
          // },
        }
      )
      if (videoRef.current) {
        flvRef.current.attachMediaElement(videoRef.current)
        flvRef.current.load()
        addPlayer()
      }
    }
  }

  useEffect(() => {
    console.log('playData', props.playData)
    props.playData && setVideoData(props.playData)
  }, [props.playData])

  useEffect(() => {
    videoData.url && setVisible(true)
  }, [videoData])

  useEffect(() => {
    videoData.url && visible && initVideo()
  }, [visible])

  function onClose() {
    if (flvRef.current && videoData.url) {
      flvRef.current.pause()
      flvRef.current.unload()
      flvRef.current.detachMediaElement()
      flvRef.current.destroy()
      flvRef.current = undefined
    }
    setVisible(false)
  }

  const onPlay = () => {
    addPlayer()
  }

  const addPlayer = async () => {
    try {
      // const result = await apiAddPlayer({id: videoData.id})
      // console.log(result)
    } catch {
    } finally {
    }
  }

  return (
    <div className="modal-video-container">
      <Modal maskClosable={true} visible={visible} width={1200} title={videoData.title || `课程播放`} onCancel={onClose} footer={null}>
        <video ref={videoRef} style={{ width: '100%', height: 620 }} controls={true}></video>
      </Modal>
    </div>
  )
}
