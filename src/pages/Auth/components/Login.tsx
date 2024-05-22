import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabaseClient } from '@/common/config/application_config'

const Login = () => {
  return (
    <div>
      {/* TODO: create a custom login, reset password, signup...  to handle redirect and other stuff custom!!!*/}
      <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} />
    </div>
  )
}

export default Login
