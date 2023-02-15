import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/base/Button'
import ActiveGame from '../../components/icons/ActiveGame'
import InactiveGame from '../../components/icons/InactiveGame'
import { getGameIcon } from '../../helpers/componentsGetters'

const Game = () => {
  const params = useParams()
  const [isGameActive, setIsGameActive] = useState<boolean>(false)

  return (
      <div className="p-6 grid grid-cols-6 gap-6">
        <div className="col-span-2 flex flex-col rounded-lg bg-dark-1 px-8 py-10">
          <div className='flex justify-between mb-10'>
            <h4 className='text-white uppercase text-2xl'>GAME STATUS</h4>
          </div>
          <div className='flex flex-col w-full items-center gap-8'>
            {isGameActive ? <ActiveGame /> : <InactiveGame />}
            <div className={`${isGameActive ? 'text-green-500' : 'text-red-500'} flex gap-2`}>{getGameIcon(params.game)} {params.game} is {isGameActive ? 'active' : 'disabled'}</div>
            {isGameActive ? <Button text="Turn Game Off" color='gray' submitFunction={() => setIsGameActive((prev: boolean) => !prev)} /> : <Button text="Turn Game On" submitFunction={() => setIsGameActive((prev: boolean) => !prev)} />}
          </div>
        </div>
      </div>
  )
}

export default Game
