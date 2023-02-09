import { ReactElement } from 'react'

const DepositIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? 'w-4'}`} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="10.25" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11.8671 6.30935V6.38398L11.9386 6.40522C13.0844 6.74522 13.9 7.66894 13.9 8.74701C13.9 9.13935 13.5248 9.48167 13.0323 9.48167C12.5385 9.48167 12.1635 9.13927 12.1635 8.74701C12.1635 8.17306 11.6258 7.73026 10.9994 7.73026C10.3728 7.73026 9.83655 8.1732 9.83655 8.74701C9.83655 9.3218 10.3728 9.76482 10.9994 9.76482C12.6132 9.76482 13.9 10.8944 13.9 12.253C13.9 13.331 13.0844 14.2537 11.9386 14.5937L11.8671 14.615V14.6896V15.1632C11.8671 15.5569 11.4928 15.9 10.9994 15.9C10.5047 15.9 10.1305 15.5569 10.1305 15.1632V14.6896V14.615L10.059 14.5937C8.9133 14.2538 8.1 13.3311 8.1 12.253C8.1 11.8604 8.47307 11.5173 8.96766 11.5173C9.4613 11.5173 9.83655 11.8606 9.83655 12.253C9.83655 12.8278 10.3728 13.2708 10.9994 13.2708C11.6259 13.2708 12.1635 12.8279 12.1635 12.253C12.1635 11.6792 11.626 11.2352 10.9994 11.2352C9.38559 11.2352 8.1 10.1067 8.1 8.74701C8.1 7.66882 8.91335 6.74518 10.059 6.40522L10.1305 6.38398V6.30935V5.83571C10.1305 5.4442 10.5047 5.1 10.9994 5.1C11.4928 5.1 11.8671 5.44412 11.8671 5.83571V6.30935Z" fill="currentColor" stroke="#313131" strokeWidth="0.2"/>
    </svg>

  )
}

export default DepositIcon
