import { ReactElement } from 'react'

const MinesIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.0354" cy="13.4883" r="5.48067" stroke="#3B436B" strokeWidth="1.5"/>
      <ellipse cx="12.0357" cy="13.4182" rx="2.10795" ry="2.03769" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11.3439 5.72534L11.9997 3.43005L12.6555 5.72534H11.3439Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12.6561 21.2507L12.0003 23.546L11.3445 21.2507L12.6561 21.2507Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4.94883 10.1746L3.28895 8.45899L5.60462 9.03871L4.94883 10.1746Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19.0512 16.8014L20.711 18.517L18.3954 17.9372L19.0512 16.8014Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18.3951 9.03806L20.7108 8.45837L19.0509 10.1739L18.3951 9.03806Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M5.60492 17.9366L3.28923 18.5163L4.94912 16.8007L5.60492 17.9366Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

export default MinesIcon
