import { Auth } from '@supabase/auth-ui-react'
import { supabaseClient } from '@/common/config/application_config'
import { Box, useTheme } from '@mui/material'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useAuthContext } from '@/contexts/AuthContext'
import { Navigate } from 'react-router-dom'
import { PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'

const Login = () => {
  const theme = useTheme()
  const { session } = useAuthContext()

  if (session) {
    return <Navigate to={PATHS[PathEnum.HOME]} />
  }

  return (
    <Box
      sx={{
        'a[href="#auth-sign-up"]': {
          display: 'none',
        },
      }}
    >
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
    </Box>
  )
}

export default Login
