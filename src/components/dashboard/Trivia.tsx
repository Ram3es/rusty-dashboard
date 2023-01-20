import { useEffect, useMemo, useState } from 'react'
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

interface TriviaRoundAnsvers {
  ansver1: {
    text: string
    isCorrect: boolean
  }
  ansver2: {
    text: string
    isCorrect: boolean
  }
  ansver3: {
    text: string
    isCorrect: boolean
  }
  ansver4: {
    text: string
    isCorrect: boolean
  }
}
interface TriviaRound {
  question: string
  ansvers: TriviaRoundAnsvers
  reward: number
  winnersCount: number
}

interface TriviaGame {
  rounds: number
  startTime: any
  questions: TriviaRound[]
}

const Trivia = ({ name }: { name: string }) => {
  const gameVariants = ['Scheduled', 'Previous']
  const [currentGameVariant, setCurrentGameVariant] = useState<string>(gameVariants[0])
  const [isCreateGamePopupOpen, setIsCreateGamePopupOpen] = useState<boolean>(false)
  const [newTriviaGame, setNewTriviaGema] = useState<TriviaGame>({
    rounds: 0,
    startTime: dayjs().format(),
    questions: []
  })
  const [scaduleTime, setScaduleTime] = useState({
    scaduleDays: 0,
    scaduleHours: 0,
    scaduleMinutes: 0
  })
  const [createTriviaStage, setCreateTriviaStage] = useState<number>(1)
  const [questionsStage, setQuestionsStage] = useState<number>(0)

  const initialFormErrors = {
    question: '',
    ansvers: '',
    reward: '',
    winnersCount: ''
  }

  const [formErrors, setFormErrors] = useState(initialFormErrors)

  const createGame = () => {
    setIsCreateGamePopupOpen(true)
  }

  const validateQuestionForm = (form: TriviaRound) => {
    if (form.question === '') {
      setFormErrors((prev) => {
        return { ...prev, question: 'The question field must not be empty.' }
      })
      return false
    }

    if (form.reward === 0) {
      setFormErrors((prev) => {
        return { ...prev, reward: 'The reward field must not be zero.' }
      })
      return false
    }

    if (form.winnersCount === 0) {
      setFormErrors((prev) => {
        return { ...prev, winnersCount: 'The winnersCount field must not be zero.' }
      })
      return false
    }

    const ansvers = Object.values(form.ansvers)

    const emptyAnsvers = ansvers.filter(ansver => ansver.text === '')
    if (emptyAnsvers.length !== 0) {
      setFormErrors((prev) => {
        return { ...prev, ansvers: 'All ansvers fields must not be empty.' }
      })
      return false
    }

    const correctAnsvers = ansvers.filter(a => a.isCorrect)
    if (correctAnsvers.length > 1 || correctAnsvers.length === 0) {
      setFormErrors((prev) => {
        return { ...prev, ansvers: 'Please choose one correct answer.' }
      })
      return false
    }

    return true
  }

  const resetAllAnsvers = (ansvers: TriviaRoundAnsvers) => {
    for (const ansver in ansvers) {
      ansvers[ansver].isCorrect = false
    }
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

  useEffect(() => {
    setNewTriviaGema((prev) => {
      return { ...prev, startTime: dayjs().add(scaduleTime.scaduleDays, 'days').add(scaduleTime.scaduleHours, 'hours').add(scaduleTime.scaduleMinutes, 'minutes').format() }
    })
    console.log(newTriviaGame)
  }, [scaduleTime])

  const foundCorrectAnsver = (triviaGame: TriviaRound) => {
    const correctKey: string | undefined = Object.keys(triviaGame.ansvers).find((key: string) => triviaGame.ansvers[key].isCorrect === true)
    console.log(correctKey)
    return (correctKey != null) ? triviaGame.ansvers[correctKey] : undefined
  }

  const triviaGamesSubmit = () => {
    console.log('triviaGameCreated', newTriviaGame)
    setNewTriviaGema({
      rounds: 0,
      startTime: dayjs().format(),
      questions: []
    })
    setIsCreateGamePopupOpen(false)
    setCreateTriviaStage(1)
    setQuestionsStage(0)
  }

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
              changeFunction={(name: any, value: number) => setNewTriviaGema((prev) => {
                const triviaQuestions: any = []
                for (let i = 0; i < value; i++) {
                  triviaQuestions.push({
                    question: '',
                    ansvers: {
                      ansver1: {
                        text: '',
                        isCorrect: false
                      },
                      ansver2: {
                        text: '',
                        isCorrect: false
                      },
                      ansver3: {
                        text: '',
                        isCorrect: false
                      },
                      ansver4: {
                        text: '',
                        isCorrect: false
                      }
                    },
                    reward: 0,
                    winnersCount: 0
                  })
                }
                return { ...prev, rounds: value, questions: triviaQuestions }
              })}
              type='number'
              label='Amount of rounds'
              placeholder='Enter Amount'
            />
            <div className='mt-10 flex justify-center items-center gap-4'>
              <Button color='gray' text='Back' submitFunction={() => setIsCreateGamePopupOpen(false)} />
              <Button text='Next' submitFunction={() => {
                if (newTriviaGame.rounds > 0) {
                  setCreateTriviaStage(2)
                }
              }} />
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
                name="question"
                changeFunction={(name: any, value: number) => {
                  setScaduleTime((prev) => {
                    return { ...prev, scaduleDays: value }
                  })
                }}
                type='number'
                label='Days'
              />
              <InputWithLabel
                value={scaduleTime.scaduleHours}
                name="question"
                changeFunction={(name: any, value: number) => {
                  setScaduleTime((prev) => {
                    return { ...prev, scaduleHours: value }
                  })
                }}
                type='number'
                label='Hours'
              />
              <InputWithLabel
                value={scaduleTime.scaduleMinutes}
                name="question"
                changeFunction={(name: any, value: number) => {
                  setScaduleTime((prev) => {
                    return { ...prev, scaduleMinutes: value }
                  })
                }}
                type='number'
                label='Minutes'
              />
            </div>
            <div className='mt-10 flex justify-center items-center gap-4'>
              <Button color='gray' text='Back' submitFunction={() => setCreateTriviaStage(1)} />
              <Button text='Next' submitFunction={() => {
                setCreateTriviaStage(3)
                setQuestionsStage(1)
              }
              } />
            </div>
          </div>
        )
      case 3:
        return newTriviaGame.questions.map((item, index) => {
          return (
              <div className={`${index + 1 === questionsStage ? 'flex flex-col' : 'hidden'}`} key={index}>
                <h4 className='text-white uppercase text-2xl text-center w-full mb-10'>Question {questionsStage}/{newTriviaGame.questions.length}</h4>
                <div className='text-red-400'>
                  {Object.keys(formErrors).map((fieldName, i) => {
                    if (formErrors[fieldName].length > 0) {
                      return (
                        <p key={i}>{formErrors[fieldName]}</p>
                      )
                    } else {
                      return ''
                    }
                  })}
                </div>
                <div className='grid grid-cols-2 gap-5'>
                  <div className='col-span-2'>
                    <InputWithLabel
                      value={newTriviaGame.questions[index].question}
                      name="scaduleDays"
                      changeFunction={(name: any, value: string) => {
                        setNewTriviaGema((prev) => {
                          const questionsArray = [...prev.questions]
                          questionsArray[index].question = value
                          return { ...prev, questions: questionsArray }
                        })
                        setFormErrors(initialFormErrors)
                      }}
                      type='text'
                      label='Question'
                      placeholder='Enter question...'
                    />
                  </div>
                  <div className='col-span-1 relative'>
                    <InputWithLabel
                      value={newTriviaGame.questions[index].ansvers.ansver1.text}
                      name="scaduleDays"
                      changeFunction={(name: any, value: string) => {
                        setNewTriviaGema((prev) => {
                          const questionsArray = [...prev.questions]
                          questionsArray[index].ansvers.ansver1.text = value
                          return { ...prev, questions: questionsArray }
                        })
                        setFormErrors(initialFormErrors)
                      }}
                      type='text'
                      label='Answer 1'
                      placeholder='Enter answer...'
                    />
                    <div className='absolute right-0 top-0'>
                      <InputWithLabel
                        value={newTriviaGame.questions[index].ansvers.ansver1.isCorrect}
                        name="scaduleDays"
                        changeFunction={(name: any, value: boolean) => {
                          setNewTriviaGema((prev) => {
                            const questionsArray = [...prev.questions]
                            if (value) {
                              resetAllAnsvers(questionsArray[index].ansvers)
                            }
                            questionsArray[index].ansvers.ansver1.isCorrect = value
                            return { ...prev, questions: questionsArray }
                          })
                        }}
                        type='checkbox'
                      />
                    </div>
                  </div>
                  <div className='col-span-1 relative'>
                    <InputWithLabel
                      value={newTriviaGame.questions[index].ansvers.ansver2.text}
                      name="scaduleDays"
                      changeFunction={(name: any, value: string) => {
                        setNewTriviaGema((prev) => {
                          const questionsArray = [...prev.questions]
                          questionsArray[index].ansvers.ansver2.text = value
                          return { ...prev, questions: questionsArray }
                        })
                        setFormErrors(initialFormErrors)
                      }}
                      type='text'
                      label='Answer 2'
                      placeholder='Enter answer...'
                    />
                    <div className='absolute right-0 top-0'>
                      <InputWithLabel
                        value={newTriviaGame.questions[index].ansvers.ansver2.isCorrect}
                        name="scaduleDays"
                        changeFunction={(name: any, value: boolean) => {
                          setNewTriviaGema((prev) => {
                            const questionsArray = [...prev.questions]
                            if (value) {
                              resetAllAnsvers(questionsArray[index].ansvers)
                            }
                            questionsArray[index].ansvers.ansver2.isCorrect = value
                            return { ...prev, questions: questionsArray }
                          })
                        }}
                        type='checkbox'
                      />
                    </div>
                  </div>
                  <div className='col-span-1 relative'>
                    <InputWithLabel
                      value={newTriviaGame.questions[index].ansvers.ansver3.text}
                      name="scaduleDays"
                      changeFunction={(name: any, value: string) => {
                        setNewTriviaGema((prev) => {
                          const questionsArray = [...prev.questions]
                          questionsArray[index].ansvers.ansver3.text = value
                          return { ...prev, questions: questionsArray }
                        })
                        setFormErrors(initialFormErrors)
                      }}
                      type='text'
                      label='Answer 3'
                      placeholder='Enter answer...'
                    />
                    <div className='absolute right-0 top-0'>
                      <InputWithLabel
                        value={newTriviaGame.questions[index].ansvers.ansver3.isCorrect}
                        name="scaduleDays"
                        changeFunction={(name: any, value: boolean) => {
                          setNewTriviaGema((prev) => {
                            const questionsArray = [...prev.questions]
                            if (value) {
                              resetAllAnsvers(questionsArray[index].ansvers)
                            }
                            questionsArray[index].ansvers.ansver3.isCorrect = value
                            return { ...prev, questions: questionsArray }
                          })
                        }}
                        type='checkbox'
                      />
                    </div>
                  </div>
                  <div className='col-span-1 relative'>
                    <InputWithLabel
                      value={newTriviaGame.questions[index].ansvers.ansver4.text}
                      name="scaduleDays"
                      changeFunction={(name: any, value: string) => {
                        setNewTriviaGema((prev) => {
                          const questionsArray = [...prev.questions]
                          questionsArray[index].ansvers.ansver4.text = value
                          return { ...prev, questions: questionsArray }
                        })
                        setFormErrors(initialFormErrors)
                      }}
                      type='text'
                      label='Answer 4'
                      placeholder='Enter answer...'
                    />
                    <div className='absolute right-0 top-0'>
                      <InputWithLabel
                        value={newTriviaGame.questions[index].ansvers.ansver4.isCorrect}
                        name="scaduleDays"
                        changeFunction={(name: any, value: boolean) => {
                          setNewTriviaGema((prev) => {
                            const questionsArray = [...prev.questions]
                            if (value) {
                              resetAllAnsvers(questionsArray[index].ansvers)
                            }
                            questionsArray[index].ansvers.ansver4.isCorrect = value
                            return { ...prev, questions: questionsArray }
                          })
                        }}
                        type='checkbox'
                      />
                    </div>
                  </div>
                  <div className='col-span-1 relative'>
                    <InputWithLabel
                      value={newTriviaGame.questions[index].reward}
                      name="scaduleDays"
                      changeFunction={(name: any, value: number) => {
                        setNewTriviaGema((prev) => {
                          const questionsArray = [...prev.questions]
                          questionsArray[index].reward = value
                          return { ...prev, questions: questionsArray }
                        })
                        setFormErrors(initialFormErrors)
                      }}
                      type='number'
                      label='Reward'
                    />
                  </div>
                  <div className='col-span-1 relative'>
                    <InputWithLabel
                      value={newTriviaGame.questions[index].winnersCount}
                      name="scaduleDays"
                      changeFunction={(name: any, value: number) => {
                        setNewTriviaGema((prev) => {
                          const questionsArray = [...prev.questions]
                          questionsArray[index].winnersCount = value
                          return { ...prev, questions: questionsArray }
                        })
                        setFormErrors(initialFormErrors)
                      }}
                      type='number'
                      label='Amount of Winners'
                    />
                  </div>
                </div>
                <div className='mt-10 flex justify-center items-center gap-4'>
                  <Button color='gray' text='Back' submitFunction={() => {
                    setQuestionsStage(prev => prev - 1)
                    if (questionsStage === 1) {
                      setCreateTriviaStage(2)
                    }
                  }} />
                  <Button text='Next' submitFunction={() => {
                    if (validateQuestionForm(newTriviaGame.questions[0])) {
                      if (questionsStage === newTriviaGame.questions.length) {
                        setCreateTriviaStage(4)
                      } else {
                        setQuestionsStage(prev => prev + 1)
                      }
                    }
                  }
                  } />
                </div>
              </div>
          )
        })
      case 4:
        return (
          <div>
            <h4 className='text-white uppercase text-2xl mb-10'>Review Trivia Game</h4>
            <p className='text-white'>Questions</p>
            <table className='mb-10 border-separate border-spacing-y-2'>
              <thead>
                <tr>
                  <th className='text-gray-6 text-xs px-4 py-3'>Round</th>
                  <th className='text-gray-6 text-xs px-4 py-3'>Question</th>
                  <th className='text-gray-6 text-xs px-4 py-3'>Correct Answer</th>
                  <th className='text-gray-6 text-xs px-4 py-3'>Amount</th>
                  <th className='text-gray-6 text-xs px-4 py-3'>Winners</th>
                  <th className='text-gray-6 text-xs px-4 py-3'>Action</th>
                </tr>
              </thead>
              <tbody>
                  {newTriviaGame.questions.map((item, index) => {
                    return (
                      <tr className='bg-dark-1c text-gray-6' key={index}>
                        <td className='px-4 py-3'>#{index + 1}</td>
                        <td className='px-4 py-3'>{item.question}</td>
                        <td className='px-4 py-3'>{foundCorrectAnsver(item).text}</td>
                        <td className='px-4 py-3 text-white'>{item.reward}</td>
                        <td className='px-4 py-3'>{item.winnersCount}</td>
                        <td
                          className='px-4 py-3 flex justify-center items-center gap-1'
                          onClick={() => {
                            setQuestionsStage(0)
                            setCreateTriviaStage(2)
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.675092 13.8539C0.600674 13.8544 0.527004 13.8391 0.458924 13.809C0.390843 13.7789 0.329894 13.7348 0.280083 13.6795C0.230272 13.6242 0.192727 13.559 0.169916 13.4882C0.147105 13.4174 0.139545 13.3425 0.147733 13.2685L0.553799 9.57702C0.568254 9.45904 0.622146 9.3494 0.706733 9.26588L9.33433 0.638286C9.49108 0.481226 9.67726 0.35662 9.88222 0.271602C10.0872 0.186584 10.3069 0.142822 10.5288 0.142822C10.7507 0.142822 10.9704 0.186584 11.1754 0.271602C11.3803 0.35662 11.5665 0.481226 11.7233 0.638286L13.3634 2.27837C13.5204 2.43512 13.645 2.6213 13.73 2.82627C13.8151 3.03123 13.8588 3.25095 13.8588 3.47284C13.8588 3.69474 13.8151 3.91445 13.73 4.11942C13.645 4.32438 13.5204 4.51056 13.3634 4.66731L4.74103 13.2896C4.65752 13.3742 4.54787 13.4281 4.42989 13.4426L0.738375 13.8486L0.675092 13.8539ZM1.58742 9.87234L1.27101 12.7306L4.12929 12.4142L12.6198 3.92373C12.6788 3.86494 12.7256 3.79508 12.7575 3.71816C12.7895 3.64124 12.8059 3.55877 12.8059 3.47548C12.8059 3.39219 12.7895 3.30972 12.7575 3.2328C12.7256 3.15587 12.6788 3.08602 12.6198 3.02722L10.9744 1.38186C10.9156 1.32287 10.8458 1.27605 10.7688 1.24411C10.6919 1.21217 10.6095 1.19573 10.5262 1.19573C10.4429 1.19573 10.3604 1.21217 10.2835 1.24411C10.2066 1.27605 10.1367 1.32287 10.0779 1.38186L1.58742 9.87234Z" fill="#666E97"/>
                            <path d="M11.7497 6.05424C11.6803 6.05464 11.6115 6.04134 11.5473 6.01509C11.483 5.98885 11.4246 5.95018 11.3753 5.9013L8.1004 2.61586C8.05123 2.56669 8.01223 2.50831 7.98562 2.44407C7.95901 2.37982 7.94531 2.31097 7.94531 2.24143C7.94531 2.17189 7.95901 2.10304 7.98562 2.03879C8.01223 1.97455 8.05123 1.91618 8.1004 1.86701C8.14957 1.81784 8.20795 1.77883 8.27219 1.75222C8.33644 1.72561 8.40529 1.71191 8.47483 1.71191C8.54437 1.71191 8.61322 1.72561 8.67747 1.75222C8.74171 1.77883 8.80008 1.81784 8.84925 1.86701L12.1347 5.15245C12.1841 5.20148 12.2234 5.2598 12.2501 5.32407C12.2769 5.38833 12.2907 5.45726 12.2907 5.52688C12.2907 5.5965 12.2769 5.66542 12.2501 5.72969C12.2234 5.79395 12.1841 5.85228 12.1347 5.9013C12.0842 5.95146 12.024 5.99087 11.9579 6.01715C11.8917 6.04344 11.8209 6.05605 11.7497 6.05424Z" fill="#666E97"/>
                          </svg>
                          Edit
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
            </table>
            <p className='text-white mb-5'>Questions</p>
            <div className='bg-dark-1c text-gray-6 px-4 py-3 w-full flex justify-between mb-10'>
              <span>{dayjs(newTriviaGame.startTime).toNow()}</span>
              <div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.675092 13.8539C0.600674 13.8544 0.527004 13.8391 0.458924 13.809C0.390843 13.7789 0.329894 13.7348 0.280083 13.6795C0.230272 13.6242 0.192727 13.559 0.169916 13.4882C0.147105 13.4174 0.139545 13.3425 0.147733 13.2685L0.553799 9.57702C0.568254 9.45904 0.622146 9.3494 0.706733 9.26588L9.33433 0.638286C9.49108 0.481226 9.67726 0.35662 9.88222 0.271602C10.0872 0.186584 10.3069 0.142822 10.5288 0.142822C10.7507 0.142822 10.9704 0.186584 11.1754 0.271602C11.3803 0.35662 11.5665 0.481226 11.7233 0.638286L13.3634 2.27837C13.5204 2.43512 13.645 2.6213 13.73 2.82627C13.8151 3.03123 13.8588 3.25095 13.8588 3.47284C13.8588 3.69474 13.8151 3.91445 13.73 4.11942C13.645 4.32438 13.5204 4.51056 13.3634 4.66731L4.74103 13.2896C4.65752 13.3742 4.54787 13.4281 4.42989 13.4426L0.738375 13.8486L0.675092 13.8539ZM1.58742 9.87234L1.27101 12.7306L4.12929 12.4142L12.6198 3.92373C12.6788 3.86494 12.7256 3.79508 12.7575 3.71816C12.7895 3.64124 12.8059 3.55877 12.8059 3.47548C12.8059 3.39219 12.7895 3.30972 12.7575 3.2328C12.7256 3.15587 12.6788 3.08602 12.6198 3.02722L10.9744 1.38186C10.9156 1.32287 10.8458 1.27605 10.7688 1.24411C10.6919 1.21217 10.6095 1.19573 10.5262 1.19573C10.4429 1.19573 10.3604 1.21217 10.2835 1.24411C10.2066 1.27605 10.1367 1.32287 10.0779 1.38186L1.58742 9.87234Z" fill="#666E97"/>
                  <path d="M11.7497 6.05424C11.6803 6.05464 11.6115 6.04134 11.5473 6.01509C11.483 5.98885 11.4246 5.95018 11.3753 5.9013L8.1004 2.61586C8.05123 2.56669 8.01223 2.50831 7.98562 2.44407C7.95901 2.37982 7.94531 2.31097 7.94531 2.24143C7.94531 2.17189 7.95901 2.10304 7.98562 2.03879C8.01223 1.97455 8.05123 1.91618 8.1004 1.86701C8.14957 1.81784 8.20795 1.77883 8.27219 1.75222C8.33644 1.72561 8.40529 1.71191 8.47483 1.71191C8.54437 1.71191 8.61322 1.72561 8.67747 1.75222C8.74171 1.77883 8.80008 1.81784 8.84925 1.86701L12.1347 5.15245C12.1841 5.20148 12.2234 5.2598 12.2501 5.32407C12.2769 5.38833 12.2907 5.45726 12.2907 5.52688C12.2907 5.5965 12.2769 5.66542 12.2501 5.72969C12.2234 5.79395 12.1841 5.85228 12.1347 5.9013C12.0842 5.95146 12.024 5.99087 11.9579 6.01715C11.8917 6.04344 11.8209 6.05605 11.7497 6.05424Z" fill="#666E97"/>
                </svg>
                Edit
              </div>
            </div>
            <div className='mt-10 flex justify-center items-center gap-4'>
              <Button color='gray' text='Back' submitFunction={() => {
                setQuestionsStage(newTriviaGame.questions.length)
                setCreateTriviaStage(3)
              }} />
              <Button text='Schedule' submitFunction={() => {
                triviaGamesSubmit()
              }
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
        ? <PopupWrapper
            closePopup={() => setIsCreateGamePopupOpen(false)}
          >
            {createGamePopup()}
        </PopupWrapper>
        : null}
    </>
  )
}

export default Trivia
