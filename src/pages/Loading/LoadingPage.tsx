import { Spinner } from '@/common/components'
import { FlexBoxCentered } from '@/common/styles/styled-components'

const LoadingPage = () => {
  return (
    <FlexBoxCentered>
      <Spinner />
    </FlexBoxCentered>
  )
}

export default LoadingPage
