import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import React, {useRef, useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from './firebase/AuthContext'
import { set, ref, onValue, remove, update } from "firebase/database";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth , database, storage } from './firebase/firebase' 
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import choosestyle from '../styles/choose.module.css'


// import './Faculty/script'
// import UserDashboard from '../styles/userDashboardStyle.module.css'



const UserDashboard=()=>{
    const [error, setError] = useState('')
    const [user, setUser] = useState({})
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()
     const [loading, setLoading] = useState(false)
    
  
    async function handleLogout() { 
      setError('')
    
  
      try{
        await logout()
        navigate('/Login')
      } catch {
        setError('Failed to log out')
      }
    }

   function handleFaculty() {
    
        setLoading(true)
    
        if(user.userType === "Faculty" && user.access == "accepted"){
          navigate('/Faculty/Dashboard')
      }else if(user.userType === "Area Chair" && user.access =="accepted"){
          navigate('/AreaChair/Dashboard')
      }else if(user.userType === "Admin"){
        navigate('/Admin/Dashboard')
      }
      
      else if(user.access =="pending"){
        alert("Wait for the Admin to accept you");
     }
      
      
      else{
          navigate('/Admin/Dashboard')
      }
    }
    

    useEffect(() => {

      if(user.userType === ''){
          navigate('/Login')
      }else{
 
      const getUserData = onValue(ref(database, `users/${currentUser.uid}`), snapshot => {
        if (snapshot.exists()) {
          setUser(snapshot.val())
          getDownloadURL(storageRef(storage, `avatars/${currentUser.uid}/${snapshot.val().photoUrl}`))
            .then((url) => {
              const avatar = document.getElementById(`user-profile-avatar`)
              avatar.setAttribute('src', url)
            }).catch((err) => {
              console.log('error')
            })
    
        } else {
          return setUser('No data available')
        }
      })
      return getUserData
             
    }
    }, [])



    return(
        <body class={choosestyle.body1}>
            <div class={choosestyle.bg}></div>
    <div class={choosestyle.termsbox}>
        <div class={choosestyle.termstex}>
            <h2 class = {choosestyle.termsandcondition}>Terms And Conditions</h2>
            <p class = {choosestyle.termsgreet}>Greetings User</p>
            <p class = {choosestyle.termsandservices}> Terms of service are the legal agreements between a service provider and a person who wants to use that service. The person must agree to abide by the terms of service in order to use the offered service. Terms of service can also be merely a disclaimer, especially regarding the use of websites.</p>
       
       <h4>I Agree To The <span> Terms And Conditions</span> And I Read The Privacy Notice</h4>
       <div class={choosestyle.buttons}>
           <button class={`${choosestyle.redbtn} btn red-btn`} onClick={handleFaculty}>Accept</button>
           <button class={`${choosestyle.graybtn} btn gray-btn`} onClick={handleLogout}>Decline</button>
       </div>

            </div>
    </div>
           
        </body>
    )
}



export default UserDashboard;

