import { useMemo } from 'react'
import BotsTable from '../components/bots/BotsTable'
import { Bot } from '../types/Bot'

const Bots = () => {
  const data = useMemo(
    () => [
      {
        user: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        status: 'active',
        type: 'Mule',
        id: '12',
        steamId: '76561199176275965',
        proxy: '2.59.60.1...',
        userName: 'Selbusiness',
        userPassword: 'O9o3MbA',
        actionId: '12',
        isBotPublished: true
      }
    ],
    []
  )

  const updateBot = (bot: Bot) => {
    console.log('updated bot', bot)
  }

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <BotsTable name="ACTIVE BOTS" userData={data} onUpdate={updateBot} />
        <BotsTable name="RESERVE BOTS" userData={data} onUpdate={updateBot} />
      </div>
    </>
  )
}

export default Bots
