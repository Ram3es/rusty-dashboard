import dayjs from 'dayjs'

const sortDataByDate = (timePeriod: string, data: any[]): { currentPeriod: any[], previousPeriod: any[] } => {
  switch (timePeriod) {
    case 'Today':
      return {
        currentPeriod: data.filter(i => {
          const compareDate = dayjs(i.timestamp)
          return compareDate.isAfter(dayjs().startOf('day')) && compareDate.isBefore(dayjs().endOf('day'))
        }),
        previousPeriod: data.filter(i => {
          const compareDate = dayjs(i.timestamp)
          return compareDate.isAfter(dayjs().add(-1, 'day').startOf('day')) && compareDate.isBefore(dayjs().add(-1, 'day').endOf('day'))
        })
      }
    case 'Yesterday':
      return {
        currentPeriod: data.filter(i => {
          const compareDate = dayjs(i.timestamp)
          return compareDate.isAfter(dayjs().add(-1, 'day').startOf('day')) && compareDate.isBefore(dayjs().add(-1, 'day').endOf('day'))
        }),
        previousPeriod: data.filter(i => {
          const compareDate = dayjs(i.timestamp)
          return compareDate.isAfter(dayjs().add(-2, 'day').startOf('day')) && compareDate.isBefore(dayjs().add(-2, 'day').endOf('day'))
        })
      }
    case 'This week':
      return {
        currentPeriod: data.filter(i => {
          const compareDate = dayjs(i.timestamp)
          return compareDate.isAfter(dayjs().startOf('week')) && compareDate.isBefore(dayjs().endOf('week'))
        }),
        previousPeriod: data.filter(i => {
          const compareDate = dayjs(i.timestamp)
          return compareDate.isAfter(dayjs().add(-1, 'week').startOf('week')) && compareDate.isBefore(dayjs().add(-1, 'week').endOf('week'))
        })
      }
    case 'This month': {
      return {
        currentPeriod: data.filter(i => {
          const compareDate = dayjs(i.timestamp)
          return compareDate.isAfter(dayjs().startOf('month')) && compareDate.isBefore(dayjs().endOf('month'))
        }),
        previousPeriod: data.filter(i => {
          const compareDate = dayjs(i.timestamp)
          return compareDate.isAfter(dayjs().add(-1, 'month').startOf('month')) && compareDate.isBefore(dayjs().add(-1, 'month').endOf('month'))
        })
      }
    }
    default:
      return { currentPeriod: data, previousPeriod: [] }
  }
}

export default sortDataByDate
