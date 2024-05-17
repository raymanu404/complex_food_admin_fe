import React from 'react'
import Spinner from '../Spinner/Spinner'
import { Backdrop as BackdropMui } from '@mui/material'

interface PropsI {
  isOpen: boolean
  handleClose?: () => void
}

const Backdrop = ({ isOpen, handleClose }: PropsI) => {
  return (
    <BackdropMui sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isOpen} onClick={handleClose}>
      <Spinner />
    </BackdropMui>
  )
}

export default Backdrop
