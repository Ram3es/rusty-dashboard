import { useEffect, useState } from 'react'
import Button from '../components/base/Button'
import InputWithLabel from '../components/base/InputWithLabel'
import AddUserInGroup from '../components/Sponsee/pop-up/AddUserInGroup'
import CreateGroupPopup from '../components/Sponsee/pop-up/CreateGroupPopup'
import RemovePopup from '../components/Sponsee/pop-up/RemovePopup'
import SponseeTableItem from '../components/Sponsee/SponseeTableItem'
import { User } from '../types/User'

export interface SponseeUser {
  user: User
  steamId: string
  code: string
  codeUses: number
  deposits: number
  balance: number
  status: {
    id: string
    isStatisticIncluded: boolean
  }
  id: string
}
interface IGroup {
  id: string
  name: string
  users: SponseeUser[]
}

const Sponsee = () => {
  const [groupSearchName, setGroupSearchName] = useState<string>('')
  const [data, setData] = useState<IGroup[]>()
  const [isOpenPopupAddUser, setOpenPopupAddUser] = useState<boolean>(false)
  const [isOpenCreateGroup, setOpenCreateGroup] = useState<boolean>(false)
  const [groupToEdit, setGroupToEdit] = useState<{ name: string, id: string }>()
  const [removeItem, setRemoveItem] = useState<{ user?: User, groupName: string, groupId: string }>()

  const togglePopup = () => {
    setOpenPopupAddUser(prev => !prev)
    setGroupToEdit(undefined)
  }

  const onCloseCeateGroupPopup = () => {
    setOpenCreateGroup(false)
  }

  const addGroup = () => {
    setOpenCreateGroup(true)
    console.log('add group')
  }

  const setCearchName = (name: string, value: string) => {
    setGroupSearchName(value)
  }

  const addUserToGroup = (groupId: string) => {
    console.log('add user to', groupId)
    const group = data?.find(group => group.id === groupId)
    setGroupToEdit(() => {
      if (group) {
        return { name: group.name, id: group.id }
      }
    })
    setOpenPopupAddUser(true)
  }

  const removeUserGromGroup = (userId: string, groupId: string) => {
    const group = data?.find(group => group.id === groupId) as IGroup
    const user = group?.users.find(user => user.id === userId)?.user as User

    setRemoveItem({ user, groupName: group.name, groupId: group.id })
  }

  const removeGroup = (groupId: string) => {
    const { id, name } = data?.find(group => group.id === groupId) as IGroup
    setRemoveItem({ groupId: id, groupName: name })
  }

  const submitRemove = () => {
    console.log(removeItem)
  }

  const updateUserInGroup = (id: string, updateOption: Record<string, string | number | boolean>) => {
    console.log('update user ', id, 'with options', updateOption)
  }

  useEffect(() => {
    setData([{
      name: 'YOUTUBERS',
      id: '1',
      users: [
        {
          user: { name: 'DerWeißWizard1', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
          steamId: '1',
          code: 'test',
          codeUses: 12,
          deposits: 1000,
          balance: 2000,
          status: {
            id: '1',
            isStatisticIncluded: true
          },
          id: '1'
        },
        {
          user: { name: 'DerWeißWizard2', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
          steamId: '2',
          code: 'test',
          codeUses: 12,
          deposits: 1000,
          balance: 2000,
          status: {
            id: '2',
            isStatisticIncluded: false
          },
          id: '2'
        }
      ]
    },
    {
      name: 'TWITCH STREAMERS',
      id: '2',
      users: [
        {
          user: { name: 'DerWeißWizard3', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
          steamId: '3',
          code: 'test',
          codeUses: 12,
          deposits: 1000,
          balance: 2000,
          status: {
            id: '3',
            isStatisticIncluded: true
          },
          id: '3'
        },
        {
          user: { name: 'DerWeißWizard3', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
          steamId: '3',
          code: 'test',
          codeUses: 12,
          deposits: 1000,
          balance: 2000,
          status: {
            id: '3',
            isStatisticIncluded: false
          },
          id: '4'
        }
      ]
    }])
  }, [])

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <div className='flex gap-5'>
            <div className='grow relative'>
              <InputWithLabel
                type="text"
                name='name'
                placeholder='Enter Group Name'
                value={groupSearchName}
                changeFunction={setCearchName}
              />
              <svg className='absolute right-2 top-1/2 transform -translate-y-2/3 z-20' width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 0C10.4777 0 13.5 3.02232 13.5 6.75C13.5 8.30982 12.9662 9.74138 12.0774 10.8844L17.7525 16.5594C17.9173 16.7243 18 16.9397 18 17.1562C18 17.3722 17.9173 17.5882 17.7525 17.7531C17.5882 17.9179 17.3723 18 17.1562 18C16.9402 18 16.7242 17.9179 16.56 17.7531L10.8844 12.0774C9.74138 12.9662 8.30979 13.5 6.75 13.5C3.02232 13.5 0 10.4777 0 6.75C0 3.02232 3.02232 0 6.75 0ZM6.75 11.8125C9.54168 11.8125 11.8125 9.54168 11.8125 6.75C11.8125 3.95832 9.54168 1.6875 6.75 1.6875C3.95832 1.6875 1.6875 3.95832 1.6875 6.75C1.6875 9.54168 3.95832 11.8125 6.75 11.8125Z" fill="#666E97"/>
              </svg>
            </div>
            <div className='w-44'>
              <Button text='Create Group' submitFunction={() => addGroup()} />
            </div>
          </div>
        </div>
          {data ? data.filter(group => group.name?.includes(groupSearchName)).map(item => <SponseeTableItem key={item.id} groupId={item.id} name={item.name} users={item.users} onAddUser={addUserToGroup} onRemoveUser={removeUserGromGroup} onGroupRemove={removeGroup} userUpdate={updateUserInGroup} />) : null}
      </div>
      <AddUserInGroup isOpenPopup={isOpenPopupAddUser} closePopup={togglePopup} groupToEdit={groupToEdit} />
      <CreateGroupPopup onGroupCreate={(name: string) => console.log('create group ', name)} isPopupOpen={isOpenCreateGroup} onClose={onCloseCeateGroupPopup} />
      <RemovePopup removeItem={removeItem} submitFunction={submitRemove} />
    </>
  )
}

export default Sponsee
