import { ReactElement } from 'react'

const JackpotIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.483 15.3372C15.6966 16.296 14.707 17.0682 13.5858 17.5979C12.4645 18.1276 11.2396 18.4016 9.99959 18.4001C7.77177 18.4001 5.63518 17.5151 4.05988 15.9398C2.48457 14.3645 1.59961 12.2279 1.59961 10.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.59961 10C1.59961 7.7722 2.48457 5.63567 4.05988 4.06036C5.63518 2.48505 7.77177 1.60004 9.99959 1.60004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 1.60004C12.2278 1.60004 14.3644 2.48505 15.9397 4.06036C17.515 5.63567 18.4 7.7722 18.4 10C18.4037 11.9482 17.7257 13.8364 16.4834 15.3371" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9.99883" cy="10" r="4.2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16.483 15.3372C15.6966 16.296 14.707 17.0682 13.5858 17.5979C12.4645 18.1276 11.2396 18.4016 9.99959 18.4001C7.77177 18.4001 5.63518 17.5151 4.05988 15.9398C2.48457 14.3645 1.59961 12.2279 1.59961 10.0001" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M1.59961 10C1.59961 7.7722 2.48457 5.63567 4.05988 4.06036C5.63518 2.48505 7.77177 1.60004 9.99959 1.60004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 1.60004C12.2278 1.60004 14.3644 2.48505 15.9397 4.06036C17.515 5.63567 18.4 7.7722 18.4 10C18.4037 11.9482 17.7257 13.8364 16.4834 15.3371" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9.99883" cy="10" r="4.2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>

  )
}

export default JackpotIcon
