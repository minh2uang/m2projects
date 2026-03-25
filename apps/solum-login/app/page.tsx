'use client'
import { useState } from 'react'
import LogIn from './LogIn'
import HomePage from './HomePage'

export default function Home() {
  const [signedInEmailAddress, setSignedInEmailAddress] = useState<string>()
  const signOut = () => setSignedInEmailAddress(undefined)
  const onSignInSuccessfully = (emailAddress: string) =>
    setSignedInEmailAddress(emailAddress)

  if (!!signedInEmailAddress) {
    // Render when the user's signed in
    return (
      <HomePage signedInEmailAddress={signedInEmailAddress} signOut={signOut} />
    )
  }
  // If not signed in display the log in page
  return <LogIn onSignInSuccessfully={onSignInSuccessfully} />
}
