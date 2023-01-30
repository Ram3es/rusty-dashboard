import { ReactElement } from 'react'

const BotsIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.38086 11.6846V12.9145" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M15.7578 11.6846V12.9145" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M12.0703 6.14966L12.0703 7.37962" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8.38086 16.6044L15.7606 16.6044" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4.0749 17.2194C2.37668 17.2194 1 15.8427 1 14.1445C1 12.4463 2.37668 11.0696 4.0749 11.0696" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20.679 17.2194C22.3772 17.2194 23.7539 15.8427 23.7539 14.1445C23.7539 12.4463 22.3772 11.0696 20.679 11.0696" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12.069" cy="3.0749" r="2.3249" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="4.21094" y="8.12976" width="15.7194" height="12.0296" rx="3.25" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

export default BotsIcon
