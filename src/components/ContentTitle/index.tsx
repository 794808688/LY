import * as React from 'react'
import './index.scss'

interface Title {
  title: string
  style?: any
}
export default function ContentTitle({ title, style }: Title) {
  return (
    <span className="content-title-color" style={style}>
      {title}
    </span>
  )
}
