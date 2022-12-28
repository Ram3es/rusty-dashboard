import { ReactElement } from 'react'

const MinesIson = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.542" cy="13.4327" r="5.75679" stroke="currentColor" strokeWidth="1.5"/>
      <ellipse cx="12.5423" cy="13.3589" rx="2.21415" ry="2.14035" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11.7599 5.3163L12.4989 2.73004L13.2378 5.3163H11.7599Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13.2381 21.5482L12.4992 24.1345L11.7603 21.5482L13.2381 21.5482Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.10316 10.0142L3.23286 8.08115L5.84209 8.73436L5.10316 10.0142Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19.9008 16.8503L21.771 18.7834L19.1618 18.1301L19.9008 16.8503Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19.1587 8.73384L21.768 8.08065L19.8977 10.0137L19.1587 8.73384Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.83932 18.1297L3.23009 18.7829L5.10039 16.8498L5.83932 18.1297Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>

  )
}

export default MinesIson
