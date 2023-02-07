import { Listbox } from '@headlessui/react'
import { Key, useEffect, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { GraphData } from '../../types/GraphData'
import ArrowIcon from '../icons/ArrowIcon'
import ButtonsToggle from './ButtonsToggle'

const graphVariants = ['line graph', 'bar chart']

const Graph = ({ data, timePeriodOptions, currentTimePeriod, changeTimePeriod, names, labels }: { data: GraphData[], timePeriodOptions: any[], currentTimePeriod: any, changeTimePeriod: Function, names: Array<{ name: string, value: number | string, color: string }>, labels: React.ReactElement[] }) => {
  const [menegedGraphData, setMenegedGraphData] = useState<object[]>()
  const [currentGraphVariant, setCurrentGraphVariant] = useState<string>(graphVariants[0])
  const [middlePercent, setMiddlePercent] = useState<string>('50%')
  const [isContainsNegativeVal, setIsContainsNegativeVal] = useState<boolean>(false)

  useEffect(() => {
    setMenegedGraphData(() => {
      return data.map(item => {
        const values = item.value.reduce<Record<string, number>>((prev, cur, i): any => {
          prev[`val${i}`] = cur
          return prev
        }, {})
        return {
          ...values,
          colors: [...item.colors],
          name: item.name
        }
      })
    })
    const maxValue = Math.max(...data.map(item => Math.max(...item.value)))
    const minValue = Math.min(...data.map(item => Math.min(...item.value)))
    setMiddlePercent(() => `${(maxValue / (maxValue + (minValue * -1))) * 100}%`)
    if (minValue < 0) {
      setIsContainsNegativeVal(() => true)
    } else {
      setIsContainsNegativeVal(() => false)
    }
  }, [data])

  const CustomBar = (props: any): React.ReactElement => {
    return <Rectangle {...props} fill={ props.value >= 0 ? props.colors[props.colorIndex]?.postitveColor ?? 'blue' : props.colors[props.colorIndex]?.negativeColor ?? 'red' } />
  }

  const renderTooltip = (props: any): React.ReactElement => {
    // eslint-disable-next-line no-return-assign
    const sumOfPosition = props.payload?.reduce((prev: number, cur: { value: number }) => prev += cur.value, 0) || 0

    return <div className='px-4 py-5 bg-dark-22 text-gray-6 text-base flex flex-col gap-2' style={{
      border: '1.5px solid rgba(140, 152, 169, 0.2)',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)'
    }}>
      {props.payload?.map((item: { dataKey: Key | null | undefined, color: any, value: number }, index: number) => (
        <div key={item.dataKey} className='flex items-center'>
          <span className='w-2 h-2 rounded-full mr-2' style={{
            background: item.color
          }}></span>
          <div className='flex items-center gap-2'>
            {labels[index]} - <span className='text-white'>{(item.value > 0 ? item.value / sumOfPosition * 100 : 0).toFixed()}% ({item.value.toFixed(2)}$)</span>
          </div>
        </div>
      )) || ''}
    </div>
  }

  return (
    <div className='p-8 flex flex-col'>
      <div className='flex justify-between mb-9'>
        <div className='w-full flex justify-between'>
          <div className='flex items-center gap-5'>
            {names.map(name => {
              return (
                <div className='flex items-center gap-3' key={`title-${name.name}`}>
                  <h4 className='text-white uppercase text-2xl'>{name.name}</h4>
                  <div className='text-2xl' style={{ color: name.color }}>{typeof name.value === 'number' ? name.value.toFixed(2) : name.value }</div>
                </div>
              )
            })}
          </div>
          <div className='flex gap-4 relative'>
            <ButtonsToggle options={graphVariants} currentSelect={currentGraphVariant} peackFunction={setCurrentGraphVariant} />
            <div className='relative'>
              <Listbox value={currentTimePeriod.name} onChange={(option) => changeTimePeriod(option)}>
                {({ open }) => (
                  <>
                    <Listbox.Button className='w-36 h-10 flex items-center justify-between px-4 py-2 rounded bg-dark-17 text-gray-6'>
                      <span>{currentTimePeriod.name}</span>
                      <ArrowIcon iconCalsses={`w-4 transform ${open ? 'rotate-90' : ''}`} />
                    </Listbox.Button>
                    <Listbox.Options className="absolute left-0 top-full bg-dark-17 mt-1 w-full px-4 py-2 rounded z-20">
                      {timePeriodOptions.map((option) => (
                        <Listbox.Option
                          className="cursor-pointer text-gray-6 hover:text-white"
                          key={option.id}
                          value={option}
                          disabled={option.unavailable}
                        >
                          {option.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </>
                )}
              </Listbox>
            </div>
          </div>
        </div>
      </div>
      {currentGraphVariant === 'bar chart'
        ? <ResponsiveContainer width="100%" height={233}>
            <BarChart width={790} height={233} data={menegedGraphData}>
              <CartesianGrid vertical={false} stroke="white" strokeWidth={0.5} strokeOpacity={0.15} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              {data[0]?.value.map((item, index) => {
                return !isContainsNegativeVal
                  ? <Bar key={`positive-${index}`} dataKey={`val${index}`} stackId="stack" fill={ item >= 0 ? data[0]?.colors[index]?.postitveColor ?? 'blue' : data[0]?.colors[index].negativeColor ?? 'red' } />
                  : <Bar key={`negative-${index}`} dataKey={`val${index}`} shape={props => <CustomBar {...props} colorIndex={index} />} />
              })}
              <Tooltip cursor={false} wrapperStyle={{
                outline: 'none'
              }} content={renderTooltip} />
            </BarChart>
          </ResponsiveContainer>
        : <ResponsiveContainer width="100%" height={233}>
            <AreaChart
              width={790}
              height={233}
              data={menegedGraphData}
            >
              <CartesianGrid vertical={false} stroke="white" strokeWidth={0.5} strokeOpacity={0.15} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <defs>
                {data[0]?.value.map((item, index) => (
                  <linearGradient key={`gradient-${index}`} id={`gradient-fill-${names[0]?.name}-${index}`} x1="0" y1="0" x2="0" y2="1">
                    {isContainsNegativeVal
                      ? <>
                        <stop
                          offset="10%"
                          stopColor={ data[0]?.colors[index]?.postitveColor ?? 'blue' }
                          stopOpacity={0.9}
                        />
                        <stop
                          offset={middlePercent}
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="90%"
                          stopColor={ data[0]?.colors[index]?.negativeColor ?? 'red' }
                          stopOpacity={0.9}
                        />
                      </>
                      : <>
                        <stop
                          offset="5%"
                          stopColor={ data[0]?.colors[index]?.postitveColor ?? 'blue' }
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="95%"
                          stopColor={ data[0]?.colors[index]?.postitveColor ?? 'blue' }
                          stopOpacity={0}
                        />
                      </>}
                  </linearGradient>
                ))}
              </defs>
              {data[0]?.value.map((item, index) => (
                <Area
                  key={`gradient-area-${index}`}
                  type="linear"
                  dataKey={`val${index}`}
                  fill={`url(#gradient-fill-${names[0]?.name}-${index})`}
                  stroke={ data[0]?.colors[index]?.postitveColor ?? 'blue' } />
              ))}
              <Tooltip wrapperStyle={{
                outline: 'none'
              }} content={renderTooltip} />
            </AreaChart>
          </ResponsiveContainer>}
    </div>
  )
}

export default Graph
