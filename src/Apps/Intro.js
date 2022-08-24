import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'





const Intro =()=> {

    return (

      
        <body>


          <div class="navbar navbar-expand-lg py-3 fixed-top">
          <div class="container">
            
            <a href="#" class="navbar-brand">Syllabus Enhancement System</a>
  
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
            <span class="navbar-toggler-icon"></span>  
            </button>
  
  
            <div class="collapse navbar-collapse" id="navmenu">
              <ul class="navbar-nav ms-auto">
  
                
                <li class="nav-item">
                  <a href="#benefits" class="nav-link">Purposes and Content</a>
                </li>
                <li class="nav-item">
                  <a href="#questions" class="nav-link">About</a>
                </li>
                <li class="nav-item">
                  <Link to = "/Login" class = "nav-link">Login</Link>
                </li>

                <li class="nav-item">
                  <Link to="/Sign-Up" class="nav-link">Sign Up</Link>
                </li>
  
                
              </ul>
  
  
            </div>
          </div>
        </div>


        <section class="p-lg-0 pt-lg-5 text-center text-sm-start">
          <div class="container">

            <div class="d-sm-flex align-items-center justify-content-between">

              <div>

                <h1>Enhance Your <span class="text-warning">
                  Syllabus
                </span></h1>

                <p class="lead my-4">
                  We focus on teaching our students the fundamentals of the latest ang greatest Syllabus to prepare the to enjoy and prepare their studies
                </p>

                <Link to="/Faculty/Dashboard "class="btn btn-dark btn-lg">Get Started</Link>


                </div>
                
                  <img class="img-fluid w-50 d-none d-sm-block"src="images/profandsyllabusclipart.jpg" alt=""/>
                  

            </div>





          </div>
        </section>

        <section id = "benefits"class="p-5">

          <div class="container">

            <div class="row text-center g-4">

              <div class="col-md">

                <div class="shadow-lg p-3 mb-5 bg-white rounded">

                  <div class="card-body text-center">

                    <div class="h1">

                      <i class="bi bi-laptop"></i>

                    </div>

                    <h3 class="card-title mb-3">The syllabus as a contract</h3>

                    <p class="card-text">

                    A syllabus should make the rules for the course clear. It should set forth what is expected to happen during the semester, delineate the responsibilities of students and of the instructor, and describe appropriate procedures and course policies.

                    </p>

                    <a href="#" class="btn btn-primary">Read More</a>

                    

                  </div>

                </div>

              </div>
              <div class="col-md">
                
                <div class="shadow-lg p-3 mb-5 bg-white rounded">

                  <div class="card-body text-center">

                    <div class="h1">

                      <i class="bi bi-person-square"></i>

                    </div>

                    <h3 class="card-title mb-3">The syllabus as a permanent record</h3>

                    <p class="card-text">

                    A syllabus should serve accountability and documentation functions. It should document what was covered in a course, at what level, and for what kind of credit. Such a syllabus contains information useful for evaluation of instructors, courses, and programs, and can thus be useful in course equivalency transfer situations, accreditation procedures, and articulation.

                    </p>

                    <a href="#" class="btn btn-primary">Read More</a>

                    

                  </div>

                </div>

              </div>
              <div class="col-md">

                <div class="shadow-lg p-3 mb-5 bg-white rounded">

                  <div class="card-body text-center">

                    <div class="h1">

                      <i class="bi bi-people"></i>

                    </div>

                    <h3 class="card-title mb-3">The syllabus as a learning tool</h3>

                    <p class="card-text">

                    A syllabus should help students become more effective learners in the course. While many of these items are not required for syllabi at Illinois, adding them can greatly improve students' ability to learn the material.

                    </p>

                    <a href="#" class="btn btn-primary">Read More</a>

                    

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        

 
   </body>
    )

}

export default Intro