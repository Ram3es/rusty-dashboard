import MainStatistic from '../components/users/MainStatistic'
import UserAccountInformation from '../components/users/UserAccountInformation'
import UserSearch from '../components/users/UserSearch'

const timePeriodOptions = [
  { id: 1, name: 'Today', unavailable: false },
  { id: 2, name: 'Yesterday', unavailable: false },
  { id: 3, name: 'This week', unavailable: false },
  { id: 4, name: 'This month', unavailable: false }
]

const Users = () => {
  const foundUser = (obj: Record<string, string>) => {
    console.log('foundUser', obj)
  }

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <UserSearch submitFn={foundUser} />
        </div>
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <MainStatistic timePeriodOptions={timePeriodOptions} />
        </div>
      </div>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-white">Users</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          {/* Replace with your content */}
          <div className="py-4">
            <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
          </div>
          {/* /End replace */}
        </div>
        <div className="col-span-3 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <UserAccountInformation timePeriodOptions={timePeriodOptions}/>
        </div>
      </div>
    </>
  )
}

export default Users
