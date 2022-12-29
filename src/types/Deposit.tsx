import { ReactElement } from 'react'

export interface DepositBase {
  name: string
  value: number
}

export interface Deposit extends DepositBase {
  percent: number
  icon: ReactElement
  color: string
  chartColor: string
}
