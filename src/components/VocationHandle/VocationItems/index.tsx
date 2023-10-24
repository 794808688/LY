import * as React from 'react'

import { RightOutlined } from '@ant-design/icons'
import { nanoid } from 'nanoid'

import UnfoldVocationItems from './UnfoldVocationItems'

export default ({ frontData, hotData, vocationClickHandle }: any) => {
  return (
    <div className="vocation-items-container">
      <ul>
        {frontData.map((item1: any, index1: number) => (
          <li key={nanoid()} className="active">
            <div className="vocation-title-hot display-flex justify-content-space-between align-items-center">
              <div className="title">
                <span className="font-size-15 font-weight-600 color-333">{item1.name}</span>
              </div>
              <div className="hot">
                {hotData[index1].subLevelModelList.map((item2: any, index2: number) => (
                  <span key={nanoid()} className={`font-size-13 color-888 font-weight-600 ${index2 !== 0 ? 'margin-left-10' : ''}`}>
                    {item2.name}
                  </span>
                ))}
              </div>
              <div className="icon">
                <RightOutlined className="font-size-13 color-ddd" />
              </div>
            </div>

            <div className="vocation-unfold">
              <UnfoldVocationItems data={item1} vocationClickHandle={vocationClickHandle} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
