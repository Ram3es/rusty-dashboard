import { useEffect, useMemo, useState } from 'react'
import Button from '../base/Button'
import InputWithLabel from '../base/InputWithLabel'
import Table from '../base/Table'
import CloseIcon from '../icons/CloseIcon'
import { useUserContext } from '../../store/UserStore'
import { SponseeUser } from '../../routes/Sponsee'

interface IGroup {
  id: string
  name: string
  excluded: number
  users: SponseeUser[]
}

const ExcludedAccounts = ({ name }: { name: string }) => {
  const [state, setState] = useState({
    group: ''
  })
  const [user] = useUserContext()
  const [groups, setGroups] = useState<IGroup[]>()

  const updateCode = (name: string, value: string | number) => {
    const newValue: Record<string, string | number> = {}
    newValue[name] = value
    setState(prevState => {
      return { ...prevState, ...newValue }
    })
  }

  const codeSubmit = () => {
    const findGroup = groups?.find((item) => item.name.toLowerCase() === state.group)
    if (findGroup) {
      user.socket?.emit('admin:group:exclude', { group_id: findGroup.id, excluded: 1 }, (data: any) => {
        setGroups(prev => prev?.map(prevGroup => findGroup.id === prevGroup.id ? ({ ...prevGroup, excluded: 1 }) : ({ ...prevGroup })))
      })
    }
  }

  const columns = useMemo(
    () => [
      {
        header: 'Account',
        accessor: 'col1'
      },
      {
        header: 'Action',
        accessor: 'col2'
      }
    ],
    []
  )

  useEffect(() => {
    console.log('groups effect', !groups)
    if (!groups) {
      user.socket?.emit('admin:groups', {}, (data: any) => {
        console.log(data, 'admin:groups')
        if (data?.data) {
          setGroups(data?.data)
        }
      })
    }
  }, [groups])

  const data = useMemo(
    () => {
      console.log('triger memo !!!!!!', groups)
      let table: any[] = []
      if (groups) {
        const excluded = [...groups].filter(group => !!group.excluded).map(group => ({
          col1: <div className='flex items-center gap-2'>{group.name}</div>,
          col2: <div className='w-full flex justify-center items-center gap-1'>
            <div
              className='w-5 h-5 flex justify-center items-center rounded bg-dark-17 text-gray-6 cursor-pointer'
              onClick={() => {
                user.socket?.emit('admin:group:exclude', { group_id: group.id, excluded: 0 }, (data: any) => {
                  console.log('admin:groups', data)
                  setGroups(prev => prev?.map(prevGroup => group.id === prevGroup.id ? ({ ...prevGroup, excluded: 0 }) : ({ ...prevGroup })))
                })
              }}
            >
              <CloseIcon />
            </div>
          </div>
        })) || []
        table = excluded
      }
      return table
    },
    [groups]
  )

  return (
    <>
      <div className='flex flex-col justify-between h-full'>
        <div className='w-full'>
          <h4 className='text-white uppercase text-2xl mb-6'>{name}</h4>
          <div className='w-full flex flex-col mb-4'>
            <Table columns={columns} data={data} isHeaderHidden={true} />
          </div>
        </div>
        <div className="flex w-full justify-between items-end gap-4" style={{ width: 'calc(100% - 60px)' }}>
          <div className='w-full'>
            <InputWithLabel
              label="Group name"
              type="text"
              value={state.group}
              name="group"
              changeFunction={updateCode}
              placeholder="Name"
            />
          </div>
          <div className='w-10'>
            <Button text='Add' submitFunction={codeSubmit} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ExcludedAccounts
