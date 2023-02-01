const PopupWrapper = ({ children, closePopup }: { children: JSX.Element | JSX.Element[] | undefined, closePopup: Function }) => {
  return (
    <div className='fixed flex justify-center items-center left-0 top-0 w-full h-screen bg-black bg-opacity-30'>
        <div
          className='px-12 pb-12'
          style={{
            background: 'linear-gradient(0deg, #131620, #131620)',
            border: '2px solid rgba(102, 110, 151, 0.2)',
            backdropFilter: 'blur(20px)',
            borderRadius: '5px'
          }}>
            <div className='flex justify-end pt-12'>
              <button
                type='button'
                className='rounded-md p-2 z-10 text-gray-8 hover:text-gray-6 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                onClick={() => closePopup()}
              >
              <span className='sr-only'>Close menu</span>
              <svg className='h-6 w-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'/>
              </svg>
            </button>
            </div>
            <div className='-mt-8'>
              {children}
            </div>
          </div>
      </div>
  )
}

export default PopupWrapper
