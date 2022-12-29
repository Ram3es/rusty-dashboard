import { ReactElement } from 'react'

const CoinFlipIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 21 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10.4066" cy="11.65" r="3.1" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10.3516" cy="11.65" r="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13.3561 20.3356C8.28558 21.7302 3.1743 19.0269 1.93976 14.2976C1.23755 11.6075 1.94086 8.84142 3.61107 6.69947" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.2552 3.32545C12.3257 1.93085 17.437 4.63415 18.6716 9.36345C19.3738 12.0535 18.6705 14.8196 17.0003 16.9615" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M0.873047 7.35297L3.57279 6.61043L4.28001 9.31964" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.7383 16.3067L17.0385 17.0492L16.3313 14.34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default CoinFlipIcon
