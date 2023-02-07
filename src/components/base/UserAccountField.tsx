import BannedIcon from '../icons/BannedIcon'
import CopyIcon from '../icons/CopyIcon'
import MuteIcon from '../icons/MuteIcon'
import EditButton from './EditButton'

const UserAccountField = ({ value, label, editFieldValue, setFieldValue, icon }:
{ value: string | boolean | null | undefined, label: string | null | undefined, editFieldValue?: Function, setFieldValue?: Function, icon?: string }) => {
  return (
  <div className='w-full grid grid-cols-8 p-1'>
    <div className='col-span-3 p-1'>{ label }</div>
    <div className='col-span-5 bg-dark-25 p-2 rounded grid grid-cols-5'>
      <div className='col-span-3 whitespace-nowrap overflow-x-hidden text-ellipsis'>
        { value?.toString() }
      </div>
      <div className='col-span-2 flex justify-end items-center'>
        {
          (editFieldValue != null)
            ? <EditButton editFieldValue={() => editFieldValue(true)} />
            : null
        }
        { (setFieldValue === undefined)
          ? <div
            onClick={() => {
              if (value !== undefined && value !== null) {
                void navigator.clipboard.writeText(value.toString())
              }
            }}
            className='w-5 h-5 flex justify-center items-center mr-1 rounded bg-dark-17 text-gray-6 cursor-pointer'>
            <CopyIcon />
          </div>
          : <div
              onClick={() => setFieldValue(true)}
              className='w-5 h-5 flex justify-center items-center mr-1 rounded bg-dark-17 text-gray-6 cursor-pointer'>
              {
                (icon === 'MuteIcon')
                  ? <MuteIcon />
                  : <BannedIcon />
              }
            </div>
        }
    </div>
    </div>
  </div>
  )
}

export default UserAccountField
