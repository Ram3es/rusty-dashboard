const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        data: action.payload
      }
    default:
      return state
  }
}

export default Reducer
