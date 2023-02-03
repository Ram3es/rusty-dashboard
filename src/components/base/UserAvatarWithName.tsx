import { FC } from 'react'
import { User } from '../../types/User'

interface IUserAvatarProps {
  user?: User
  isBorderShown?: boolean
  avatarClasses?: string
}

const UserAvatarWithName: FC<IUserAvatarProps> = ({ user, isBorderShown, avatarClasses }) => {
  return (isBorderShown
    ? <div className={ avatarClasses ?? 'flex gap-2 items-center'}>
        <div className='p-0.5 rounded-full border-2 border-gray-3b'>
          <img className='w-6 rounded-full' src={user?.avatar} alt={user?.name} />
        </div>
        <div className=''>{user?.name}</div>
       </div>

    : <div className='flex gap-2 items-center'>
        <img className='w-6 rounded-full' src={user?.avatar} alt={user?.name} />
        <div>{user?.name}</div>
      </div>
  )
}

export default UserAvatarWithName
