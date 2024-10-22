import InputFile from './InputFile'

const InputWithLabel = ({ label, value, name, changeFunction, type, placeholder, labelClasses, inputClasses }: { label?: string, value: any, name: string, changeFunction: Function, type: string, placeholder?: string, labelClasses?: string, inputClasses?: string }) => {
  return (
    <label className={ labelClasses ?? 'flex flex-col w-full text-gray-6 text-xs mb-2'}>
      {label !== undefined ? <span className='mb-2'>{label}</span> : ''}
      {type === 'textarea'
        ? <textarea
            className="px-3 py-2 bg-dark-17 rounded text-gray-6 text-sm"
            name={name}
            value={value}
            onChange={(event: any) => {
              changeFunction(event.target.value)
              console.log('event.target.value', event.target.value)
            }}
            placeholder={placeholder}
          />
        : type === 'checkbox'
          ? <input
              className={inputClasses ?? 'px-3 py-2  accent-yellow-f rounded text-white'}
              type={type}
              name={name}
              checked={value}
              onChange={(e) => changeFunction(e.target.name, e.target.checked)}
              placeholder={placeholder}
             />
          : type === 'file'
            ? <InputFile onChange={(e) => changeFunction(e.target.files?.[0]) } />
            : type !== 'radio'
              ? <input
               className={inputClasses ?? 'px-3 py-2 bg-dark-17 rounded text-white h-11'}
               type={type}
               name={name}
               value={value}
               onChange={(e) => changeFunction(e.target.name, e.target.value)}
               placeholder={placeholder}
              />
              : <input
                className={inputClasses ?? 'px-3 py-2  accent-yellow-f rounded text-white h-11'}
                type={type}
                name={name}
                checked={value}
                onChange={(e) => changeFunction(e.target.name, e.target.value)}
                placeholder={placeholder}
               />
    }
    </label>
  )
}

export default InputWithLabel
