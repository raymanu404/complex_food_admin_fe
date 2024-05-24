import { FlexBoxCentered } from '@/common/styles/styled-components'
import InvitationPage from './components/InvitationPage'
import EmailListContainer from './components/EmailListContainer'
import { LOCAL_STORAGE_EMAIL_ARRAY_KEY } from '@/common/utils/constants'
import { useState } from 'react'
import { getArrayFromLocalStorage } from '@/common/utils/helpers'
import { useGetListAdmin } from '@/api/hooks/adminHooks'

const InviteAdmin = () => {
  const emails = getArrayFromLocalStorage(LOCAL_STORAGE_EMAIL_ARRAY_KEY)
  const [emailList, setEmailList] = useState<string[]>(emails)

  const { isLoading, users } = useGetListAdmin({ isEnabled: true })

  console.log({ users })
  return (
    <FlexBoxCentered sx={{ gap: '30px' }}>
      <InvitationPage emailList={emailList} setEmailList={setEmailList} />
      <EmailListContainer emailList={emailList} />
    </FlexBoxCentered>
  )
}

export default InviteAdmin
