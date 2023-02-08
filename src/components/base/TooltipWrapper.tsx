import React, { FC, ReactNode } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

interface ITooltipProps {
  anchorId: string
  children: ReactNode
  tooltipClasses?: string

}

const TooltipElement: FC<ITooltipProps> = ({ anchorId, children, tooltipClasses }) => {
  return (
        <Tooltip
        anchorId={anchorId}
        events={['hover']}
        className={tooltipClasses ?? 'bg-dark-22 opacity-100 w-[310px] border-[1.5px] border-dark-37 shadow-tooltip'}
        >
          {children}
        </Tooltip>

  )
}

export default TooltipElement
