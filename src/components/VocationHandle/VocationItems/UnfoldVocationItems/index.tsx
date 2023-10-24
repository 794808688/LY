import * as React from 'react'

import { nanoid } from 'nanoid'

import './index.scss'

export default ({ data, vocationClickHandle }: any) => {
  const { name, subLevelModelList } = data

  return (
    <div className="unfold-position-items-container">
      <div className="unfild-title">
        <span className="font-size-14 font-weight-600 color-333">{name}</span>
      </div>

      <div className="unfold-content padding-top-10">
        {subLevelModelList &&
          subLevelModelList.map((item1: any) => (
            <div className="unfold-item display-flex" key={nanoid()}>
              <div className="item-title">
                <span className="font-size-13 color-666">{item1.name}</span>
              </div>

              <div className="item-list">
                {item1.subLevelModelList.map((item2: any) => (
                  <span className="font-size-13" key={nanoid()} onClick={() => vocationClickHandle(item1, item2)}>
                    {item2.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
