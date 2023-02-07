import { useState } from 'react'
import { UserWithFields } from '../../types/User'
import PopupWrapper from '../base/PopupWrapper'
import UserAccountField from '../base/UserAccountField'
import Button from '../base/Button'
import { Time } from '../../types/Time'
import ArrowIcon from '../icons/ArrowIcon'
import { Listbox } from '@headlessui/react'
import AvatarImage from '../../assets/avatar.png'
import ProfilePicture from '../../assets/profilePicture.png'
import InputWithLabel from '../base/InputWithLabel'

const statisticOptions = [
  { id: 1, name: 'Active', unavailable: false },
  { id: 2, name: 'Disabled', unavailable: false },
  { id: 3, name: 'Disabled - System AI', unavailable: false },
  { id: 4, name: 'Whitlisted Bypass', unavailable: false }
]

const UserAccountInformation = ({ timePeriodOptions }: { timePeriodOptions: any[] }) => {
  const [user, setUser] = useState<UserWithFields>({
    name: 'Some user',
    email: 'test@test.test',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    steam64Id: '76561199176275',
    uid: '62892',
    discordId: 'Grodslaktran#1820',
    affiliateCode: 'Grods',
    tradeUrl: 'https://steamcom.unsplash.com',
    withrdraw: 'string',
    muted: false,
    mutedLength: {
      days: 0,
      hours: 0,
      minutes: 0
    },
    mutedReason: '',
    banned: true,
    bannedLength: {
      days: 1,
      hours: 0,
      minutes: 1
    },
    bannedReason: 'Reason',
    created: new Date('2023-01-12T16:51:16.919Z'),
    registerIp: '82.76.4.96',
    lattestIp: '82.76.4.6',
    lattestLogin: new Date('2023-01-12T16:51:16.919Z')
  })
  const [selectedGeneralStatisticPeriod, setSelectedGeneralStatisticPeriod] = useState(statisticOptions[0])
  const [affiliateCode, setAffiliateCode] = useState<string>(user.affiliateCode)
  const [isAffiliateCodePopupOpen, setAffiliateCodePopupOpen] = useState<boolean>(false)
  const [mutedLength, setMuteLength] = useState<Time>(user.mutedLength)
  const [mutedReason, setMutedReason] = useState<string>(user.mutedReason)
  const [isMutedPopupOpen, setMutedPopupOpen] = useState<boolean>(false)
  const [isMutedEditPopupOpen, setMutedEditPopupOpen] = useState<boolean>(false)
  const [bannedLength, setBannedLength] = useState<Time>(user.bannedLength)
  const [bannedReason, setBannedReason] = useState<string>(user.bannedReason)
  const [isBannedPopupOpen, setBannedPopupOpen] = useState<boolean>(false)
  const [isBannedEditPopupOpen, setBannedEditPopupOpen] = useState<boolean>(false)
  const [isConfirmationAfCodePopupOpen, setConfirmationAfCodePopupOpen] = useState<boolean>(false)
  const [isEditMutedConfirmationPopupOpen, setEditMutedConfirmationPopupOpen] = useState<boolean>(false)
  const [isSetMutedConfirmationPopupOpen, setSetMutedConfirmationPopupOpen] = useState<boolean>(false)
  const [isEditBannedConfirmationPopupOpen, setEditBannedConfirmationPopupOpen] = useState<boolean>(false)
  const [isSetBannedConfirmationPopupOpen, setSetBannedConfirmationPopupOpen] = useState<boolean>(false)

  const submitUserAffiliateCode = () => {
    setUser((prev) => {
      return { ...prev, affiliateCode }
    })
    setAffiliateCodePopupOpen(false)
    setConfirmationAfCodePopupOpen(false)
  }

  const submitUserMuted = () => {
    setUser((prev) => {
      return { ...prev, muted: true, mutedLength, mutedReason }
    })
    setMutedPopupOpen(false)
    setMutedEditPopupOpen(false)
    setEditMutedConfirmationPopupOpen(false)
    setSetMutedConfirmationPopupOpen(false)
  }

  const submitUserBanned = () => {
    setUser((prev) => {
      return { ...prev, banned: true, bannedLength, bannedReason }
    })
    setBannedPopupOpen(false)
    setBannedEditPopupOpen(false)
    setEditBannedConfirmationPopupOpen(false)
    setSetBannedConfirmationPopupOpen(false)
  }

  return (
    <>
      <div className="w-full mb-6 ">
        <h3 className="uppercase text-2xl text-white mb-6">Account Information</h3>
        <div className='w-full flex flex-col mb-4 text-gray-6 text-sm'>
          <div className='w-full flex flex-row'>
            <div className='w-full flex flex-col'>
              <UserAccountField label="Steam 64 ID" value={user.steam64Id} />
              <UserAccountField label="UID" value={user.uid} />
              <UserAccountField label="Discord ID" value={user.discordId} />
              <UserAccountField
                label="Affiliate code"
                value={user.affiliateCode}
                editFieldValue={setAffiliateCodePopupOpen}
              />
              <UserAccountField label="Trade URL" value={user.tradeUrl} />
              <div className='w-full grid grid-cols-8 p-1'>
                <div className='col-span-3 p-1'>Withrdraw</div>
                  <div className='relative col-span-5'>
                    <Listbox value={selectedGeneralStatisticPeriod} onChange={setSelectedGeneralStatisticPeriod}>
                      {({ open }) => (
                        <>
                          <Listbox.Button className='w-full h-8 flex items-center justify-between px-4 py-2 rounded bg-dark-25 text-gray-6'>
                            <span>{selectedGeneralStatisticPeriod.name}</span>
                            <ArrowIcon iconCalsses={`w-4 transform ${open ? 'rotate-90' : ''}`} />
                          </Listbox.Button>
                          <Listbox.Options className="absolute left-0 top-full bg-dark-25 mt-1 w-full px-4 py-2 rounded">
                            {statisticOptions.map((option) => (
                              <Listbox.Option
                                className="cursor-pointer text-gray-6 hover:text-white"
                                key={option.id}
                                value={option}
                                disabled={option.unavailable}
                              >
                                {option.name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </>
                      )}
                    </Listbox>
                  </div>
              </div>
              <UserAccountField
                label="Muted"
                value={user.muted}
                editFieldValue={setMutedEditPopupOpen}
                setFieldValue={setMutedPopupOpen}
                icon='MuteIcon'
              />
              <UserAccountField
                label="Muted Reason"
                value={user.mutedReason}
                // editFieldValue={setMutedPopupOpen}
              />
            </div>
            <div className='w-full flex flex-col'>
              <UserAccountField
                label="Banned"
                value={user.banned}
                editFieldValue={setBannedEditPopupOpen}
                setFieldValue={setBannedPopupOpen}
                icon='BannedIcon'
              />
              <UserAccountField
                label="Banned Reason"
                value={user.bannedReason}
                // editFieldValue={setBannedPopupOpen}
              />
              <UserAccountField label="Created" value={user.created.toString()} />
              <UserAccountField label="Register IP" value={user.registerIp} />
              <UserAccountField label="Lattest IP" value={user.lattestIp} />
              <UserAccountField label="Lattest Login" value={user.lattestLogin.toString()} />
            </div>
          </div>
        </div>

      </div>
      {isAffiliateCodePopupOpen
        ? <PopupWrapper
            closePopup={() => setAffiliateCodePopupOpen(false)}
          >
          <div className='flex flex-col justify-center w-96'>
            <h4 className='text-white uppercase text-2xl text-center'>EDIT Affiliate Code</h4>
            <div className='flex justify-center items-center mt-1 mb-8'>
              <img className='h-8 w-8 mr-2' src={AvatarImage} alt="AvatarImage" />
              <div className="text-gray-6 text-sm">Grodslaktaren</div>
            </div>
            <div className='text-gray-6'>
              <InputWithLabel
                value={affiliateCode}
                type="string"
                name="affiliateCode"
                label='New Code'
                placeholder='Enter Amount'
                changeFunction={(name: string, value: string) => setAffiliateCode(value)}
              />
            </div>
            <div className='mt-10 mx-auto flex justify-center items-center gap-4 w-36'>
              <Button text='Confirm' submitFunction={() => setConfirmationAfCodePopupOpen(true)} />
            </div>
          </div>
        </PopupWrapper>
        : null}
      {isMutedPopupOpen
        ? <PopupWrapper
            closePopup={() => setMutedPopupOpen(false)}
          >
          <div className='flex flex-col justify-center max-w-xl'>
            <h4 className='text-white uppercase text-2xl text-center'>MUTE</h4>
            <div className='flex justify-center items-center mt-1 mb-8'>
              <img className='h-8 w-8 mr-2' src={AvatarImage} alt="AvatarImage" />
              <div className="text-gray-6 text-sm">Grodslaktaren</div>
            </div>
            <div className='w-1/2 m-auto mb-6'>
              <div className='text-white text-base pb-2'>Length of mute</div>
              <div className='flex justify-center items-center gap-2'>
                  <InputWithLabel
                    value={mutedLength.days}
                    name="muteLength"
                    changeFunction={(name: any, value: number) => {
                      setMuteLength((prev) => {
                        return { ...prev, days: value }
                      })
                    }}
                    type='number'
                    label='Days'
                  />
                  <InputWithLabel
                    value={mutedLength.hours}
                    name="muteLength"
                    changeFunction={(name: any, value: number) => {
                      setMuteLength((prev) => {
                        return { ...prev, hours: value }
                      })
                    }}
                    type='number'
                    label='Hours'
                  />
                  <InputWithLabel
                    value={mutedLength.minutes}
                    name="muteLength"
                    changeFunction={(name: any, value: number) => {
                      setMuteLength((prev) => {
                        return { ...prev, minutes: value }
                      })
                    }}
                    type='number'
                    label='Minutes'
                  />
              </div>
            </div>
            <div className='text-white text-base pb-2'>Reason for Mute</div>
            <InputWithLabel
              type="textarea"
              value={mutedReason}
              name="mutedReason"
              label='Reason for Mute'
              placeholder='Enter reason for mute...'
              changeFunction={setMutedReason}
            />
            <div className='mt-10 mx-auto flex justify-center items-center gap-4 w-36'>
              <Button text='Confirm' submitFunction={() => setSetMutedConfirmationPopupOpen(true)} />
            </div>
          </div>
        </PopupWrapper>
        : null}
      {isMutedEditPopupOpen
        ? <PopupWrapper
            closePopup={() => setMutedEditPopupOpen(false)}
          >
          <div className='flex flex-col justify-center max-w-xl'>
            <h4 className='text-white uppercase text-2xl text-center'>EDIT MUTE</h4>
            <div className='flex justify-center items-center mt-1 mb-8'>
              <img className='h-8 w-8 mr-2' src={AvatarImage} alt="AvatarImage" />
              <div className="text-gray-6 text-sm">Grodslaktaren</div>
            </div>
            <div className='w-1/2 m-auto mb-6'>
              <div className='text-white text-base pb-2 text-center'>
                <p>Current Length of mute</p>
                <p className='text-gray-7'>{user.mutedLength.days}D {user.mutedLength.hours}hrs {user.mutedLength.minutes}m</p>
              </div>
            </div>
            <div className='w-1/2 m-auto'>
              <div className='text-white text-base pb-2'>New Length of mute</div>
              <div className='flex justify-center items-center gap-2'>
                <InputWithLabel
                    value={mutedLength.days}
                    name="muteLength"
                    changeFunction={(name: any, value: number) => {
                      setMuteLength((prev) => {
                        return { ...prev, days: value }
                      })
                    }}
                    type='number'
                    label='Days'
                  />
                  <InputWithLabel
                    value={mutedLength.hours}
                    name="muteLength"
                    changeFunction={(name: any, value: number) => {
                      setMuteLength((prev) => {
                        return { ...prev, hours: value }
                      })
                    }}
                    type='number'
                    label='Hours'
                  />
                  <InputWithLabel
                    value={mutedLength.minutes}
                    name="muteLength"
                    changeFunction={(name: any, value: number) => {
                      setMuteLength((prev) => {
                        return { ...prev, minutes: value }
                      })
                    }}
                    type='number'
                    label='Minutes'
                  />
              </div>
            </div>
            <div className='mt-10 mx-auto flex justify-center items-center gap-4 w-36'>
              <Button text='Confirm' submitFunction={() => setEditMutedConfirmationPopupOpen(true)} />
            </div>
          </div>
        </PopupWrapper>
        : null}
      {isBannedPopupOpen
        ? <PopupWrapper
            closePopup={() => setBannedPopupOpen(false)}
          >
          <div className='flex flex-col justify-center max-w-xl'>
            <h4 className='text-white uppercase text-2xl text-center'>BAN</h4>
            <div className='flex justify-center items-center mt-1 mb-8'>
              <img className='h-8 w-8 mr-2' src={AvatarImage} alt="AvatarImage" />
              <div className="text-gray-6 text-sm">Grodslaktaren</div>
            </div>
            <div className='w-1/2 m-auto mb-6'>
              <div className='text-white text-base pb-2'>Length of ban</div>
              <div className='flex justify-center items-center gap-2'>
                <InputWithLabel
                    value={bannedLength.days}
                    name="bannedLength"
                    changeFunction={(name: any, value: number) => {
                      setBannedLength((prev) => {
                        return { ...prev, days: value }
                      })
                    }}
                    type='number'
                    label='Days'
                  />
                  <InputWithLabel
                    value={bannedLength.hours}
                    name="bannedLength"
                    changeFunction={(name: any, value: number) => {
                      setBannedLength((prev) => {
                        return { ...prev, hours: value }
                      })
                    }}
                    type='number'
                    label='Hours'
                  />
                  <InputWithLabel
                    value={bannedLength.minutes}
                    name="bannedLength"
                    changeFunction={(name: any, value: number) => {
                      setBannedLength((prev) => {
                        return { ...prev, minutes: value }
                      })
                    }}
                    type='number'
                    label='Minutes'
                  />
              </div>
            </div>
            <div className='text-white text-base pb-2'>Reason for ban</div>
            <InputWithLabel
              type="textarea"
              value={bannedReason}
              name="bannedReason"
              label='Reason for ban'
              placeholder='Enter reason for ban...'
              changeFunction={setBannedReason}
            />
            <div className='mt-10 mx-auto flex justify-center items-center gap-4 w-36'>
              <Button text='Confirm' submitFunction={() => setSetBannedConfirmationPopupOpen(true)} />
            </div>
          </div>
        </PopupWrapper>
        : null}
      {isBannedEditPopupOpen
        ? <PopupWrapper
            closePopup={() => setBannedEditPopupOpen(false)}
          >
          <div className='flex flex-col justify-center max-w-xl'>
            <h4 className='text-white uppercase text-2xl text-center'>EDIT BAN</h4>
            <div className='flex justify-center items-center mt-1 mb-8'>
              <img className='h-8 w-8 mr-2' src={AvatarImage} alt="AvatarImage" />
              <div className="text-gray-6 text-sm">Grodslaktaren</div>
            </div>
            <div className='w-1/2 m-auto mb-6'>
              <div className='text-white text-base pb-2 text-center'>
                <p>Current Length of ban</p>
                <p className='text-gray-7'>{user.bannedLength.days}D {user.bannedLength.hours}hrs {user.bannedLength.minutes}m</p>
              </div>
              <div className='flex justify-center items-center gap-2'>
                <InputWithLabel
                    value={bannedLength.days}
                    name="bannedLength"
                    changeFunction={(name: any, value: number) => {
                      setBannedLength((prev) => {
                        return { ...prev, days: value }
                      })
                    }}
                    type='number'
                    label='Days'
                  />
                  <InputWithLabel
                    value={bannedLength.hours}
                    name="bannedLength"
                    changeFunction={(name: any, value: number) => {
                      setBannedLength((prev) => {
                        return { ...prev, hours: value }
                      })
                    }}
                    type='number'
                    label='Hours'
                  />
                  <InputWithLabel
                    value={bannedLength.minutes}
                    name="bannedLength"
                    changeFunction={(name: any, value: number) => {
                      setBannedLength((prev) => {
                        return { ...prev, minutes: value }
                      })
                    }}
                    type='number'
                    label='Minutes'
                  />
              </div>
            </div>
            <div className='mt-10 mx-auto flex justify-center items-center gap-4 w-36'>
              <Button text='Confirm' submitFunction={() => setEditBannedConfirmationPopupOpen(true)} />
            </div>
          </div>
        </PopupWrapper>
        : null}
      {isConfirmationAfCodePopupOpen
        ? <PopupWrapper
            closePopup={() => setConfirmationAfCodePopupOpen(false)}
          >
          <div className='flex flex-col justify-center max-w-xl'>
            <h4 className='text-white uppercase text-2xl text-center'>Confirmation Required</h4>
            <div className='text-gray-6 text-sm text-center pt-2'>
              <div className='flex'>
                <span>Are you sure you want to push the change </span>
                <img className='h-6 w-6 mx-1' src={ProfilePicture} alt='ProfilePicture' />
                <span> {user.name} affiliate code</span>
              </div>
              <p>from &quot;{user.affiliateCode}&quot; to &quot;{affiliateCode}&quot;</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='mt-10 mr-2 flex justify-center items-center gap-4 w-36'>
                <Button text='Cancel' color='grey' submitFunction={() => setConfirmationAfCodePopupOpen(false)} />
              </div>
              <div className='mt-10 ml-2 flex justify-center items-center gap-4 w-36'>
                <Button text='Change' submitFunction={submitUserAffiliateCode} />
              </div>
            </div>
          </div>
        </PopupWrapper>
        : null}
      {isEditMutedConfirmationPopupOpen
        ? <PopupWrapper
            closePopup={() => setEditMutedConfirmationPopupOpen(false)}
          >
          <div className='flex flex-col justify-center max-w-xl'>
            <h4 className='text-white uppercase text-2xl text-center'>Confirmation Required</h4>
            <div className='text-gray-6 text-sm text-center pt-2'>
                <div className='flex'>
                <span>Are you sure you want to change the user </span>
                <img className='h-6 w-6 mx-1' src={ProfilePicture} alt='ProfilePicture' />
                <span> {user.name} ban</span>
              </div>
              <p>from {user.mutedLength.days}D {user.mutedLength.hours}hrs {user.mutedLength.minutes}m to {mutedLength.days}D {mutedLength.hours}hrs {mutedLength.minutes}m ?</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='mt-10 flex justify-center items-center gap-4 w-36'>
                <Button text='Cancel' color='grey' submitFunction={() => setEditMutedConfirmationPopupOpen(false)} />
              </div>
              <div className='mt-10 flex justify-center items-center gap-4 w-36'>
                <Button text='Update' submitFunction={submitUserMuted} />
              </div>
            </div>
          </div>
        </PopupWrapper>
        : null}
      {isSetMutedConfirmationPopupOpen
        ? <PopupWrapper
            closePopup={() => setSetMutedConfirmationPopupOpen(false)}
          >
          <div className='flex flex-col justify-center max-w-xl'>
            <h4 className='text-white uppercase text-2xl text-center'>Confirmation Required</h4>
            <div className='text-gray-6 text-sm text-center pt-2'>
              <div className='flex'>
                <span>Are you sure you want to mute the user </span>
                <img className='h-6 w-6 mx-1' src={ProfilePicture} alt='ProfilePicture' />
                <span> {user.name}</span>
              </div>
              <span>for {mutedLength.days} Days ?</span>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='mt-10 flex justify-center items-center gap-4 w-36'>
                <Button text='Cancel' color='grey' submitFunction={() => setSetMutedConfirmationPopupOpen(false)} />
              </div>
              <div className='mt-10 flex justify-center items-center gap-4 w-36'>
                <Button text='Mute' submitFunction={submitUserMuted} />
              </div>
            </div>
          </div>
        </PopupWrapper>
        : null}
      {isEditBannedConfirmationPopupOpen
        ? <PopupWrapper
            closePopup={() => setEditBannedConfirmationPopupOpen(false)}
          >
          <div className='flex flex-col justify-center max-w-xl'>
            <h4 className='text-white uppercase text-2xl text-center'>Confirmation Required</h4>
            <div className='text-gray-6 text-sm text-center pt-2'>
              <div className='flex'>
                <span>Are you sure you want to change the user </span>
                <img className='h-6 w-6 mx-1' src={ProfilePicture} alt='ProfilePicture' />
                <span> {user.name} ban</span>
              </div>
              <p>from {user.bannedLength.days}D {user.bannedLength.hours}hrs {user.bannedLength.minutes}m to {bannedLength.days}D {bannedLength.hours}hrs {bannedLength.minutes}m ?</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='mt-10 flex justify-center items-center gap-4 w-36'>
                <Button text='Cancel' color='grey' submitFunction={() => setEditBannedConfirmationPopupOpen(false)} />
              </div>
              <div className='mt-10 flex justify-center items-center gap-4 w-36'>
                <Button text='Update' submitFunction={submitUserBanned} />
              </div>
            </div>
          </div>
        </PopupWrapper>
        : null}
      {isSetBannedConfirmationPopupOpen
        ? <PopupWrapper
            closePopup={() => setSetBannedConfirmationPopupOpen(false)}
          >
          <div className='flex flex-col justify-center max-w-xl'>
            <h4 className='text-white uppercase text-2xl text-center'>Confirmation Required</h4>
            <div className='text-gray-6 text-sm text-center pt-2'>
              <div className='flex'>
                <span>Are you sure you want to ban the user </span>
                <img className='h-6 w-6 mx-1' src={ProfilePicture} alt='ProfilePicture' />
                <span> {user.name} for {bannedLength.days} Days ?</span>
              </div>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='mt-10 flex justify-center items-center gap-4 w-36'>
                <Button text='Cancel' color='grey' submitFunction={() => setSetBannedConfirmationPopupOpen(false)} />
              </div>
              <div className='mt-10 flex justify-center items-center gap-4 w-36'>
                <Button text='Ban' submitFunction={submitUserBanned} />
              </div>
            </div>
          </div>
        </PopupWrapper>
        : null}
    </>
  )
}

export default UserAccountInformation
