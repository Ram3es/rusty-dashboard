import { ReactElement } from 'react'

const AllGamesIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.75" y="1.58325" width="5.60143" height="5.60143" rx="1.25" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="0.75" y="10.8146" width="5.60143" height="5.60143" rx="1.25" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="9.98047" y="1.58325" width="5.60143" height="5.60143" rx="1.25" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="9.98242" y="10.8146" width="5.60143" height="5.60143" rx="1.25" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

export default AllGamesIcon
