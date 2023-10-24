import * as React from 'react'

import './index.scss'

interface PropsType {
  frontItems: React.ReactNode
  rearItems: React.ReactNode
  showRearList: boolean
  onShowAllMouseOver: () => void
  onPositionBoxMouseLeave: () => void
}
export default ({ frontItems, rearItems, showRearList, onShowAllMouseOver, onPositionBoxMouseLeave }: PropsType) => {
  return (
    <div className="vocation-handle-container">
      <div className="vocation-handle-box" onMouseLeave={onPositionBoxMouseLeave}>
        <div className="vocation-handle-list">
          <div className="front-ul">{frontItems}</div>

          <div className={`show-all-hover display-flex align-items-center justify-content-center ${showRearList && 'hide'}`} onMouseOver={onShowAllMouseOver}>
            <span>显示全部职位</span>
          </div>

          <div className={`rear-ul ${!showRearList && 'hide'}`}>{rearItems}</div>
        </div>
      </div>
    </div>
  )
}
