import { ReactElement } from 'react'

const UsersIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.10138 1.54561C5.62333 1.03857 6.33575 0.75 7.08301 0.75C7.83026 0.75 8.54269 1.03857 9.06464 1.54561C9.58585 2.05192 9.87451 2.73393 9.87451 3.44032C9.87451 4.1467 9.58585 4.82871 9.06464 5.33503C8.54269 5.84207 7.83026 6.13064 7.08301 6.13064C6.33575 6.13064 5.62333 5.84207 5.10138 5.33503C4.58017 4.82871 4.2915 4.1467 4.2915 3.44032C4.2915 2.73393 4.58017 2.05192 5.10138 1.54561ZM0.75 13.7613C0.75 11.3369 2.76284 9.35079 5.31226 9.35079H8.85376C11.4032 9.35079 13.416 11.3369 13.416 13.7613V15.4814C13.416 15.9998 12.9827 16.4516 12.3953 16.4516H1.77075C1.18333 16.4516 0.75 15.9998 0.75 15.4814V13.7613Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}

export default UsersIcon
