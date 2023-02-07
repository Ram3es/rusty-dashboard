import EditIcon from '../icons/EditIcon'

const EditButton = ({ editFieldFunction }: { editFieldFunction?: Function }) => {
  return (
    editFieldFunction
      ? <div
      onClick={() => editFieldFunction()}
      className='w-5 h-5 flex justify-center items-center mr-1 rounded bg-dark-17 text-gray-6 cursor-pointer'
      >
        <EditIcon iconCalsses='w-3' />
      </div>
      : <div></div>
  )
}

export default EditButton
