import { Auth } from '@supabase/auth-ui-react'
import { supabaseClient } from '@/common/config/application_config'
import { useTheme } from '@mui/material'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const Login = () => {
  const theme = useTheme()

  return (
    <div>
      <Auth
        supabaseClient={supabaseClient}
        theme="default"
        appearance={{
          theme: { ...ThemeSupa },
          style: {
            button: { background: theme.customPalette.primary.light, color: 'white' },
            anchor: { color: theme.customPalette.primary.light },
          },
        }}
        providers={[]}
      />
    </div>
  )
}

export default Login
