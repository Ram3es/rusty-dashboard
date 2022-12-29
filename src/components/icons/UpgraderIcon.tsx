import { ReactElement } from 'react'

const UpgraderIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.59961 6.57006V13.29L9.99957 8.32004L18.3996 13.29V6.57006L9.99957 1.60004L1.59961 6.57006Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.3996 16.5313L9.99957 11.5613L1.59961 16.5313" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.59961 19.3873L9.99957 14.4174L18.3996 19.3873" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default UpgraderIcon
