import EditIcon from '../icons/EditIcon'

const EditButton = ({ editFieldValue }: { editFieldValue: Function | null }) => {
  if (editFieldValue != null) {
    return (
      <div
      onClick={() => editFieldValue()}
      className='w-5 h-5 flex justify-center items-center mr-1 rounded bg-dark-17 text-gray-6 cursor-pointer'
      >
        <EditIcon iconCalsses='w-3' />
      </div>
    )
  } else return <div></div>
}

export default EditButton
