import { supabaseClient } from '@/common/config/application_config'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const Login = () => {
  return (
    <>
      {/* generate magic links for admins to get into app */}
      <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} />
    </>
  )
}

export default Login
