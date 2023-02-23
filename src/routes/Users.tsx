import RecentStaffEdits from '../components/staff/RecentStaffEdits'
import MainStatistic from '../components/users/MainStatistic'
import RecentTrades from '../components/users/RecentTrades'
import RecentWagers from '../components/users/RecentWagers'
import UserAccountInformation from '../components/users/UserAccountInformation'
import UserSearch from '../components/users/UserSearch'
import { TIME_OPTIONS } from '../constants'

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
          <MainStatistic timePeriodOptions={TIME_OPTIONS} />
        </div>
        <div className="col-span-3 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <UserAccountInformation timePeriodOptions={TIME_OPTIONS}/>
        </div>
        <div className="col-span-3 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <RecentStaffEdits />
        </div>
        <div className="col-span-3 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <RecentWagers />
        </div>
        <div className="col-span-3 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <RecentTrades />
        </div>
      </div>
    </>
  )
}

export default Users
