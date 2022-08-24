import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from './firebase/AuthContext'
import { Link } from "react-router-dom" 

export default function ForgotPassword() {
  const emailRef = useRef()
  const {resetPassword} = useAuth()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)



  async function handleSubmit(e){
    e.preventDefault()    

    try {
      setMessage('')
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch {
      setError ('Failed to reset pasword')
    }
    setLoading(false)
  }

  return (
    <>
      <section class="">
        <div class="container mt-5 align-items-center shadow-lg p-3 mb-5 bg-white rounded w-50">
        <div class="">
          <h2 className='text-center mb-4'>Password Reset</h2> 
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <div class="form-floating mb-3" id="email">
             
              <input class ="form-control" type="email"  ref={emailRef} placeholder="Enter Email" name="email" required ></input>
              <label for="email">Username/Email Address</label>
              
            </div>
            <div class="form-floating">
            <button class="btn btn-dark form-control" disabled={loading} className='w-100' type='submit'>Reset Password?</button>
            </div>
          </form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
          <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
        </div>
        
        </div>
        
      </section>
      
    </>
  )
}

