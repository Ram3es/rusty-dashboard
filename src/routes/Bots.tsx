import { useMemo, useState } from 'react'
import BotsTable from '../components/bots/BotsTable'
import RemoveBotPopup from '../components/pop-up/RemoveBotPopup'
import { Bot } from '../types/Bot'

const Bots = () => {
  const [botToRemove, setBotToRemove] = useState<Bot>()

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
        actionState: { id: '12', isBotPublished: true }
      },
      {
        user: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        status: 'inactive',
        type: 'Mule',
        id: '12',
        steamId: '76561199176275965',
        proxy: '2.59.60.1...',
        userName: 'Selbusiness',
        userPassword: 'O9o3MbA',
        actionState: { id: '12', isBotPublished: false }
      }
    ],
    []
  )

  const getBotById = (id: string) => {
    return data.find((item) => item.id === id)
  }

  const updateBot = (bot: Bot) => {
    console.log('updated bot', bot)
  }

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <BotsTable name="ACTIVE BOTS" botsData={data} onUpdate={updateBot} onRemove={(id: string) => setBotToRemove(getBotById(id))} />
        <BotsTable name="RESERVE BOTS" botsData={data} onUpdate={updateBot} onRemove={(id: string) => setBotToRemove(getBotById(id))} />
      </div>
      <RemoveBotPopup bot={botToRemove} onClose={() => {
        setBotToRemove(undefined)
      }} />
    </>
  )
}

export default Bots
