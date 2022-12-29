import { ReactElement } from 'react'

const PlinkoIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9.29867" cy="4.35879" r="2.70882" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="4.35726" cy="14.2408" r="2.70882" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14.2401" cy="14.2408" r="2.70882" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

export default PlinkoIcon
