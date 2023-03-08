import { FC, useMemo, useState } from 'react'
import InputWithLabel from '../base/InputWithLabel'
import Table from '../base/Table'
import CoinceImage from '../../assets/coins.png'
import { SponseeUser } from '../../routes/Sponsee'
import Button from '../base/Button'
import UserAvatarWithName from '../base/UserAvatarWithName'

interface SponseeTableItemProps {
  name: string
  users: SponseeUser[]
  groupId: string
  onAddUser: (groupId: string) => void
  onRemoveUser: (userId: string, groupId: string) => void
  onGroupRemove: (groupId: string) => void
}

const SponseeTableItem: FC<SponseeTableItemProps> = ({ name, users, onAddUser, onRemoveUser, groupId, onGroupRemove }) => {
  const [searchNames, setSearchNames] = useState<{ userName: string }>({
    userName: ''
  })

  const getUserComponent = (props: any) => {
    return <UserAvatarWithName user={props}/>
  }

  const updateSearch = (name: string, value: string) => {
    setSearchNames(() => {
      return { userName: value }
    })
  }

  const columns = useMemo(
    () => [
      {
        header: 'Username',
        accessor: 'user',
        Cell: (props: any) => getUserComponent(props.value)
      },
      {
        header: 'Steam ID',
        accessor: 'steamId'
      },
      {
        header: 'Affiliate Code',
        accessor: 'code'
      },
      {
        header: 'Code Uses',
        accessor: 'codeUses'
      },
      {
        header: 'Code Lifetime Deposits',
        accessor: 'deposits',
        Cell: (props: any) => <div className='flex items-center flex-2 gap-2'><img className='w-7 h-3' src={CoinceImage} alt="CoinceImage" /><span className='text-white text-lg'>{props.value}</span></div>
      },
      {
        header: 'Balance',
        accessor: 'balance',
        Cell: (props: any) => <div className='flex items-center flex-2 gap-2'><img className='w-7 h-3' src={CoinceImage} alt="CoinceImage" /><span className='text-white text-lg'>{props.value}</span></div>
      },
      {
        header: 'Action',
        accessor: 'id',
        Cell: (props: any) => <div className='text-gray-6 text-base flex gap-2 items-center cursor-pointer' onClick={() => onRemoveUser(props.value, groupId)}>
        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.0637 16.7729H4.69639C3.80669 16.7729 2.95344 16.4194 2.32433 15.7903C1.69523 15.1612 1.3418 14.308 1.3418 13.4183V4.02541C1.3418 3.84747 1.41248 3.67682 1.5383 3.551C1.66413 3.42518 1.83478 3.35449 2.01271 3.35449C2.19065 3.35449 2.3613 3.42518 2.48713 3.551C2.61295 3.67682 2.68363 3.84747 2.68363 4.02541V13.4183C2.68363 13.9521 2.89569 14.464 3.27315 14.8415C3.65062 15.219 4.16257 15.431 4.69639 15.431H10.0637C10.5975 15.431 11.1095 15.219 11.487 14.8415C11.8644 14.464 12.0765 13.9521 12.0765 13.4183V4.02541C12.0765 3.84747 12.1472 3.67682 12.273 3.551C12.3988 3.42518 12.5695 3.35449 12.7474 3.35449C12.9253 3.35449 13.096 3.42518 13.2218 3.551C13.3476 3.67682 13.4183 3.84747 13.4183 4.02541V13.4183C13.4183 14.308 13.0649 15.1612 12.4358 15.7903C11.8067 16.4194 10.9534 16.7729 10.0637 16.7729Z" fill="#666E97"/>
          <path d="M14.0893 4.02543H0.670918C0.492979 4.02543 0.322329 3.95474 0.196507 3.82892C0.0706859 3.7031 0 3.53245 0 3.35451C0 3.17657 0.0706859 3.00592 0.196507 2.8801C0.322329 2.75428 0.492979 2.68359 0.670918 2.68359H14.0893C14.2672 2.68359 14.4379 2.75428 14.5637 2.8801C14.6895 3.00592 14.7602 3.17657 14.7602 3.35451C14.7602 3.53245 14.6895 3.7031 14.5637 3.82892C14.4379 3.95474 14.2672 4.02543 14.0893 4.02543Z" fill="#666E97"/>
          <path d="M10.0637 4.02551H4.69631C4.51837 4.02551 4.34772 3.95482 4.2219 3.829C4.09608 3.70318 4.02539 3.53253 4.02539 3.35459V2.01275C4.02539 1.47894 4.23745 0.966987 4.61491 0.589522C4.99238 0.212057 5.50433 0 6.03814 0H8.72182C9.25563 0 9.76758 0.212057 10.145 0.589522C10.5225 0.966987 10.7346 1.47894 10.7346 2.01275V3.35459C10.7346 3.53253 10.6639 3.70318 10.5381 3.829C10.4122 3.95482 10.2416 4.02551 10.0637 4.02551ZM5.36723 2.68367H9.39273V2.01275C9.39273 1.83482 9.32205 1.66416 9.19623 1.53834C9.07041 1.41252 8.89975 1.34184 8.72182 1.34184H6.03814C5.86021 1.34184 5.68956 1.41252 5.56373 1.53834C5.43791 1.66416 5.36723 1.83482 5.36723 2.01275V2.68367Z" fill="#666E97"/>
          <path d="M6.03811 12.7477C5.86017 12.7477 5.68952 12.677 5.56369 12.5512C5.43787 12.4254 5.36719 12.2548 5.36719 12.0768V7.38039C5.36719 7.20245 5.43787 7.0318 5.56369 6.90598C5.68952 6.78016 5.86017 6.70947 6.03811 6.70947C6.21604 6.70947 6.38669 6.78016 6.51252 6.90598C6.63834 7.0318 6.70902 7.20245 6.70902 7.38039V12.0768C6.70902 12.2548 6.63834 12.4254 6.51252 12.5512C6.38669 12.677 6.21604 12.7477 6.03811 12.7477Z" fill="#666E97"/>
          <path d="M8.72365 12.7477C8.54571 12.7477 8.37506 12.677 8.24924 12.5512C8.12342 12.4254 8.05273 12.2548 8.05273 12.0768V7.38039C8.05273 7.20245 8.12342 7.0318 8.24924 6.90598C8.37506 6.78016 8.54571 6.70947 8.72365 6.70947C8.90159 6.70947 9.07224 6.78016 9.19806 6.90598C9.32388 7.0318 9.39457 7.20245 9.39457 7.38039V12.0768C9.39457 12.2548 9.32388 12.4254 9.19806 12.5512C9.07224 12.677 8.90159 12.7477 8.72365 12.7477Z" fill="#666E97"/>
        </svg>
        <span>Remove</span>
      </div>
      }
    ],
    []
  )

  const data = useMemo(
    () => [...users].filter((i) => i.user?.name?.includes(searchNames.userName.toString())),
    [searchNames.userName, users]
  )

  return (
    <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
      <div className='flex flex-col justify-between h-full rounded-lg bg-dark-1'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h4 className='text-white uppercase text-2xl'>{name}</h4>
            <div className='flex gap-6 w-max'>
              <div className='w-96'>
                <InputWithLabel type='text' value={searchNames.userName} name="userName" changeFunction={updateSearch} placeholder="Search" />
              </div>
              <div className='w-max'>
                <Button text='Add User' color='grey' submitFunction={() => onAddUser(groupId)} />
              </div>
              <div className='w-max'>
                <Button text='Delete Group' color='grey' submitFunction={() => onGroupRemove(groupId)} />
              </div>
            </div>
          </div>
          <div className='w-full flex flex-col mb-4'>
            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SponseeTableItem
