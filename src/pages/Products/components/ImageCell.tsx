import { Fragment } from 'react'
import { Box, Dialog, IconButton } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image'
import { handleImageError } from '@/common/utils/helpers'
import { useModal } from '@/common/utils/hooks/useModal'

interface PropsI {
  imagePath: string
  title: string
}

const ImageCell = ({ title, imagePath }: PropsI) => {
  const { closeModal, isOpen, openModal } = useModal()
  return (
    <Fragment>
      <IconButton onClick={openModal}>
        <ImageIcon />
      </IconButton>
      {isOpen && (
        <Dialog open={isOpen} onClose={closeModal}>
          <Box
            component={'img'}
            src={imagePath}
            alt={title}
            sx={{
              height: '100%',
              cursor: 'pointer',
              borderRadius: '10px 10px 0 0 ',
            }}
            onError={handleImageError}
          />
        </Dialog>
      )}
    </Fragment>
  )
}

export default ImageCell
