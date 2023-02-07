import React, { FC, useCallback, useEffect, useState } from 'react'

import 'react-tooltip/dist/react-tooltip.css'
import { User } from '../../types/User'
import PopupWrapper from '../base/PopupWrapper'
import PermissionTemplate from './templates/PermissionTemplate'

interface IEditPermissProps {
  user?: User
  title: string
  isEdit: boolean
  submitFunction: Function
}

const EditPermissions: FC<IEditPermissProps> = (props) => {
  const { user } = props
  const [isOpenPopup, setOpenPopup] = useState(false)

  const onTogglePopup = useCallback(() => {
    setOpenPopup(state => !state)
  }, [])

  useEffect(() => {
    user && setOpenPopup(true)
  }, [user])
  return (isOpenPopup
    ? (
        <PopupWrapper closePopup={ onTogglePopup }>
            <PermissionTemplate {...props} toggleTooltip={onTogglePopup} />
        </PopupWrapper>)
    : null)
}
export default EditPermissions
