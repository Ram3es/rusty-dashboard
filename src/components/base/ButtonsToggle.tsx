const ButtonsToggle = ({ options, currentSelect, peackFunction }: { options: string[], currentSelect: string, peackFunction: Function }) => {
  return (
    <div className="flex">
      {options.map((option, index) => <button
        className={`py-2 px-3 rounded capitalize ${option === currentSelect ? 'text-white bg-dark-25' : 'text-gray-6 bg-dark-17'}`}
        onClick={() => peackFunction(option)}
        key={index}>{option}</button>)}
    </div>
  )
}

export default ButtonsToggle
