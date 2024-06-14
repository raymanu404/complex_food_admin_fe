import { FlexBoxCentered } from '@/common/styles/styled-components'
import InvitationPage from './components/InvitationPage'
import EmailListContainer from './components/EmailListContainer'
import { useMemo } from 'react'
import { useGetListAdmin } from '@/api/hooks/usersHooks'

const InviteAdmin = () => {
  const { isLoading, users, refetch } = useGetListAdmin({ isEnabled: true })
  const emailList = useMemo(() => users.map((item) => item.email ?? ''), [users])
  // const emailList: string[] = []

  return (
    <FlexBoxCentered sx={{ gap: '30px' }}>
      <InvitationPage disableSentButton={isLoading} refetch={refetch} emailList={emailList} />
      <EmailListContainer emailList={emailList} isLoading={isLoading} />
    </FlexBoxCentered>
  )
}

export default InviteAdmin
