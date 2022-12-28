import { ReactElement } from 'react'

const ArrowIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.251051 0.256282C0.585786 -0.0854272 1.1285 -0.0854272 1.46323 0.256282L6 4.88756L10.5368 0.256282C10.8715 -0.0854272 11.4142 -0.0854272 11.7489 0.256282C12.0837 0.59799 12.0837 1.15201 11.7489 1.49372L6.60609 6.74372C6.27136 7.08543 5.72864 7.08543 5.39391 6.74372L0.251051 1.49372C-0.0836838 1.15201 -0.0836838 0.59799 0.251051 0.256282Z" fill="currentColor"/>
    </svg>
  )
}

export default ArrowIcon
