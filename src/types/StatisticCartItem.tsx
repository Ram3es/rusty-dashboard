import { ReactElement } from 'react'

export interface StatisticCartItem {
  text: string
  subtext: string
  icon: ReactElement
  percent?: number
  isCoinceValue?: boolean
}

export interface UserstatisticCartIrem extends StatisticCartItem {
  canEdit?: boolean
}
