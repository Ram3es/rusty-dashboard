import AffiliateStatistics from '../../components/affiliate/AffiliateStatistics'
import UserSearch from '../../components/users/UserSearch'

const Affiliates = () => {
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
          <AffiliateStatistics name="AFFILIATE STATISTICS" />
        </div>
      </div>
    </>
  )
}

export default Affiliates
