import { useMemo, useState } from 'react'
import BotsTable from '../components/bots/BotsTable'
import RemoveBotPopup from '../components/pop-up/RemoveBotPopup'
import SelectBotType from '../components/pop-up/SelectBotTypes'
import { Bot } from '../types/Bot'

const Bots = () => {
  const [botToRemove, setBotToRemove] = useState<Bot>()
  const [botToUpdate, setBotToUpdate] = useState<Bot>()

  const data = useMemo(
    () => [
      {
        user: { name: 'DerWeißWish', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
        status: 'active',
        type: 'Jacpot',
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
        id: '14',
        steamId: '76561199176275965',
        proxy: '2.59.60.1...',
        userName: 'Selbusiness',
        userPassword: 'O9o3MbA',
        actionState: { id: '14', isBotPublished: false }
      }

    ],
    []
  )
  const dataTypeNone = [{
    user: { name: 'DerWeißWizard', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
    status: 'active',
    id: '12',
    steamId: '76561199176275965',
    proxy: '2.59.60.1...',
    userName: 'Selbusiness',
    userPassword: 'O9o3MbA',
    actionState: { id: '12', isBotPublished: true }
  },
  {
    user: { name: 'VerDer', avatar: 'https://images.unsplash.com/photo-1611915387288-fd8d2f5f928b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' },
    status: 'active',
    id: '13',
    steamId: '76561199176275965',
    proxy: '2.59.60.1...',
    userName: 'Selbusiness',
    userPassword: 'O9o3MbA',
    actionState: { id: '13', isBotPublished: true }
  }]

  const getBotById = (arr: Bot[], id: string) => {
    return arr.find((item) => item.id === id)
  }

  const updateBot = (bot: Bot) => {
    console.log('updated bot', bot)
  }

  return (
    <>
      <div className="p-6 grid grid-cols-6 gap-6">
        <BotsTable name="ACTIVE BOTS" botsData={data} selectBot={(id: string) => setBotToUpdate(getBotById(data, id))} onRemove={(id: string) => setBotToRemove(getBotById(data, id)) }/>
        <BotsTable name="RESERVE BOTS" botsData={dataTypeNone} selectBot={(id: string) => setBotToUpdate(getBotById(dataTypeNone, id))} onRemove={(id: string) => setBotToRemove(getBotById(dataTypeNone, id)) } />
      </div>
      <RemoveBotPopup bot={botToRemove} onClose={() => {
        setBotToRemove(undefined)
      }} />
      <SelectBotType bot={botToUpdate} onClose={() => setBotToUpdate(undefined)} updateBot={updateBot} />
    </>
  )
}

export default Bots
