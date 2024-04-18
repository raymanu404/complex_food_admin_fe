import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, Slide } from 'react-toastify'
import { ToastI } from './interfaces'

const Toast = ({ position = 'top-right', autoClose = 3000 }: ToastI) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      newestOnTop
      pauseOnHover
      limit={3}
      closeOnClick={false}
      transition={Slide}
      // className={styles.container}
      // toastClassName={styles.wrapper}
    />
  )
}

export default Toast
