import MainStatistic from '../components/users/MainStatistic'
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
    </>
  )
}

export default Users
