import EditIcon from '../icons/EditIcon'

const EditButton = ({ editFieldFunction, iconClasses }: { editFieldFunction?: Function, iconClasses?: string }) => {
  return (
    <div
      onClick={() => editFieldFunction ? editFieldFunction() : null}
      className={iconClasses ?? 'w-5 h-5 flex justify-center items-center mr-1 rounded bg-dark-17 text-gray-6 cursor-pointer'}
    >
      <EditIcon iconCalsses='w-3' />
    </div>
  )
}

export default EditButton
