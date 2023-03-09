import dayjs from 'dayjs'

const sortDataByDate = (timePeriod: string, data: any[]): { currentPeriod: any[], previousPeriod: any[] } => {
  let daysStartIndex: number
  switch (timePeriod) {
    case 'Month':
      daysStartIndex = -30
      break
    case 'Week':
      daysStartIndex = -6
      break
    default:
      daysStartIndex = -23
      break
  }
  if (Array.isArray(data)) {
    switch (timePeriod) {
      case 'Day':
        return {
          currentPeriod: data?.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().add(daysStartIndex, 'hour')) && compareDate.isBefore(dayjs())
          }) || [],
          previousPeriod: data?.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().add(daysStartIndex * 2, 'hour')) && compareDate.isBefore(dayjs().add(daysStartIndex, 'hour'))
          }) || []
        }
      default:
        return {
          currentPeriod: data?.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().add(daysStartIndex, 'day')) && compareDate.isBefore(dayjs())
          }) || [],
          previousPeriod: data?.filter(i => {
            const compareDate = dayjs(i.timestamp)
            return compareDate.isAfter(dayjs().add(daysStartIndex * 2, 'day')) && compareDate.isBefore(dayjs().add(daysStartIndex, 'day'))
          }) || []
        }
    }
  } else {
    return { currentPeriod: [], previousPeriod: [] }
  }
}

export default sortDataByDate
