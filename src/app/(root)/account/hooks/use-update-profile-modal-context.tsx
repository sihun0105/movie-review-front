'use client'

import { createContext, useContext, useState } from 'react'

interface UpdateProfileModalContextProps {
  open: boolean
  setOpen: (_: boolean) => void
}

const UpdateProfileModalContext =
  createContext<UpdateProfileModalContextProps | null>(null)

export const useUpdateProfileModalContext = () => {
  const context = useContext(UpdateProfileModalContext)
  if (!context) {
    throw new Error(
      'useUpdateProfileModalContext must be used within a UpdateProfileModalContextProvider',
    )
  }
  return context
}

export const UpdateProfileModalContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)

  return (
    <UpdateProfileModalContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </UpdateProfileModalContext.Provider>
  )
}
