const InputWithLabel = ({ label, value, name, changeFunction, type, placeholder, labelClasses, inputClasses }: { label?: string, value: any, name: string, changeFunction: Function, type: string, placeholder?: string, labelClasses?: string, inputClasses?: string }) => {
  return (
    <label className={ labelClasses ?? 'flex flex-col w-full text-gray-6 text-xs mb-2'}>
      {label !== undefined ? <span>{label}</span> : ''}
      {type === 'textarea'
        ? <textarea
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
        : type !== 'checkbox'
          ? <input
              className={inputClasses ?? 'px-3 py-2 bg-dark-17 rounded text-white'}
              type={type}
              name={name}
              value={value}
              onChange={(e) => changeFunction(e.target.name, e.target.value)}
              placeholder={placeholder}
            />
          : <input
              className={inputClasses ?? 'px-3 py-2  accent-yellow-f rounded text-white'}
              type={type}
              name={name}
              checked={value}
              onChange={(e) => changeFunction(e.target.name, e.target.checked)}
              placeholder={placeholder}
            />
    }
    </label>
  )
}

export default InputWithLabel
