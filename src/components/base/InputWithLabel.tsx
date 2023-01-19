const InputWithLabel = ({ label, value, name, changeFunction, type, placeholder }: { label?: string, value: any, name: string, changeFunction: Function, type: string, placeholder?: string }) => {
  return (
    <label className="flex flex-col w-full">
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
      className="px-3 py-2 accent-yellow-f rounded text-white"
      type={type}
      name={name}
      checked={value}
      onChange={(e) => changeFunction(e.target.name, e.target.checked)}
      placeholder={placeholder}
    />}
    </label>
  )
}

export default InputWithLabel
