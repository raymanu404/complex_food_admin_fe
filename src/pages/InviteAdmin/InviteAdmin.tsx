import { FlexBoxCentered } from '@/common/styles/styled-components'
import InvitationPage from './components/InvitationPage'
import EmailListContainer from './components/EmailListContainer'
import { getArrayFromLocalStorage } from './utils/helpers'
import { LOCAL_STORAGE_EMAIL_ARRAY_KEY } from '@/common/utils/constants'
import { useState } from 'react'

const InviteAdmin = () => {
  const emails = getArrayFromLocalStorage(LOCAL_STORAGE_EMAIL_ARRAY_KEY)
  const [emailList, setEmailList] = useState<string[]>(getArrayFromLocalStorage(LOCAL_STORAGE_EMAIL_ARRAY_KEY))

  return (
    <FlexBoxCentered sx={{ gap: '30px' }}>
      <InvitationPage emailList={emailList} setEmailList={setEmailList} />
      <EmailListContainer emailList={emails} />
    </FlexBoxCentered>
  )
}

export default InviteAdmin
