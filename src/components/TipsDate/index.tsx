import * as React from 'react'
import { getDateAll } from '~/utils/public'
import Timestamp from './index.d'
import './index.scss'

export default function TipsDate({ timestamp }: Timestamp) {
  return (
    <div className="tips-date-box padding-top-10">
      <div className="tips">
        <span>Tips: 数据定期更新，当前看到的数据和实时数据可能有延迟</span>
      </div>

      <div className="date">
        <span>最后更新于: {getDateAll(timestamp, 'y-m-d 时:分:秒')}</span>
      </div>
    </div>
  )
}
