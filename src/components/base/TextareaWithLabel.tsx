const TextareaWithLabel = ({ label, value, name, changeFunction, placeholder }: { label?: string, value: any, name: string, changeFunction: Function, placeholder?: string }) => {
  return (
    <label className="flex flex-col w-full">
      {label !== undefined ? <span className="text-gray-6 text-xs mb-2">{label}</span> : ''}
    <textarea
        className="px-3 py-2 bg-dark-17 rounded text-gray-6 text-sm"
        // type={type}
        name={name}
        value={value}
        onChange={(event: any) => {
          changeFunction(event.target.value)
          console.log('event.target.value', event.target.value)
        }}
        placeholder={placeholder}
      />
    </label>
  )
}

export default TextareaWithLabel
