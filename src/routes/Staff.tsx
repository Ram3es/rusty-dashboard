import BackendAccounts from '../components/staff/BackendAccounts'
import SitePermissions from '../components/staff/SitePermissions'
import StaffEdits from '../components/staff/StaffEdits'
import UserSearch from '../components/users/UserSearch'

const Staff = () => {
  const foundUser = (obj: Record<string, string>) => {
    console.log('foundUser', obj)
  }

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <UserSearch submitFn={foundUser} />
        </div>
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1">
          <SitePermissions name="SITE PERMISSIONS" />
        </div>
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1">
          <BackendAccounts name="BACKEND ACCOUNT" />
        </div>
        <div className="col-span-6 flex flex-col rounded-lg bg-dark-1">
          <StaffEdits name='STAFF EDITS' />
        </div>
      </div>
    </>
  )
}

export default Staff
