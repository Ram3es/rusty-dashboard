import { useMemo, useState } from 'react'
import relativeTime from 'dayjs/plugin/relativeTime'
import Button from '../base/Button'
import Table from '../base/Table'
import Image from '../../assets/RustylootLogo.png'
import SteamIcon from '../icons/SteamIcon'
import CloseIcon from '../icons/CloseIcon'
import ButtonsToggle from '../base/ButtonsToggle'
import dayjs from 'dayjs'
import PopupWrapper from '../base/PopupWrapper'
import InputWithLabel from '../base/InputWithLabel'

dayjs.extend(relativeTime)

const Trivia = ({ name }: { name: string }) => {
  const gameVariants = ['Scheduled', 'Previous']
  const [currentGameVariant, setCurrentGameVariant] = useState<string>(gameVariants[0])
  const [isCreateGamePopupOpen, setIsCreateGamePopupOpen] = useState<boolean>(false)
  const [newTriviaGame, setNewTriviaGema] = useState({
    rounds: 0,
    startTime: dayjs().format(),
    questions: []
  })
  const [scaduleTime, setScaduleTime] = useState({
    scaduleDays: 0,
    scaduleHours: 0,
    scaduleSeconds: 0
  })
  const [createTriviaStage, setCreateTriviaStage] = useState<number>(1)

  const createGame = () => {
    setIsCreateGamePopupOpen(true)
  }

  const formatDate = (date: Date) => {
    return date > new Date() ? dayjs().to(dayjs(date)) : dayjs().from(dayjs(date))
  }

  const columns = useMemo(
    () => [
      {
        header: 'Rounds',
        accessor: 'col1'
      },
      {
        header: 'When',
        accessor: 'col2',
        Cell: (props: any) => formatDate(props.value)
      },
      {
        header: 'Creator',
        accessor: 'col3'
      },
      {
        header: 'Action',
        accessor: 'col4'
      }
    ],
    []
  )

  const createGamePopup = () => {
    switch (createTriviaStage) {
      case 1:
        return (
          <div>
            <h4 className='text-white uppercase text-2xl'>TRIVIA ROUNDS</h4>
            <p className='text-gray-6 text-sm mb-10'>Enter the amount of round the Trivia game should have</p>
            <InputWithLabel
              value={newTriviaGame.rounds}
              name="rounds"
              changeFunction={(name, value: number) => setNewTriviaGema((prev) => {
                const triviaQuestions: any = []
                // for (let i = 0; i < value; i++) {
                //   triviaQuestions.push({

                //   })
                // }
                console.log(triviaQuestions)
                return { ...prev, rounds: value }
              })}
              type='number'
              label='Amount of rounds'
              placeholder='Enter Amount'
            />
            <div className='mt-10 flex justify-center items-center gap-4'>
              <Button color='gray' text='Back' submitFunction={() => setIsCreateGamePopupOpen(false)} />
              <Button text='Next' submitFunction={() => setCreateTriviaStage(2)} />
            </div>
          </div>
        )
      case 2:
        return (
          <div>
            <h4 className='text-white uppercase text-2xl'>Schedule Trivia Game</h4>
            <p className='text-gray-6 text-sm mb-10'>Enter when the trivia game should be scheduled for</p>
            <div className='flex justify-center items-center gap-2'>
              <InputWithLabel
                value={scaduleTime.scaduleDays}
                name="scaduleDays"
                changeFunction={(name, value: number) => {
                  setScaduleTime((prev) => {
                    return { ...prev, scaduleDays: value }
                  })
                  setNewTriviaGema((prev) => {
                    console.log(scaduleTime, prev.startTime, dayjs(prev.startTime).add(value, 'day').format())
                    return { ...prev, startTime: dayjs().add(value, 'day').format() }
                  })
                }}
                type='number'
                label='Days'
              />
            </div>
            <div className='mt-10 flex justify-center items-center gap-4'>
              <Button color='gray' text='Back' submitFunction={() => setCreateTriviaStage(1)} />
              <Button text='Next' submitFunction={() => console.log(newTriviaGame)
              } />
            </div>
          </div>
        )
    }
  }

  const data = useMemo(
    () => [
      {
        col1: 10,
        col2: new Date('2023-01-12T16:51:16.919Z'),
        col3: <div className='flex items-center gap-2'><img src={Image} className="w-4 h-4 rounded-full" /> Terry</div>,
        col4: <div className='w-full flex justify-center items-center gap-1'>
          <div className='w-5 h-5 flex justify-center items-center rounded bg-dark-17 text-gray-6 cursor-pointer'>
            <SteamIcon iconCalsses='w-3' />
          </div>
          <div className='w-5 h-5 flex justify-center items-center rounded bg-dark-17 text-gray-6 cursor-pointer'>
            <CloseIcon />
          </div>
        </div>
      },
      {
        col1: 11,
        col2: new Date('2023-01-12T17:51:16.919Z'),
        col3: <div className='flex items-center gap-2'><img src={Image} className="w-4 h-4 rounded-full" /> Terry</div>,
        col4: <div className='w-full flex justify-center items-center gap-1'>
          <div className='w-5 h-5 flex justify-center items-center rounded bg-dark-17 text-gray-6 cursor-pointer'>
            <SteamIcon iconCalsses='w-3' />
          </div>
          <div className='w-5 h-5 flex justify-center items-center rounded bg-dark-17 text-gray-6 cursor-pointer'>
            <CloseIcon />
          </div>
        </div>
      }
    ],
    []
  )

  return (
    <>
      <div className='flex flex-col justify-between h-full rounded-lg bg-dark-1 px-8 py-10'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <h4 className='text-white uppercase text-2xl'>{name}</h4>
            <div className='flex gap-6'>
              <ButtonsToggle options={gameVariants} currentSelect={currentGameVariant} peackFunction={setCurrentGameVariant} />
              <Button text='Schedule Trivia Game' submitFunction={createGame} />
            </div>
          </div>
          <div className='w-full flex flex-col mb-4'>
            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
      {isCreateGamePopupOpen
        ? <PopupWrapper>
            {createGamePopup()}
        </PopupWrapper>
        : null}
    </>
  )
}

export default Trivia
