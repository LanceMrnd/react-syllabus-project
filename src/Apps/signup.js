import React, {useRef, useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUpStyle from '../styles/signupStyle.module.css'
import { useAuth } from './firebase/AuthContext'
import { Link, useNavigate} from 'react-router-dom'
import { set, ref} from "firebase/database";
import { database } from './firebase/firebase'
import Swal from 'sweetalert2' 



const Intro =()=> {
  
  
  const emailRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef()
  // const lastnameRef = useRef()
  const employeeidRef =useRef()
  const position = useRef()
  const passwordConfirmRef = useRef()
  const {signup} = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()


  function signUpUser(e) {
    e.preventDefault()
    setLoading(true)

  

   


    

    if (passwordRef.current.value === passwordConfirmRef.current.value) {
        signup(emailRef.current.value, passwordRef.current.value)
            .then((userCredentials) => {
                const newAccount = {
                    uid: userCredentials.user.uid,
                    name: nameRef.current.value,
                    // lastname: lastnameRef.current.value,
                    userType: position.current.value,
                    employeeId: employeeidRef.current.value,
                    photoUrl: "../images/defaultdp.png",
                    email: emailRef.current.value,
                    access: "pending",

                    
                }

                set(ref(database, `users/${userCredentials.user.uid}`), newAccount)
                    .then(() => {
                  
                        navigate('/Login')
                    }).catch((error) => {
                        setError(error)
                    });
                setLoading(false)
            }).catch((error) => {
                setError(error)
            });

            Swal.fire(

              'Sign Up Suceesful!',
              'Wait for the Admin to accept you!',
              'success'

            )


    } else {
        setError(`Passwords don't match`)
        setLoading(false)
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
                  <Link to="/Login" class="nav-link">Login</Link>
                </li>

                <li class="nav-item">
                  <Link to="/Sign-Up" class="nav-link text-warning">Sign Up</Link>
                </li>
  
                
              </ul>
  
  
            </div>
          </div>
        </nav>

        <section class="p-5 p-lg-0 pt-lg-5 mt-5 text-center text-sm-start">
          <div class="container">

            <div class="d-sm-flex align-items-center justify-content-between col-md">


           <img class="img-fluid w-30  m-5"src="images/profandsyllabusclipart.jpg" alt=""/>

          
                  
            <div class="col p-5 m-5 align-items-center text-center shadow-lg p-3 mb-5 bg-white rounded">

            <form action="#" class="pt-3"  onSubmit={signUpUser}>
                              <div class="form-floating">
                                 <input type="text"
                                       name='name'
                                       placeholder='Jheremie Campillanes' 
                                       required
                                       ref={nameRef}
                                       class={` ${SignUpStyle.firstName} form-control mb-3`}/>
                                 <label for="Name">First Name:</label>
                              </div>

                              {/* <div class="form-floating">
                                 <input type="text"
                                       name='name'
                                       placeholder='Jheremie Campillanes' 
                                       required
                                       ref={lastnameRef}
                                       class={` ${SignUpStyle.lastName} form-control mb-3`}/>
                                 <label for="Name">Last Name:</label>
                              </div> */}


                              <div class="d-sm-flex mx-3 mb-3">

                                  <label>Gender:</label>
                              <div class="form-check">

                                   <input class="form-check-input mx-2" type="radio" name="flexRadioDefault"  id="genderMale"/>
                                       <label class="form-check-label" for="flexRadioDefault1">
                                         Male
                                       </label>
                                   </div>

                              <div class="form-check">
                                <input class="form-check-input mx-2" type="radio" name="flexRadioDefault"   id="flexRadioDefault2" checked/>
                                    <label class="form-check-label" for="flexRadioDefault2" >
                                        Female
                                    </label>
                              </div>
                           

                              </div>

                              <div class="form-floating">
                              
     
                              <select class={` ${SignUpStyle.position} form-control mb-3`} aria-label="Default select example" ref = {position} id="position">
                              <option selected></option>
                              <option value="Faculty">Faculty</option>
                                <option value="Area Chair">Area Chair</option>
                               
                                 </select>
                                 <label for="Position"><span class="align-text-top">Position</span> </label>
                              </div>

                              <div class="form-floating">
                                 <input type="text"
                                       name='employeeid'
                                       placeholder='Jheremie Campillanes' 
                                       required
                                       ref={employeeidRef}
                                       class={` ${SignUpStyle.employeeid} form-control mb-3`}/>
                                 <label for="Name">Employee ID:</label>
                              </div>
                            

                              <div class="form-floating mb-3" id="email">
                                 <input type="text"
                                        name='email'
                                        placeholder='info@bulsu.edu.ph' 
                                         required
                                         ref={emailRef} class={` ${SignUpStyle.email} form-control`} />
                                 <label for="Email">Email</label>
                              </div>

                              <div class="form-floating mb-3" id="password">
                                 <span class="password-show-toggle js-password-show-toggle"><span class="uil"></span></span>
                                 <input type="password"
                                         name='password'
                                         placeholder='Password'
                                         required
                                         ref={passwordRef} class={` ${SignUpStyle.password} form-control mb-3`} />
                                 <label for="Password">Password</label>
                              </div>
                              
                              <div class="form-floating" id="password-confirm">
                                 <span class="password-show-toggle js-password-show-toggle"><span class="uil"></span></span>
                                 <input type="password"
                                       name='confirm-password'
                                       placeholder='Re-type Password'
                                       required
                                 ref={passwordConfirmRef} class={` ${SignUpStyle.confirmpassword} form-control mb-3`} />
                                 <label for="Confirm password">Confirm Password</label>
                              </div>

                              
                                 <button type="submit"  id="signUp" class={`${SignUpStyle.signUp} btn btn-dark w-50`}>Sign Up</button>
                              
                              
            </form>



            </div>

          
            

    


          </div>
         
          </div>
        </section>


        


        

 
   </body>
    )

}

export default Intro