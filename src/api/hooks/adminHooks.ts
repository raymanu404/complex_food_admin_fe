import { supabaseAdminClient } from '@/common/config/application_config'
import { CLIENT_APP_URL, PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'
import { useQuery } from '@tanstack/react-query'

const useMagicLinkAdminByEmail = () => {
  return async (email: string, isEmailValid = true) => {
    if (isEmailValid) {
      const { data, error } = await supabaseAdminClient.inviteUserByEmail(email, {
        redirectTo: `${CLIENT_APP_URL}${PATHS[PathEnum.CONFIRM_ACCOUNT]}`,
      })

      return { data, error }
    }

    return null
  }
}

const useGetListAdmin = ({ isEnabled = false }: { isEnabled?: boolean }) => {
  const getListAdminQuery = useQuery({
    queryKey: ['get-list-admin-from-supabase'],
    queryFn: async () => await supabaseAdminClient.listUsers(),
    retry: false,
    enabled: isEnabled,
  })

  const { data } = getListAdminQuery

  const users = data?.data.users ?? []
  return { users: users, ...getListAdminQuery }
}

export { useMagicLinkAdminByEmail, useGetListAdmin }
