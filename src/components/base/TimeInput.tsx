const TimeInput = ({ label, value, name, changeFunction, type, placeholder }: { label?: string, value: any, name: string, changeFunction: Function, type: string, placeholder?: string }) => {
  return (
    <label className="flex flex-col w-1/3 px-1">
      {label !== undefined ? <span className="text-gray-6 text-xs mb-2">{label}</span> : ''}
        <input
          className="px-3 py-2 bg-dark-17 rounded text-gray-6"
          type={type}
          name={name}
          value={value}
          onChange={(e) => changeFunction(e.target.name, e.target.value)}
          placeholder={placeholder}
        />
    </label>
  )
}

export default TimeInput
