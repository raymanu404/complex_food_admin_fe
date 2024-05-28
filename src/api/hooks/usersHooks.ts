import { supabaseAdminClient } from '@/common/config/application_config'
import { useMutation, useQuery } from '@tanstack/react-query'
import { sendMagicLink, sendMagicLinkAdmin } from '../data/users'

//HOOKS FOR GENERAL USERS
const useMagicLink = () => {
  const mutation = useMutation({
    mutationKey: ['send-magic-link-to-user'],
    mutationFn: async (email: string, isEmailValid = true) => {
      if (isEmailValid) {
        const { data, error } = await sendMagicLink({ email })
        console.log({ data })
        console.log({ error })
        return { data, error }
      }

      return null
    },
  })

  return mutation
}

const useMagicLinkAdminByEmail = () => {
  const mutation = useMutation({
    mutationKey: ['send-magic-link-to-admin'],
    mutationFn: async ({ email, isEmailValid = true }: { email: string; isEmailValid: boolean }) => {
      if (isEmailValid) {
        const { data, error } = await sendMagicLinkAdmin({ email })
        console.log({ data })
        console.log({ error })
        return { data, error }
      }

      return null
    },
  })

  return mutation
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

export { useGetListAdmin, useMagicLink, useMagicLinkAdminByEmail }
