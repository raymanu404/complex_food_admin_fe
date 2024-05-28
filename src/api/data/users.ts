import { supabaseAdminClient, supabaseClient } from '@/common/config/application_config'
import { CLIENT_APP_URL, PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'

//this method is used to invite usual users, not with admin role
const sendMagicLink = async ({ email }: { email: string; redirectTo?: string; actionLink?: string }) => {
  return await supabaseClient.auth.signInWithOtp({
    email: email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${CLIENT_APP_URL}${PATHS[PathEnum.CONFIRM_ACCOUNT]}`,
    },
  })
}

const sendMagicLinkAdmin = async ({ email }: { email: string }) => {
  const { data, error } = await supabaseAdminClient.inviteUserByEmail(email, {
    redirectTo: `${CLIENT_APP_URL}${PATHS[PathEnum.CONFIRM_ACCOUNT]}`,
  })

  return { data, error }
}

const updateUserPassword = async (newPassword: string) => {
  return await supabaseClient.auth.updateUser({ password: newPassword })
}

export { sendMagicLink, updateUserPassword, sendMagicLinkAdmin }
