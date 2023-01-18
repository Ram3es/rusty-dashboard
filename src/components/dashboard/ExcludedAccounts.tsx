import { useMemo, useState } from 'react'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'
import Table from '../base/Table'
import Image from '../../assets/RustylootLogo.png'
import SteamIcon from '../icons/SteamIcon'
import CloseIcon from '../icons/CloseIcon'

const ExcludedAccounts = ({ name }: { name: string }) => {
  const [state, setState] = useState({
    account: ''
  })

  const updateCode = (name: string, value: string | number) => {
    const newValue: Record<string, string | number> = {}
    newValue[name] = value
    setState(prevState => {
      return { ...prevState, ...newValue }
    })
  }

  const codeSubmit = () => {
    console.log(state)
  }

  const columns = useMemo(
    () => [
      {
        header: 'Account',
        accessor: 'col1'
      },
      {
        header: 'Action',
        accessor: 'col2'
      }
    ],
    []
  )

  const data = useMemo(
    () => [
      {
        col1: <div className='flex items-center gap-2'><img src={Image} className="w-4 h-4 rounded-full" /> Terry</div>,
        col2: <div className='w-full flex justify-center items-center gap-1'>
          <div className='w-5 h-5 flex justify-center items-center rounded bg-dark-17 text-gray-6 cursor-pointer'>
            <SteamIcon iconCalsses='w-3' />
          </div>
          <div className='w-5 h-5 flex justify-center items-center rounded bg-dark-17 text-gray-6 cursor-pointer'>
            <CloseIcon />
          </div>
        </div>
      },
      {
        col1: <div className='flex items-center gap-2'><img src={Image} className="w-4 h-4 rounded-full" /> Terry</div>,
        col2: <div className='w-full flex justify-center items-center gap-1'>
          <div className='w-5 h-5 flex justify-center items-center rounded bg-dark-17 text-gray-6 cursor-pointer'>
            <SteamIcon iconCalsses='w-3' />
          </div>
          <div className='w-5 h-5 flex justify-center items-center rounded bg-dark-17 text-gray-6 cursor-pointer'>
            <CloseIcon />
          </div>
        </div>
      }
    ],
    []
  )

  return (
    <>
      <div className='flex flex-col justify-between h-full'>
        <div className='w-full'>
          <h4 className='text-white uppercase text-2xl mb-6'>{name}</h4>
          <div className='w-full flex flex-col mb-4'>
            <Table columns={columns} data={data} isHeaderHidden={true} />
          </div>
        </div>
        <div className="flex w-full justify-between items-end gap-4" style={{ width: 'calc(100% - 60px)' }}>
          <div className='w-full'>
            <InputWithLabel
            label="Acount"
            type="text"
            value={state.account}
            name="account"
            changeFunction={updateCode}
            placeholder="Steam 64 / Name"
          />
          </div>
          <div className='w-10'>
            <Button text='Add' submitFunction={codeSubmit} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ExcludedAccounts
