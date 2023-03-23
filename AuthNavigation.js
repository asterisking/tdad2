
import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { SignedInStack, SignedOutStack } from './navigation'
import { firebase } from './firebase'

export default AuthNavigation = () => {
    const [currentUser, setCurrentUser] = useState(null)
    const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)

    useEffect(() => 
        firebase.auth().onAuthStateChanged(user => useHandler(user))
    , [])
    return <>
    {currentUser ? <SignedInStack/> : <SignedOutStack/> }
    </>

}
