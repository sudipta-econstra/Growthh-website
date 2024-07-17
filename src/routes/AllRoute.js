import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './DefineRouter'

export const AllRoute = () => {
  return (
    <RouterProvider router={router} />
  )
}
