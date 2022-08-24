import React, { useContext, useState, useEffect } from 'react'
import { auth, database, storage } from './firebase';
import { createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

import { ref, set, onValue, remove } from 'firebase/database'
import { uploadBytes, ref as StorageRef } from 'firebase/storage';

const AuthContext = React.createContext()


export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [admin, setAdmin] = useState()
  const [isAreaChair, setAreaChair] = useState()

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateEmail,
    updatePassword,
    uploadFile,
    writeData,
    childCount,
    uploadAvatar,
    deleteData,
    admin,
    isAreaChair,
  }

  useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, user => {
      setCurrentUser(user)
      setLoading(false)

      onValue(ref(database, `users/${user.uid}`))

      onValue(ref(database, `users/${user.uid}`), snapshot => {
        setAreaChair(snapshot.val().userType === 'Area Chair' ? true : false)
        setAdmin(snapshot.val().userType === 'Admin' ? true : false)
    })
  })
  return unsubscribe},[]);


  function signup(email, password) {
    return createUserWithEmailAndPassword(auth,email, password)
  }

  function login(email, password){
    return signInWithEmailAndPassword(auth,email, password)
  }

  function logout(){
    return signOut(auth)
  }


  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }


  function writeData(path, data, id) {
    return set(ref(database, path + id), data)
  }

  function uploadAvatar(ref, file) {
    return uploadBytes(ref, file)
}

function deleteData(path) {
  return remove(ref(database, path))
}

  function childCount(path) {
    onValue(ref(database, path), snapshot => snapshot.val().length)
  }

  function uploadFile(file, path) {
    return uploadBytes(StorageRef(storage, path), file)
}
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
