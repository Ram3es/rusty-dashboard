import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import Button from '../base/Button'
import ButtonsToggle from '../base/ButtonsToggle'
import InputWithLabel from '../base/InputWithLabel'
import PopupWrapper from '../base/PopupWrapper'

interface ICheckBoxState {
  dashboard: boolean
  staff: boolean
  bots: boolean
  games: boolean
  users: boolean
}

const label = ['Dashboard', 'Staff', 'Bots', 'Games', 'Users']
const options = ['View Access', 'Edit Access']

const EditPermissions = ({ onClose }: { onClose: Function }) => {
  const [currentSelected, setCurrentSelect] = useState(options[0])
  const [isChecked, setChecked] = useState<ICheckBoxState>({ dashboard: false, staff: true, bots: true, games: false, users: false })

  const handleCheckBox = (params: { name: string, isChecked: boolean }) => {
    const { name, isChecked } = params
    setChecked(prev => ({ ...prev, [name]: isChecked }))
  }
  return (
        <PopupWrapper closePopup={ onClose }>
            <div className=' flex flex-col items-center w-[400px]'>
              <h4 className='text-white uppercase text-3xl font-medium mb-2'>Edit Permission</h4>
              <p className='text-center text-gray-6 font-normal text-sm leading-5 px-10'>Select the pages which this user can view as well as their permissions</p>
              <div className='flex items-center pt-5'>
                <div className='p-0.5 rounded-full border-2 border-gray-3b'>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={''}
                    alt={''}
                  />
                </div>
                <span className='text-base font-semibold text-gray-6 pl-3'>Grodslaktaren</span>
              </div>
              <h6 className='text-white text-base  mt-8'>Pages</h6>
              <div className='grid grid-cols-2 gap-x-[120px] gap-y-4 mt-2' >
                {label.map((item) => {
                  const key = item.toLowerCase() as keyof ICheckBoxState
                  return (
                      <InputWithLabel
                       key={key}
                       name={key}
                       type='checkbox'
                       labelRight={item}
                       value={isChecked[key]}
                       changeFunction={ handleCheckBox }/>)
                })}
              </div>
                <Tooltip anchorId='tooltip' events={['hover']} delayHide={500} style={{ backgroundColor: '#22273E', opacity: 1, width: '310px', border: '1.5px solid rgba(140, 152, 169, 0.2)', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', borderRadius: '4px' }} >
                  <p className=' text-gray-8 text-sm'>View Access only allows the user to view pages but not edit anything. Edit access allows the user to view the page and edit it.</p>
                </Tooltip>
              <div className='flex items-center mt-3 gap-2' >
                <h6 className='text-white text-base '>Permissions</h6>
                <svg id='tooltip' className='cursor-pointer' width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.51034 3.75C8.06591 3.75922 8.59087 3.86775 9.052 4.19781C9.85711 4.77416 10.1188 5.81175 9.66507 6.64889C9.47566 6.99844 9.19049 7.27002 8.90427 7.53871C8.71222 7.71915 8.51912 7.89827 8.32892 8.08055C8.07883 8.32026 7.96435 8.62214 7.93401 8.96089C7.92689 9.03965 7.92135 9.11841 7.91449 9.19717C7.90077 9.35496 7.79525 9.45479 7.63512 9.45848C7.5296 9.46112 7.42408 9.46033 7.31856 9.45901C7.13918 9.45664 7.02759 9.34837 7.02653 9.16951C7.02205 8.53231 7.21331 7.97071 7.6805 7.52106C7.91053 7.29953 8.14927 7.08695 8.38062 6.86621C8.48535 6.76637 8.58691 6.66206 8.68004 6.55143C8.97286 6.20398 9.02852 5.80701 8.86232 5.39529C8.65946 4.89243 8.27299 4.5903 7.73299 4.52049C7.17268 4.44779 6.68887 4.60636 6.36334 5.09342C6.25386 5.25726 6.19002 5.45298 6.1151 5.6379C6.03702 5.83125 5.86238 5.96032 5.66031 5.95716C5.45692 5.954 5.27068 5.82308 5.21845 5.62499C5.19602 5.53965 5.19154 5.43876 5.21396 5.3542C5.44479 4.48677 6.16074 3.88013 7.05793 3.78556C7.20856 3.76976 7.35998 3.76185 7.51087 3.75026L7.51034 3.75Z" fill="#4F5677"/>
                  <path d="M6.9043 10.7408C6.90352 10.4585 7.13015 10.2291 7.41109 10.2271C7.69595 10.2252 7.92832 10.4572 7.92702 10.7426C7.92571 11.0241 7.69673 11.2506 7.41396 11.2498C7.12937 11.249 6.90508 11.0249 6.9043 10.7405V10.7408Z" fill="#4F5677"/>
                  <path d="M15 7.93835C14.9613 8.22721 14.9367 8.51873 14.8818 8.80418C14.4251 11.1784 13.1335 12.954 11.0183 14.1174C9.82451 14.774 8.5295 15.0685 7.17196 14.9866C4.51411 14.8255 2.4668 13.5996 1.0653 11.3361C0.279273 10.0665 -0.0868317 8.65937 0.0173906 7.17223C0.236826 4.04025 1.81077 1.82907 4.68162 0.555734C5.39981 0.236926 6.16347 0.0761955 6.94874 0.0238822C6.98702 0.0212286 7.02454 0.0083398 7.06206 0H7.94093C7.97807 0.00871888 8.01521 0.0223658 8.05273 0.0250194C8.96648 0.0894633 9.84384 0.306298 10.6647 0.71002C12.9735 1.84575 14.386 3.67899 14.8814 6.2086C14.9363 6.48912 14.961 6.77609 15 7.05964V7.93835V7.93835ZM7.50585 0.650884C3.73111 0.647851 0.659399 3.71159 0.648409 7.49104C0.637418 11.2481 3.70913 14.3562 7.43233 14.3555C11.2673 14.3547 14.3534 11.2978 14.3542 7.50014C14.355 3.72789 11.2814 0.654295 7.50585 0.651263V0.650884Z" fill="#4F5677"/>
                </svg>
              </div>
              <div className='mt-3'>
                <span className='text-gray-500 text-xs'>Tab Bar AutoWidth</span>
              <ButtonsToggle options={options} currentSelect={currentSelected} peackFunction={setCurrentSelect} />
              </div>
              <div className='flex w-[80%] gap-5 mt-6' >
              <Button text='Cancel' color='default' submitFunction={() => { '' }} />
              <Button text='Confirm' submitFunction={() => { '' }} />
              </div>
            </div>
        </PopupWrapper>)
}
export default EditPermissions
