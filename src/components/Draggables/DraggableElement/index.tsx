import * as React from 'react'

import { useDrag, useDrop } from 'react-dnd'

import './index.scss'

const dragType = 'DraggableElement'
interface PropsType {
  ele: string
  className?: string
  index: number
  onDropHandler: (dragIndex: number, hoverIndex: number) => void
  children: React.ReactChild
}
export default function DraggableElement({ ele, className, index, onDropHandler, children, ...restProps }: PropsType) {
  const ref: any = React.useRef()

  const [, drag] = useDrag({
    type: dragType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: dragType,
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

  return React.createElement(ele, {
    className: `${className}${isOver ? dropClassName : ''}`,
    ref,
    ...restProps,
    children,
  })
}
