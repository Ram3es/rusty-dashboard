import { useEffect, useState } from 'react'
import Button from '../components/base/Button'
import InputWithLabel from '../components/base/InputWithLabel'
import AddUserInGroup from '../components/Sponsee/pop-up/AddUserInGroup'
import CreateGroupPopup from '../components/Sponsee/pop-up/CreateGroupPopup'
import RemovePopup from '../components/Sponsee/pop-up/RemovePopup'
import SponseeTableItem from '../components/Sponsee/SponseeTableItem'
import { useUserContext } from '../store/UserStore'
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
  const [tableData, setTableData] = useState<IGroup[]>()
  const [isOpenPopupAddUser, setOpenPopupAddUser] = useState<boolean>(false)
  const [isOpenCreateGroup, setOpenCreateGroup] = useState<boolean>(false)
  const [groupToEdit, setGroupToEdit] = useState<{ name: string, id: string }>()
  const [removeItem, setRemoveItem] = useState<{ user?: User, groupName: string, groupId: string }>()
  const [user] = useUserContext()

  const togglePopup = () => {
    setOpenPopupAddUser(prev => !prev)
    setGroupToEdit(undefined)
  }

  const onCloseCeateGroupPopup = () => {
    setOpenCreateGroup(false)
  }

  const addGroup = () => {
    setOpenCreateGroup(true)
  }

  const setCearchName = (name: string, value: string) => {
    setGroupSearchName(value)
  }

  const addUserToGroup = (groupId: string) => {
    const group = tableData?.find(group => group.id === groupId)
    setGroupToEdit(() => {
      if (group) {
        return { name: group.name, id: group.id }
      }
    })
    setOpenPopupAddUser(true)
  }

  const submitUserToGroup = (userObj: { user_id: string, group_id: string }) => {
    user.socket?.emit('admin:group:user:add', userObj, (res: any) => {
      if (!res.error) {
        setTableData(prev => {
          if (prev) {
            return [...prev].map(group => {
              if (group.id !== userObj.group_id) {
                return group
              } else {
                return {
                  ...group,
                  users: [
                    ...group.users,
                    {
                      user: {
                        name: res.user[0].username,
                        avatar: res.user[0].avatar ?? ''
                      },
                      steamId: res.user[0].steamid ?? '',
                      code: res.user[0].code ?? '',
                      codeUses: res.user[0].earnings ?? 0,
                      deposits: res.user[0].wager ?? 0,
                      balance: res.user[0].balance ?? 0,
                      status: {
                        id: res.user[0].id,
                        isStatisticIncluded: !res.user[0].excluded
                      },
                      id: res.user[0].id
                    }
                  ]
                }
              }
            })
          }
        })
      }
    })
  }

  const removeUserGromGroup = (userId: string, groupId: string) => {
    const group = tableData?.find(group => group.id === groupId) as IGroup
    const user = group?.users.find(user => user.id === userId)
    setRemoveItem({ user: { ...user?.user, name: user?.user.name ?? '', avatar: user?.user.avatar ?? '', id: user?.id }, groupName: group.name, groupId: group.id })
  }

  const removeGroup = (groupId: string) => {
    const { id, name } = tableData?.find(group => group.id === groupId) as IGroup
    setRemoveItem({ groupId: id, groupName: name })
  }

  const submitRemove = () => {
    if (removeItem?.user) {
      user.socket?.emit('admin:group:user:delete', { group_id: removeItem?.groupId, user_id: removeItem?.user?.id }, (res: any) => {
        if (!res.error) {
          setTableData(prev => {
            if (prev) {
              return [...prev].map(group => {
                if (group.id !== removeItem?.groupId) {
                  return group
                } else {
                  return {
                    ...group,
                    users: [...group.users].filter(user => user.id !== removeItem?.user?.id)
                  }
                }
              })
            }
          })
          setRemoveItem(undefined)
        }
      })
    } else {
      user.socket?.emit('admin:group:delete', { group_id: removeItem?.groupId }, (data: any) => {
        if (!data.error) {
          setTableData((prev: IGroup[] | undefined) => {
            if (prev) return [...prev].filter((group: IGroup) => removeItem?.groupId !== group.id)
            return []
          })
          setRemoveItem(undefined)
        }
      })
    }
  }

  useEffect(() => {
    if (!tableData) {
      user.socket?.emit('admin:groups', {}, (data: any) => {
        if (data?.data) {
          const groups = data?.data?.map((group: any) => ({
            name: group.name,
            id: group.id,
            users: group.users.map((user: any) => ({
              user: {
                name: user.username,
                avatar: user.avatar ?? ''
              },
              steamId: user.steamid ?? '',
              code: user.code ?? '',
              codeUses: user.earnings ?? 0,
              deposits: user.wager ?? 0,
              balance: user.balance ?? 0,
              status: {
                id: user.id,
                isStatisticIncluded: !user.excluded
              },
              id: user.id
            }))
          }))
          setTableData(groups)
        }
      })
    }
  }, [tableData])

  const createGroupFn = (name: string) => {
    user.socket?.emit('admin:group:create', { name }, (data: any) => {
      console.log(data, 'admin:group:create')
      if (!data.error && data?.created?.length > 0) {
        setTableData(prev => prev && [...prev, {
          name: data.created[0].name,
          id: data.created[0].id,
          users: []
        }])
      }
    })
  }

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
          {tableData ? tableData.filter(group => group.name?.includes(groupSearchName)).map(item => <SponseeTableItem key={item.id} groupId={item.id} name={item.name} users={item.users} onAddUser={addUserToGroup} onRemoveUser={(userId, groupId) => removeUserGromGroup(userId, groupId)} onGroupRemove={removeGroup} />) : null}
      </div>
      <AddUserInGroup isOpenPopup={isOpenPopupAddUser} closePopup={togglePopup} groupToEdit={groupToEdit} onSubmit={submitUserToGroup} />
      <CreateGroupPopup onGroupCreate={(name: string) => createGroupFn(name)} isPopupOpen={isOpenCreateGroup} onClose={onCloseCeateGroupPopup} />
      <RemovePopup removeItem={removeItem} submitFunction={submitRemove} />
    </>
  )
}

export default Sponsee
