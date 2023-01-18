import { useState } from 'react'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'

const LivePlayers = () => {
  const [state, setState] = useState({
    amount: ''
  })

  const updateCode = (name: string, value: string | number) => {
    const newValue: Record<string, string | number> = {}
    newValue[name] = value
    setState(prevState => {
      return { ...prevState, ...newValue }
    })
  }

  const codeSubmit = () => {
    console.log(state)
  }

  return (
    <div className='col-span-1 rounded-lg bg-dark-1 px-8 py-10 w-full h-full'>
      <div className='flex flex-col justify-between h-full'>
        <div className='w-full flex flex-col mb-4'>
          <h4 className='text-white uppercase text-2xl mb-6'>LIVE PLAYER COUNT</h4>
          <div className="flex gap-4">
            <div className="flex p-5 gap-2 bg-dark-1f rounded">
              <div className="w-2 h-2 rounded-full bg-yellow-f mt-2"></div>
              <div className="flex flex-col">
                <div className="uppercase text-yellow-f text-base font-medium mb-2">224 ONLINE</div>
                <div className="text-gray-7 text-sm font-semibold">Displayed amount</div>
              </div>
            </div>
            <div className="flex p-5 gap-2 bg-dark-1f rounded">
              <div className="w-2 h-2 rounded-full bg-yellow-f mt-2"></div>
              <div className="flex flex-col">
                <div className="uppercase text-yellow-f text-base font-medium mb-2">363 ONLINE</div>
                <div className="text-gray-7 text-sm font-semibold">Spoofed amount</div>
              </div>
            </div>
            <div className="flex p-5 gap-2 bg-dark-1f rounded">
              <div className="w-2 h-2 rounded-full bg-yellow-f mt-2"></div>
              <div className="flex flex-col">
                <div className="uppercase text-yellow-f text-base font-medium mb-2">4452 ONLINE</div>
                <div className="text-gray-7 text-sm font-semibold">Actual amount</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between items-end gap-4">
          <div className='w-full'>
            <InputWithLabel
            label="Acount"
            type="text"
            value={state.amount}
            name="account"
            changeFunction={updateCode}
            placeholder="Steam 64 / Name"
          />
          </div>
          <div className='w-10'>
            <Button text='Add' submitFunction={codeSubmit} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LivePlayers
