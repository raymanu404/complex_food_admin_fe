/* eslint-disable react-refresh/only-export-components */
import { useModal } from '@/common/utils/hooks/useModal'
import { PropsWithChildren, createContext, useContext } from 'react'

//this is very useful this applicationContext, we should get data to everywhere, lets leave like this for now
interface ApplicationContextI {
  isOpenDrawer: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const DefaultContext: ApplicationContextI = {
  isOpenDrawer: false,
  openDrawer: () => ({}),
  closeDrawer: () => ({}),
}

const ApplicationContext = createContext<ApplicationContextI>(DefaultContext)

const ApplicationContextProvider = ({ children }: PropsWithChildren) => {
  const { closeModal: closeDrawer, isOpen: isOpenDrawer, openModal: openDrawer } = useModal()

  return (
    <ApplicationContext.Provider value={{ closeDrawer, isOpenDrawer, openDrawer }}>
      {children}
    </ApplicationContext.Provider>
  )
}

const useApplicationContext = () => {
  const context = useContext(ApplicationContext)

  if (!context) {
    throw 'You need to put Provider in your root tree'
  }

  return context
}

export { ApplicationContextProvider, useApplicationContext }
