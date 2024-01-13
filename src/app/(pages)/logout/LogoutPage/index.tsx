'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'

export const LogoutPage: React.FC<{
  settings: Settings
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}
  const { logout } = useAuth()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout()
        setSuccess('Cerraste sesión con éxito.')
      } catch (_) {
        setError('Ya has cerrado sesión.')
      }
    }

    performLogout()
  }, [logout])

  return (
    <Fragment>
      {(error || success) && (
        <div>
          <h1>{error || success}</h1>
          <p>
            {'¿Qué te gustaría hacer a continuación?'}
            {typeof productsPage === 'object' && productsPage?.slug && (
              <Fragment>
                {' '}
                <Link href={`/${productsPage.slug}`}>Click aquí</Link>
                {` para comprar.`}
              </Fragment>
            )}
            {` Para loguearte de vuelta, `}
            <Link href="/login">click aquí</Link>
            {'.'}
          </p>
        </div>
      )}
    </Fragment>
  )
}
