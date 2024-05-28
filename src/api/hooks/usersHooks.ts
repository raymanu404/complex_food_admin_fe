import { supabaseAdminClient } from '@/common/config/application_config'
import { useMutation, useQuery } from '@tanstack/react-query'
import { sendMagicLink, sendMagicLinkAdmin, updateAdminPassword } from '../data/users'

//HOOKS FOR GENERAL USERS
//TODO: Check
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
        return { data, error }
      }

      return null
    },
  })

  return mutation
}

const useUpdateAdminPassword = () => {
  const mutation = useMutation({
    mutationKey: ['update-admin-password'],
    mutationFn: async ({ newPassword, userId }: { newPassword: string; userId: string }) => {
      const { data, error } = await updateAdminPassword({ newPassword, userId })
      return { data, error }
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

export { useGetListAdmin, useMagicLink, useMagicLinkAdminByEmail, useUpdateAdminPassword }
