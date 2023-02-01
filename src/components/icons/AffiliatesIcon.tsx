import { ReactElement } from 'react'

const AffiliatesIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.8125 16.6253H16C17.3808 16.6253 18.5001 15.506 18.5001 14.1253V14.1253C18.5001 12.0542 16.8211 10.3752 14.75 10.3752H13.8125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.25 7.2501C13.9759 7.2501 15.375 5.85097 15.375 4.12505C15.375 2.39913 13.9759 1 12.25 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 14.1253C1 12.0542 2.67896 10.3752 4.75006 10.3752H8.18762C10.2587 10.3752 11.9377 12.0542 11.9377 14.1253V14.1253C11.9377 15.506 10.8184 16.6253 9.43763 16.6253H3.50004C2.1193 16.6253 1 15.506 1 14.1253V14.1253Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="6.4688" cy="4.12505" rx="3.12505" ry="3.12505" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default AffiliatesIcon
