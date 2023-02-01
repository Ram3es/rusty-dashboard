import { useMemo } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime'
import Table from '../base/Table'
import dayjs from 'dayjs';
import { User } from '../../types/User'
import Button from '../base/Button'
import { Listbox } from '@headlessui/react'
import ArrowIcon from '../icons/ArrowIcon'

dayjs.extend(relativeTime)

const SitePermissions = ({ name }: { name: string }) => {
  const getUserComponent = (user: User) => {
    return (
      <div className='flex gap-2 items-center'>
        <img className='w-6 rounded-full' src={user.avatar} alt={user.name} />
        <div>{user.name}</div>
      </div>
    )
  }

  const getPermisionsPeacker = (permission: string) => {
    return (
      <div className="relative w-max">
          <Listbox value="permission" onChange={() => console.log('change permission')}>
            {({ open }) => (
              <>
                <Listbox.Button className='h-10 gap-4 flex items-center justify-between px-4 py-2 rounded bg-dark-17 text-gray-6'>
                  <span>{permission}</span>
                  <ArrowIcon iconCalsses={`w-4 transform ${open ? 'rotate-90' : ''}`} />
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 left-0 top-full bg-dark-17 mt-1 w-full px-4 py-2 rounded">
                    <Listbox.Option
                      className="cursor-pointer text-gray-6 hover:text-white"
                      value="One-site Basic"
                    >
                      One-site Basic
                    </Listbox.Option>
                    <Listbox.Option
                      className="cursor-pointer text-gray-6 hover:text-white"
                      value="One-site Basic 2"
                    >
                      One-site Basic 2
                    </Listbox.Option>
                    <Listbox.Option
                      className="cursor-pointer text-gray-6 hover:text-white"
                      value="One-site Basic 3"
                    >
                      One-site Basic 3
                    </Listbox.Option>
                </Listbox.Options>
              </>
            )}
          </Listbox>
        </div>
    )
  }

  const columns = useMemo(
    () => [
      {
        header: 'User',
        accessor: 'col1',
        Cell: (props: any) => getUserComponent(props.value)
      },
      {
        header: 'UID',
        accessor: 'col2'
      },
      {
        header: 'Steam 64',
        accessor: 'col3'
      },
      {
        header: 'Permisions',
        accessor: 'col4',
        Cell: (props: any) => getPermisionsPeacker(props.value)
      },
      {
        header: 'Last Updated',
        accessor: 'col5',
        Cell: (props: any) => dayjs(props.value).format('DD.MM.YY - HH:mm')
      }
    ],
    []
  )

  const data = useMemo(
    () => [
      {
        col1: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: '1',
        col3: '76561198880241741',
        col4: 'One-site Basic',
        col5: new Date('2023-01-12T16:51:16.919Z')
      },
      {
        col1: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: '1',
        col3: '76561198880241741',
        col4: 'One-site Basic',
        col5: new Date('2023-01-12T16:51:16.919Z')
      },
      {
        col1: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        col2: '1',
        col3: '76561198880241741',
        col4: 'One-site Basic',
        col5: new Date('2023-01-12T16:51:16.919Z')
      }
    ],
    []
  )

  return (
    <>
      <div className='flex flex-col justify-between h-full rounded-lg bg-dark-1 px-8 py-10'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h4 className='text-white uppercase text-2xl'>{name}</h4>
            <div className='flex gap-6'>
              <Button text='Add User' submitFunction={() => console.log('add')} color="gray" />
            </div>
          </div>
          <div className='w-full flex flex-col mb-4'>
            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  )
}

export default SitePermissions
