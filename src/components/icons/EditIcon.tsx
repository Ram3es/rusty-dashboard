import { ReactElement } from 'react'

const EditIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="#666E97" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.1534 0C8.01167 0 7.86161 0.0583334 7.75323 0.166667L6.73614 1.175L8.82034 3.25833L9.83743 2.25C10.0542 2.03333 10.0542 1.66667 9.83743 1.45833L8.54523 0.166667C8.43685 0.0583334 8.29512 0 8.1534 0ZM6.14423 1.76667L0 7.91667V10H2.0842L8.22843 3.85L6.14423 1.76667Z"/>
    </svg>
  )
}

export default EditIcon
