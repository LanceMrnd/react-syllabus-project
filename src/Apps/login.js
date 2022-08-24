import 'bootstrap/dist/css/bootstrap.min.css'
import LoginStyle from '../styles/loginstyle.module.css'
import { Link } from 'react-router-dom'
import React, {useRef, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from './firebase/AuthContext'
import { auth } from './firebase/firebase'
import { set, ref, onValue, remove, update } from "firebase/database";
import { signInWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2';



const Intro =()=> {

  const emailRef = useRef()
  const passwordRef = useRef()
  const {login} = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function loginUser(e) {
    e.preventDefault()
    const email = emailRef.current.value
    const pass = passwordRef.current.value


    setLoading(true)

    if (email === '' || pass === '') {
        setError('Email and Password and required')
        setLoading(false)
    } else{
      signInWithEmailAndPassword(auth, email, pass)
            .then(() => {
                navigate('/choose')

                setLoading(false)
            }).catch((err) => {
              Swal.fire({

                icon: 'error',

                title: 'Oops...',

                text: 'Invalid email or password!',

              })
                setLoading(false)
            });
    }
}
    return (
        <body>


<nav class="navbar navbar-expand-lg py-3 fixed-top">
          <div class="container">

            <Link to="/" class="navbar-brand">Syllabus Enhancement System</Link>
  
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
            <span class="navbar-toggler-icon"></span>  
            </button>
  
  
            <div class="collapse navbar-collapse" id="navmenu">
              <ul class="navbar-nav ms-auto">
  
            
                <li class="nav-item">
                  <a href="/Login" class="nav-link text-warning">Login</a>
                </li>

                <li class="nav-item">
                  <Link to="/Sign-Up" class="nav-link">Sign Up</Link>
                </li>
  
                
              </ul>
  
  
            </div>
          </div>
        </nav>

        <section class="p-5 p-lg-0 pt-lg-5 mt-5 text-center text-sm-start">
          <div class="container">

            <div class="d-sm-flex align-items-center justify-content-between col-md">


           <img class="img-fluid w-30  m-5"src="images/profandsyllabusclipart.jpg" alt=""/>

          
                  
            <div class="col p-5 m-5 shadow-lg p-3 mb-5 bg-white rounded">

            <form class="pt-3" onSubmit={loginUser} spellCheck={false}>
                              <div id="email" class="form-floating mb-3">
                                 <input type="text"
                                        name='email'
                                        placeholder='info@bulsu.edu.ph' 
                                         required
                                         ref={emailRef} class={`${LoginStyle.email} form-control`}/>
                                 <label for="Email">Username/Email Address</label>
                              </div>
                              <div  id="password" class="form-floating mb-3">
                                 <span class="password-show-toggle js-password-show-toggle"> <span class="uil" name="password"></span></span>
                                 <input type="password"
                                         name='password'
                                         placeholder='Password'
                                         required
                                         ref={passwordRef} class={`${LoginStyle.password} form-control`}/>
                                 <label for="Password">Password</label>
                              </div>
                              <div class="d-grid mb-2">
                                 <button  disabled={loading} type="submit" class="btn" id={LoginStyle.login}>LOGIN</button>
                              </div>
                              <div class="mb-3 d-flex justify-content-end" ><Link to="/forgot-password" class="p-2" ><span>Forgot Password?</span></Link></div>
                              <div class="mb-2" >Don’t have an account? <Link to="/Sign-UP">Sign up</Link></div>
            </form>



            </div>

          
            

    


          </div>
         
          </div>
        </section>


        


        

 
   </body>
    )

}

export default Intro