import { ReactElement, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NavItem } from '../../types/Nav'
import RustylootLogo from '../../assets/RustylootLogo.png'
import { User } from '../../types/User'
import LogoutIcon from '../icons/LogoutIcon'
import ArrowIcon from '../icons/ArrowIcon'

const MenuDesktop = ({ navigation, user }: { navigation: NavItem[], user: User }): ReactElement => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false)

  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64r md:flex-col w-64">
      <div className="flex min-h-0 flex-1 flex-col bg-dark-1">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-6">
            <img
              className="h-8 w-auto"
              src={RustylootLogo}
              alt="RustylootLogo"
            />
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-6">
            {navigation.map((item: NavItem) => (
              <>{ item.href
                ? <NavLink
                key={item.name}
                to={item.href}
                className="text-gray-6 hover:text-white hover:bg-dark-21 hover:bg-opacity-70 text-sm group gap-4 flex items-center px-4 py-3 font-medium rounded-lg"
                style={({ isActive }) => isActive ? { backgroundColor: 'rgba(255, 194, 57, 0.1)', color: '#ffc239' } : undefined}
              >
                {item.icon}
                {item.name}
              </NavLink>
                : <div>
                    <div
                      className={`${isSubmenuOpen ? 'text-white' : 'text-gray-6'} cursor-pointer hover:text-white hover:bg-dark-21 hover:bg-opacity-70 text-sm group gap-4 flex justify-between items-center px-4 py-3 font-medium rounded-lg`}
                      key={item.name}
                      onClick={() => setIsSubmenuOpen((prev: boolean) => !prev)}
                    >
                      <span className='flex gap-4'>
                        {item.icon}
                        {item.name}
                      </span>
                      <span className={`${isSubmenuOpen ? 'transform rotate-180' : ''}`}>
                        <ArrowIcon iconCalsses='w-2' />
                      </span>
                    </div>
                    {item.subNavigation && item.subNavigation?.length > 0
                      ? <div className={`${isSubmenuOpen ? 'block' : 'hidden'}`}>
                          {item.subNavigation.map((sublink: NavItem) => (
                            <NavLink
                              key={sublink.name}
                              to={sublink.href ?? ''}
                              className="text-gray-6 hover:text-white hover:bg-dark-21 hover:bg-opacity-70 text-sm group gap-4 flex items-center px-4 py-3 font-medium rounded-lg"
                              style={({ isActive }) => isActive ? { backgroundColor: 'rgba(255, 194, 57, 0.1)', color: '#ffc239' } : undefined}
                            >
                              {sublink.icon}
                              {sublink.name}
                            </NavLink>
                          ))}
                        </div>
                      : null}
                  </div>}</>
            ))}
          </nav>
        </div>
        <div className="flex flex-shrink-0 p-6">
          <div className="group block w-full flex-shrink-0 bg-dark-1f p-3 rounded-lg">
            <div className="flex flex-col items-center">
              <div className='flex justify-between items-center w-full mb-2'>
                <div className='p-0.5 rounded-full border-2 border-gray-3b'>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                  />
                </div>
                <div className='w-10 h-10 rounded-full bg-dark-1 text-gray-3b flex items-center justify-center cursor-pointer'>
                  <LogoutIcon iconCalsses='w-3 h-3' />
                </div>
              </div>
              <div className="ml-3 w-full">
                <p className="text-sm font-bold text-white">{user.name}</p>
                <p className="text-xs font-medium text-gray-6">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuDesktop
