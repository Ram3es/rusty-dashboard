import { ReactElement } from 'react'

const SponseeIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="9.25" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M14.8671 10.1903V10.2669L14.941 10.2869C16.092 10.5974 16.9 11.4375 16.9 12.4064C16.9 12.7489 16.5345 13.0652 16.0323 13.0652C15.5289 13.0652 15.1635 12.7488 15.1635 12.4064C15.1635 11.8704 14.6162 11.473 13.9994 11.473C13.3825 11.473 12.8365 11.8706 12.8365 12.4064C12.8365 12.9431 13.3824 13.3407 13.9994 13.3407C15.6228 13.3407 16.9 14.3727 16.9 15.5936C16.9 16.5624 16.092 17.4017 14.941 17.7122L14.8671 17.7321V17.8087V18.2393C14.8671 18.5831 14.5024 18.9 13.9994 18.9C13.4951 18.9 13.1305 18.583 13.1305 18.2393V17.8087V17.7321L13.0566 17.7122C11.9057 17.4017 11.1 16.5626 11.1 15.5936C11.1 15.2508 11.4635 14.9339 11.9677 14.9339C12.4709 14.9339 12.8365 15.251 12.8365 15.5936C12.8365 16.1303 13.3824 16.528 13.9994 16.528C14.6162 16.528 15.1635 16.1304 15.1635 15.5936C15.1635 15.0578 14.6163 14.6593 13.9994 14.6593C12.376 14.6593 11.1 13.6283 11.1 12.4064C11.1 11.4374 11.9058 10.5973 13.0566 10.2869L13.1305 10.2669V10.1903V9.75974C13.1305 9.41797 13.4951 9.1 13.9994 9.1C14.5024 9.1 14.8671 9.4179 14.8671 9.75974V10.1903Z" fill="currentColor" stroke="currentColor" strokeWidth="0.2"/>
    </svg>
  )
}

export default SponseeIcon