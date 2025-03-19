'use client'
import React from 'react'
import { signIn } from 'next-auth/react';
import GoogleButton from 'react-google-button'

function SIgnin() {
  return (
    <div>
        <GoogleButton onClick={() => signIn('google')}></GoogleButton>

    </div>
  )
}

export default SIgnin