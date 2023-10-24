import React, { useRef } from 'react'

import { useDrag, useDrop } from 'react-dnd'

import './index.scss'

const type = 'DraggableTrItem'
export default function DraggableTrItem({ className, index, onDropHandler, style, ...restProps }: any) {
  const ref = useRef()

  const [, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex }: any = monitor.getItem() || {}
      if (dragIndex === index) {
        return {}
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      }
    },
    drop: (item: any) => {
      onDropHandler(item.index, index)
    },
  })

  drop(drag(ref))

  return <tr ref={ref} className={`${className}${isOver ? dropClassName : ''}`} style={{ cursor: 'move', ...style }} {...restProps} />
}
