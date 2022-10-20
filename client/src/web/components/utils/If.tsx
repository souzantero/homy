import React, { ReactNode } from 'react'

export interface IfProps {
  condition: boolean
  or?: ReactNode
}

export function If({
  condition,
  or,
  children
}: React.PropsWithChildren<IfProps>) {
  if (!condition && or) return <>{or}</>
  if (!condition) return <></>
  return <>{children}</>
}
