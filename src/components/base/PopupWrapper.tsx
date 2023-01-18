const PopupWrapper = (props: any) => {
  return (
    <div className='fixed flex justify-center items-center left-0 top-0 w-full h-screen bg-black bg-opacity-30'>
        <div
          className='p-12'
          style={{
            background: 'linear-gradient(0deg, #131620, #131620)',
            border: '2px solid rgba(102, 110, 151, 0.2)',
            backdropFilter: 'blur(20px)',
            borderRadius: '5px'
          }}>
            {props.children}
          </div>
      </div>
  )
}

export default PopupWrapper
