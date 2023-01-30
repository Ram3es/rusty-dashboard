import { ReactElement } from 'react'

const StaffIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.2 1H16.4L20.6 5.2L10.8 15L1 5.2L5.2 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1 5.20007H20.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9.39961 1L6.59961 5.2L10.7996 15L14.9996 5.2L12.1996 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default StaffIcon
