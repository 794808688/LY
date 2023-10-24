import * as React from 'react'
import './index.scss'

/**
 * @description:
 * @param {any} param:
 * {
  * cardTitle: 卡片title,
  * amount: 卡片number,
  * unit: 单位(默认空),
  * bgc: 卡片颜色, 
  * shape: 卡片形状(默认矩形)
 * }
 * @return {*}
 */
export default function POCard({ cardTitle, amount, unit, bgc, shape }: any) {
  return (
    <div className={`card-box ${shape}`} style={{ backgroundColor: bgc }}>
      <div className="title-box">
        <span>{cardTitle}</span>
      </div>

      <div className="amount-box">
        <span>{amount}</span>
        <span>{unit}</span>
      </div>
    </div>
  )
}
