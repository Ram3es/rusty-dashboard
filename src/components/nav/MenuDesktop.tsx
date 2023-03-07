import { ReactElement, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { NavItem } from '../../types/Nav'
import RustylootLogo from '../../assets/RustylootLogo.png'
import { User } from '../../types/User'
import LogoutIcon from '../icons/LogoutIcon'
import ArrowIcon from '../icons/ArrowIcon'
import PopupWrapper from '../base/PopupWrapper'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'
import { useUserContext } from '../../store/UserStore'

const MenuDesktop = ({ navigation }: { navigation: NavItem[] }): ReactElement => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false)
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
  const [userDetails, setUserDetails] = useState<User>()
  const [user, setUser] = useUserContext()

  useEffect(() => {
    user.socket?.on('system:connect', (data: { error: boolean
      user: {
        authenticated: boolean
        data: any
      }
    }) => {
      console.log(data, 'system CONNEC ')
      if (!data.error) {
        setUser((prev: any) => {
          return { ...prev, isSystemConnect: true }
        })
        setUserDetails(user)
      }
    })
  }, [user.socket])

  const uploadFile = (file: File) => {
    console.log(file)
  }

  return (
    <>
    { user.token
      ? <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64r md:flex-col w-64 relative z-50">
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
            {navigation.map((item: NavItem, index: number) => (
              item.href
                ? <NavLink
                key={`menu-${index}`}
                to={item.href}
                className="text-gray-6 hover:text-white hover:bg-dark-21 hover:bg-opacity-70 text-sm group gap-4 flex items-center px-4 py-3 font-medium rounded-lg"
                style={({ isActive }) => isActive ? { backgroundColor: 'rgba(255, 194, 57, 0.1)', color: '#ffc239' } : undefined}
              >
                {item.icon}
                {item.name}
              </NavLink>
                : <div key={`dropdown-menu-${index}`}>
                    <div
                      className={`${isSubmenuOpen ? 'text-white' : 'text-gray-6'} cursor-pointer hover:text-white hover:bg-dark-21 hover:bg-opacity-70 text-sm group gap-4 flex justify-between items-center px-4 py-3 font-medium rounded-lg`}
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
                          {item.subNavigation.map((sublink: NavItem, index: number) => (
                            <NavLink
                              key={`submenu-${index}`}
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
                  </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-shrink-0 p-6">
          <div className="group block w-full flex-shrink-0 bg-dark-1f p-3 rounded-lg">
            <div className="flex flex-col items-center">
              <div className='flex justify-between items-center w-full mb-2'>
                <div
                  className='p-0.5 rounded-full border-2 border-gray-3b'
                  onClick={() => setIsOpenPopup(true)}
                >
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={user.avatar}
                    alt={user.name}
                    />
                </div>
                <div
                  className='w-10 h-10 rounded-full bg-dark-1 text-gray-3b flex items-center justify-center cursor-pointer'
                  onClick={() => {
                    setUser((prev: any) => ({ ...prev, token: undefined }))
                    sessionStorage.removeItem('token')
                  }}
                >
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
        {isOpenPopup
          ? <PopupWrapper closePopup={() => setIsOpenPopup(false)}>
              <div className='flex flex-col gap-5 items-center w-[400px] text-dark-1'>
                <h4 className='text-white uppercase text-3xl font-medium'>EDIT ACCOUNT DETAILS</h4>
                <div className='flex gap-2 items-start'>
                  <div className='p-0.5 rounded-full border-2 border-gray-3b'>
                    <img className='w-20 rounded-full' src={userDetails?.avatar ? userDetails?.avatar : '/src/assets/avatarIncognito.png'} alt={userDetails?.name} />
                  </div>
                  <div className='w-36'>
                    <div className='text-white'>Profile Picture</div>
                    <InputWithLabel
                      type='file'
                      changeFunction={uploadFile}
                      value={undefined}
                      name={''} />
                  </div>
                </div>

                <div className='flex flex-col items-end gap-2 w-56'>
                  <InputWithLabel
                    type='text'
                    label='Email'
                    value={userDetails?.email}
                    name={''}
                    placeholder=''
                    labelClasses="flex flex-col w-full text-gray-6 text-x"
                    inputClasses='px-3 py-2 bg-dark-17 rounded text-white h-11'
                    changeFunction={(name: string, value: string) => setUserDetails(prev => {
                      if (prev) {
                        return { ...prev, email: value }
                      }
                    })} />
                  <InputWithLabel
                    type='text'
                    label='Username'
                    value={userDetails?.name}
                    name={''}
                    placeholder=''
                    labelClasses="flex flex-col w-full text-gray-6 text-x"
                    inputClasses='px-3 py-2 bg-dark-17 rounded text-white h-11'
                    changeFunction={(name: string, value: string) => setUserDetails(prev => {
                      if (prev) {
                        return { ...prev, name: value }
                      }
                    })} />
                  <InputWithLabel
                    type='text'
                    label='Password'
                    value={userDetails?.password}
                    name={''}
                    placeholder=''
                    labelClasses="flex flex-col w-full text-gray-6 text-x"
                    inputClasses='px-3 py-2 bg-dark-17 rounded text-white h-11'
                    changeFunction={(name: string, value: string) => setUserDetails(prev => {
                      if (prev) {
                        return { ...prev, password: value }
                      }
                    })} />
                </div>
                <div className='flex justify-center gap-5 w-full [&>button]:max-w-[140px] mt-12' >
                  <Button text='SAVE SETTINGS' submitFunction={() => {
                    console.log('updated')
                    setIsOpenPopup(false)
                  }} />
                </div>
              </div>
            </PopupWrapper>
          : null}
      </div>
    </div>
      : ''}
    </>
  )
}

export default MenuDesktop
