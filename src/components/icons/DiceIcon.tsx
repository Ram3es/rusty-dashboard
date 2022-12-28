
import { ReactElement } from 'react'

const DiceIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 6.5C6.32843 6.5 7 5.82843 7 5C7 4.17157 6.32843 3.5 5.5 3.5C4.67157 3.5 4 4.17157 4 5C4 5.82843 4.67157 6.5 5.5 6.5Z" fill="#FFC239"/>
      <path d="M13.5 14.5C14.3284 14.5 15 13.8284 15 13C15 12.1716 14.3284 11.5 13.5 11.5C12.6716 11.5 12 12.1716 12 13C12 13.8284 12.6716 14.5 13.5 14.5Z" fill="#FFC239"/>
      <path d="M9.5 10.5C10.3284 10.5 11 9.82843 11 9C11 8.17157 10.3284 7.5 9.5 7.5C8.67157 7.5 8 8.17157 8 9C8 9.82843 8.67157 10.5 9.5 10.5Z" fill="#FFC239"/>
      <rect x="0.75" y="0.75" width="16.5" height="16.5" rx="1.25" stroke="#FFC239" strokeWidth="1.5"/>
    </svg>
  )
}

export default DiceIcon
