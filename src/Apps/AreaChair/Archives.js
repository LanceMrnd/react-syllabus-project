import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes,Route, Link, useNavigate } from 'react-router-dom';
import FacultyDashbaord from '../AreaChair/styles/facultydashboard.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import './Faculty/script'
// import UserDashboard from '../styles/userDashboardStyle.module.css'



const userDashboard=()=>{

    



    return(

        

      <body>

      <nav class={FacultyDashbaord.nav}>
          <div class={FacultyDashbaord.logoname} id={FacultyDashbaord.logoname}>
  
              <div class={FacultyDashbaord.logoimage} id={FacultyDashbaord.logo_image}>
                  <img src="../images/logo.png" alt="" className={FacultyDashbaord.logo}/>
              </div>
              
              <span class={FacultyDashbaord.logo_name} id={FacultyDashbaord.logo_name}>SyllabiLab</span>
              
          </div>
  
          <div class={FacultyDashbaord.menu_items}>
              <ul class={FacultyDashbaord.nav_links}>
                  <li id={FacultyDashbaord.dashboardbtn}><a href="#">
                  <Link to="/AreaChair/DashBoard">
                      <i class="bi bi-house-door"></i>
                      <span class={FacultyDashbaord.link_name}>Dashboard</span>
                      </Link>
                     </a>
                  </li>
  
                  <li><a href="#">
                      <i class="bi bi-file-arrow-up"></i>
                      <span class={FacultyDashbaord.link_name}>Syllabi</span>
                     </a>
                  </li>

                  <li><a href="#">
                      <Link to="/AreaChair/Faculties">
                      <i class="bi bi-person-badge"></i>
                      <span class={FacultyDashbaord.link_name}>Faculties</span>
                      </Link>
                     </a>
                  </li>


                 
  
                  <li><a href="#" id={FacultyDashbaord.archives_link}>
                      <i class="bi bi-archive" id={FacultyDashbaord.archives_btnicon}></i>
                      <span class={FacultyDashbaord.link_name} id={FacultyDashbaord.archives_btn}>Archives</span>
                     </a>
                  </li>
                  

                  
                  <li><a href="#">
                      <Link to="/AreaChair/Profile">
                      <i class="bi bi-person"></i>
                      <span class={FacultyDashbaord.link_name}>Profile</span>
                      </Link>
                     </a>
                  </li>
  
  
                 
  
                  {/* <li><a href="#">
                      <i class="bi bi-share"></i>
                      <span class={FacultyDashbaord.link_name}>Share</span>
                     </a>
                  </li> */}
              </ul>
  
              <ul class={FacultyDashbaord.logout_mode}>
  
                  <li><a href="#">
                      <i class="bi bi-box-arrow-left"></i>
                      <span class={FacultyDashbaord.link_name}>Logout</span>
                     </a>
                  </li>
  
                  <li class={FacultyDashbaord.mode}><a href="#">
                      <i class="bi bi-moon"></i>
                      <span class={FacultyDashbaord.link_name}>Dark Mode</span>
                     </a>
  
                     <div class={FacultyDashbaord.mode_toggle}>
                      <span class={FacultyDashbaord.switch}></span>
                     </div>
                     
                  </li>
  
              </ul>
          </div>
      </nav>
  
      <section class={FacultyDashbaord.dashboard}>
      <div class={FacultyDashbaord.top}>
      
              <i class={'${FacultyDashbaord.sidebar_toggle} bi bi-list '}></i>
  
              <div class={FacultyDashbaord.search_box}>
                  <i class="bi bi-search"></i>
                  <input type="text" placeholder="Search Here..."/>
              </div>
  
              <img src="../images/ayaka.jpg" alt="" class={FacultyDashbaord.profile}/>
              </div>
          
  
          <div class={FacultyDashbaord.dash_content}>
              <div class={FacultyDashbaord.overview}>
                  <div class={FacultyDashbaord.title}>
                      <i class="bi bi-archive"></i>
                      <span class={FacultyDashbaord.text}>Archives</span>
                  </div>
              </div>
  
             
              
          </div>

         

        <div class={FacultyDashbaord.syllabus_list}>
            <div class="container">

                <div class="topoflist align-items-center d-sm-flex justify-content-between md" id={FacultyDashbaord.top_of_list}>

                    <div>
                        <h4>Syllabus</h4>
                    </div>

                    <div class={FacultyDashbaord.search_syllabus_container}>

                    <div class={FacultyDashbaord.search_syllabus}>
                    <i class="bi bi-search" id={FacultyDashbaord.search_top_icon}></i>
                    <input type="text" placeholder="Search Here..."/>
                    </div>

                    <button class="btn btn-lg m-3" id={FacultyDashbaord.upload_image}>Upload Image</button>

                    </div>

                </div>

                <table class="table text-secondary">
                       <thead>
                          <tr>
                            <th scope="col">Date of Upload</th>
                            <th scope="col">Time of Upload</th>
                            <th scope="col">Faculty</th>
                            <th scope="col">Title/Subject</th>
                            <th scope="col">Description</th>
                            <th scope="col">status</th>
                          </tr>
                       </thead>
              <tbody>
               <tr>
                <th scope="row">1</th>
                <td>lorem</td>
                <td>Roanne</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>lorem</td>
                <td>Jerwin</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td colspan="">lorem</td>
                <td>Lance</td>
                <td>lorem</td>
                <td>lorem</td>
                <td>lorem</td>
                </tr>
                </tbody>
                 </table>

            </div>
        </div>
      </section>
  
      <script src = "script.js">
          
      </script>
  
      
      
  </body>
  

    
    
    

 

    

    
    )
}



export default userDashboard;

