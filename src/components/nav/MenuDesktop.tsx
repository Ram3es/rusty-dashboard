import { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { NavItem } from '../../types/Nav'
import RustylootLogo from '../../assets/RustylootLogo.png'

const MenuDesktop = ({ navigation }: { navigation: NavItem[] }): ReactElement => {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <div className="flex min-h-0 flex-1 flex-col bg-dark-1">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <img
              className="h-8 w-auto"
              src={RustylootLogo}
              alt="RustylootLogo"
            />
          </div>
          <nav className="mt-5 flex-1 space-y-1 px-2">
            {navigation.map((item: NavItem) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="text-gray-300 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
                style={({ isActive }) => isActive ? { backgroundColor: 'rgb(17 24 39)', color: 'white' } : undefined}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex flex-shrink-0 bg-gray-700 p-4">
          <a href="#" className="group block w-full flex-shrink-0">
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">Tom Cook</p>
                <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">View profile</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default MenuDesktop
