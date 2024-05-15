import { supabaseClient } from '@/common/config/application_config'
import { useAuthContext } from '@/contexts/AuthContext'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const Login = () => {
  const { session } = useAuthContext()
  return (
    <>
      {/* generate magic links for admins to get into app */}
      {!session ? <Auth supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} /> : <h1>Logged in</h1>}
    </>
  )
}

export default Login
