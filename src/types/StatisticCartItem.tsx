import { ReactElement } from 'react'

export interface StatisticCartItem {
  text: string
  subtext: string
  icon: ReactElement | undefined
  percent?: number
  isCoinceValue?: boolean
  canEdit?: boolean
  editFunction?: Function
}
