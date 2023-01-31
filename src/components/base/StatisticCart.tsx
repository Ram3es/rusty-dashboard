import { StatisticCartItem } from '../../types/StatisticCartItem'
import CoinceImage from '../../assets/coins.png'
import EditIcon from '../icons/EditIcon'

const StatisticCart = ({ item }: { item: StatisticCartItem }) => {
  return (
    <div className='flex gap-6'>
      <div className='w-12 h-12 rounded-full bg-yellow-f text-yellow-f bg-opacity-10 flex justify-center items-center'>
        {item.icon ?? ''}
      </div>
      <div className='flex flex-col gap-2'>
        <div className='text-white text-2xl flex gap-2 items-center'>
          <span>{item.text}</span>
          {(item.isCoinceValue === true) && <img src={CoinceImage} alt="CoinceImage" />}
        </div>
        <div className='text-gray-7 text-base'>{item.subtext}</div>
        {(item.percent != null) && <div className={`${item.percent >= 0 ? 'text-green-500 bg-green-500' : 'text-red-500 bg-red-500'} flex gap-1 items-center text-xs px-2 py-1 bg-opacity-10 w-fit`}>
          <span className={`${item.percent >= 0 ? '' : 'transform rotate-180'}`}>
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.38931 0.834825L0.108593 4.41974C0.040206 4.52759 0.00274923 4.65141 0.000145617 4.77826C-0.002458 4.90511 0.0298873 5.0303 0.093794 5.14074C0.157701 5.25117 0.250818 5.34279 0.363394 5.40598C0.475969 5.46917 0.603862 5.50163 0.733677 5.49994L5.27579 5.49994C5.46782 5.49994 5.65198 5.42539 5.78777 5.2927C5.92355 5.16001 5.99983 4.98004 5.99983 4.79239C6.00273 4.66162 5.96847 4.53263 5.90088 4.41974L3.62982 0.834825C3.56489 0.732436 3.47428 0.647941 3.36658 0.589348C3.25888 0.530754 3.13765 0.5 3.01439 0.5C2.89112 0.5 2.7699 0.530754 2.6622 0.589348C2.5545 0.647941 2.46389 0.732436 2.39896 0.834825L2.38931 0.834825Z" fill="currentColor"/>
            </svg>
          </span>
          {item.percent.toFixed(2)}%
        </div>}
        {(item.canEdit ?? false)
          ? <span className='text-gray-7 flex gap-2 px-2 py-1 rounded bg-dark-1f w-max' onClick={() => {
            if (item.editFunction !== undefined) item.editFunction()
          }
        }><EditIcon iconCalsses="w-2" /> edit</span>
          : ''}
      </div>
    </div>
  )
}

export default StatisticCart
