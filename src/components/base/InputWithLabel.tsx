const InputWithLabel = ({ label, value, name, changeFunction, type, placeholder, labelRight }: { label?: string, value: any, name: string, changeFunction: Function, type: string, placeholder?: string, labelRight?: string }) => {
  return (
    <label className={`flex ${labelRight ? 'flex-row items-center' : 'flex-col'} w-full`}>
      {label !== undefined ? <span className="text-gray-6 text-xs mb-2">{label}</span> : ''}
      {type !== 'checkbox'
        ? <input
        className="px-3 py-2 bg-dark-17 rounded text-white"
        type={type}
        name={name}
        value={value}
        onChange={(e) => changeFunction(e.target.name, e.target.value)}
        placeholder={placeholder}
      />
        : <input
      className="px-3 py-2  accent-yellow-f text-white w-5 h-5"
      type={type}
      name={name}
      checked={value}
      onChange={(e) => changeFunction({ name: e.target.name, isChecked: e.target.checked })}
      placeholder={placeholder}
    />}
    {labelRight !== undefined ? <span className={`${value ? 'text-white' : 'text-gray-6'} text-sm  ml-2 `}>{labelRight}</span> : ''}
    </label>
  )
}

export default InputWithLabel
