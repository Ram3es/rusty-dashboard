import { ReactElement } from 'react'

const SkinsIcon = ({ iconCalsses }: { iconCalsses?: string }): ReactElement => {
  return (
    <svg className={`${iconCalsses ?? ''}`} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.55178 8.55188L10.5508 9.55093L9.55178 10.55L8.55273 9.55093L9.55178 8.55188Z" fill="white" fillOpacity="0.79"/>
      <path d="M8.05078 5.5545H11.0479V7.05307H8.05078V5.5545Z" fill="white" fillOpacity="0.79"/>
      <path d="M12.046 0.0592041H7.05078C7.05078 0.0592041 7.80007 1.55777 8.04983 4.55491H11.047C11.2967 1.55777 12.046 0.0592041 12.046 0.0592041Z" fill="white" fillOpacity="0.79"/>
      <path d="M7.0513 8.05225V11.0494H5.55273V8.05225H7.0513Z" fill="white" fillOpacity="0.79"/>
      <path d="M0.0585938 7.05322V12.0484C0.0585938 12.0484 1.55716 11.2992 4.5543 11.0494V8.05227C1.55716 7.80251 0.0585938 7.05322 0.0585938 7.05322Z" fill="white" fillOpacity="0.79"/>
      <path d="M10.2559 12.3766L12.3749 10.2576L13.4345 11.3171L11.3154 13.4362L10.2559 12.3766Z" fill="white" fillOpacity="0.79"/>
      <path d="M14.4957 18.0296L18.0275 14.4959C18.0275 14.4959 16.4391 13.9671 14.1425 12.0236L12.0234 14.1427C13.9669 16.4393 14.4957 18.0296 14.4957 18.0296Z" fill="white" fillOpacity="0.79"/>
    </svg>

  )
}

export default SkinsIcon
