/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../../store/hooks'
import { selectIsAuthenticated } from '../../auth/authSlice'

export function withAuth<P>(WrappedComponent: React.ComponentType<P>) {
  const EnhancedComponent = (props: any) => {
    const isAuth = useAppSelector(selectIsAuthenticated)

    if (!isAuth) {
      return <Navigate to="/sign-in" replace />
    }

    return <WrappedComponent {...props} />
  }

  return EnhancedComponent
}
