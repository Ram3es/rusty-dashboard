import { ReactElement } from 'react'

const DownloadIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ' w-4'}`} viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.7676 1.68181V12.1879L4.24406 8.66437C3.95829 8.37859 3.49503 8.37859 3.20926 8.66437C2.92348 8.95014 2.92348 9.41356 3.20926 9.69934L7.98202 14.472C8.26779 14.7578 8.73121 14.7578 9.01683 14.472C9.01683 14.472 9.01684 14.472 9.01684 14.472L13.7896 9.69934C13.9325 9.55646 14.004 9.36904 14.004 9.18177C14.004 8.99466 13.9325 8.80724 13.7896 8.66437C13.5038 8.3786 13.0404 8.37858 12.7548 8.66437C12.7548 8.66437 12.7548 8.66438 12.7548 8.66438L9.23125 12.1879V1.68181C9.23125 1.27785 8.90358 0.95 8.49942 0.95C8.09527 0.95 7.7676 1.27767 7.7676 1.68181Z" fill="currentColor" stroke="currentColor" strokeWidth="0.1"/>
      <rect x="0.95" y="18.6167" width="15.1" height="1.46364" rx="0.731818" fill="currentColor" stroke="currentColor" strokeWidth="0.1"/>
    </svg>
  )
}

export default DownloadIcon
