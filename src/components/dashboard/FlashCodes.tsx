import { useEffect, useMemo, useState } from 'react'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'
import Table from '../base/Table'
import Image from '../../assets/RustylootLogo.png'
import dayjs from 'dayjs'
import { useUserContext } from '../../store/UserStore'

const FlashCodes = () => {
  const [state, setState] = useState({
    code: '',
    amount: 0,
    users: 0
  })
  const [user] = useUserContext()

  const [codes, setCodes] = useState<any[]>([])

  useEffect(() => {
    // user.socket?.emit('admin:flash:all', {}, (data: { error: boolean, data: any[] }) => {
    //   if (!data.error) {
    //     console.log(data, 'admin:flash:all')
    //     setCodes(data.data)
    //   }
    // })
  }, [user.socket])

  const updateCode = (name: string, value: string | number) => {
    const newValue: Record<string, string | number> = {}
    newValue[name] = value
    setState(prevState => {
      return { ...prevState, ...newValue }
    })
  }

  const codeSubmit = () => {
    console.log(state)
    user.socket?.emit('admin:flash:create', {
      code: state.code,
      value: state.amount,
      max_claims: state.users
    }, (data: { error: boolean, data: { code: string, max_claims: number } }) => {
      if (!data.error) {
        console.log(data, 'admin:flash:create')
        setCodes(prev => [
          ...prev,
          data.data
        ])
        setState({
          code: '',
          amount: 0,
          users: 0
        })
      }
    })
  }

  const columns = useMemo(
    () => [
      {
        header: 'Code',
        accessor: 'col1'
      },
      {
        header: 'Uses',
        accessor: 'col2'
      },
      {
        header: 'Date',
        accessor: 'col3'
      },
      {
        header: 'Creator',
        accessor: 'col4'
      }
    ],
    []
  )

  const data = useMemo(
    () => {
      return codes?.map((item: {
        claims: number
        code: string
        id: number
        max_claims: number
        status: string
        timestamp: string
        value: string
      }) => {
        return {
          col1: item.code,
          col2: `${item.claims ?? 0}/${item.max_claims}`,
          col3: dayjs(item.timestamp).format('DD.MM.YY'),
          col4: <div className='flex items-center gap-2'><img src={Image} className="w-4 h-4 rounded-full" /> Terry</div>
        }
      })
    },
    [codes]
  )

  return (
    <>
      <div className='flex flex-col'>
        <h4 className='text-white uppercase text-2xl mb-6'>CREATE FLASH CODE</h4>
        <div className="flex gap-4 flex-wrap 2xl:grid grid-cols-3 mb-5">
          <InputWithLabel label="Flash Code" type="text" value={state.code} name="code" changeFunction={updateCode} />
          <InputWithLabel label="Amount" type="number" value={state.amount} name="amount" changeFunction={updateCode} />
          <InputWithLabel label="Number of Uses" type="number" value={state.users} name="users" changeFunction={updateCode} />
        </div>
        <div className='w-full mb-5'>
          <Button text='Create Flash Code' submitFunction={codeSubmit} />
        </div>
        <div className='w-full flex flex-col'>
          <h3 className='text-white text-base mb-2'>Previous Flash Codes</h3>
          <Table columns={columns} data={data ?? []} />
        </div>
      </div>
    </>
  )
}

export default FlashCodes
