import { ToastPosition, TypeOptions } from 'react-toastify'

export interface ToastI {
  position?: ToastPosition
  autoClose?: number
}

export interface ToastContentI {
  content: string
  type: TypeOptions
  link?: string
  actionLabel?: string
}
