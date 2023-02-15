import { Fragment, ReactElement, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { NavLink } from 'react-router-dom'
import CloseIcon from '../icons/CloseIcon'
import { NavItem } from '../../types/Nav'

const MenuMobile = ({ isOpen, setSidebarOpen, navigation }: { isOpen: boolean, setSidebarOpen: (value: boolean) => void, navigation: NavItem[] }): ReactElement => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <CloseIcon />
                  </button>
                </div>
              </Transition.Child>
              <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <nav className="mt-5 space-y-1 px-2">
                  {navigation.map((item: NavItem) => (
                    <>{ item.href
                      ? <NavLink
                      key={item.name}
                      to={item.href}
                      className="text-gray-300 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      style={({ isActive }) => isActive ? { backgroundColor: 'rgb(17 24 39)', color: 'white' } : undefined}
                    >
                      {item.name}
                    </NavLink>
                      : <div>
                          <div
                            className="text-gray-300 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            onClick={() => setIsSubmenuOpen(prev => !prev)}
                          >
                            {item.name}
                          </div>
                          <div className={`${isSubmenuOpen ? 'block' : 'hidden'}`}></div>
                        </div>}</>
                  ))}
                </nav>
              </div>
              <div className="flex flex-shrink-0 bg-gray-700 p-4">
                <a href="#" className="group block flex-shrink-0">
                  <div className="flex items-center">
                    <div>
                      <img
                        className="inline-block h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-white">Tom Cook</p>
                      <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">View profile</p>
                    </div>
                  </div>
                </a>
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default MenuMobile
