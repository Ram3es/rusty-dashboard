import { ReactElement } from 'react'

const UploadIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ' w-4'}`} viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.26473 17.3685V7.64731L4.00772 10.9043C3.74161 11.1704 3.31023 11.1704 3.04412 10.9043C2.778 10.6382 2.778 10.2066 3.04412 9.94052L7.4644 5.5203C7.73051 5.2542 8.16204 5.25418 8.42801 5.5203C8.42801 5.52031 8.42802 5.52031 8.42802 5.52031L12.8483 9.94052C12.9813 10.0736 13.048 10.2481 13.048 10.4225C13.048 10.5967 12.9813 10.7712 12.8483 10.9043C12.5822 11.1704 12.1507 11.1704 11.8847 10.9043C11.8847 10.9043 11.8847 10.9043 11.8847 10.9043L8.62767 7.64731V17.3685C8.62767 17.7447 8.32255 18.05 7.9462 18.05C7.56986 18.05 7.26473 17.7449 7.26473 17.3685Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1"/>
      <rect x="-0.05" y="0.05" width="13.9922" height="1.36293" rx="0.681464" transform="matrix(1 0 0 -1 1 1.73794)" fill="currentColor" stroke="currentColor" strokeWidth="0.1"/>
    </svg>
  )
}

export default UploadIcon
