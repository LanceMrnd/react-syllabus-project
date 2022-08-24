import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes,Route, Link, useNavigate } from 'react-router-dom';
import FacultyDashbaord from '../Admin/styles/admindashboard.module.css'
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
                      <Link to="/Admin/DashBoard">
                      <i class="bi bi-house-door"></i>
                      <span class={FacultyDashbaord.link_name} >Dashboard</span>
                      </Link>
                     </a>
                  </li>
  
                  <li><a href="#">
                      <i class="bi bi-file-arrow-up"></i>
                      <span class={FacultyDashbaord.link_name}>Contents</span>
                     </a>
                  </li>


                  <li><a href="#">
                      <Link to="/Admin/AreaChairs" id={FacultyDashbaord.areachair_link}>
                      <i class="bi bi-person-workspace" id={FacultyDashbaord.areachair_btnicon}></i>
                      <span class={FacultyDashbaord.link_name} id={FacultyDashbaord.areachair_btn}>Area Chairs</span>
                      </Link>
                     </a>
                  </li>

                  <li><a href="#" id={FacultyDashbaord.areachair_link}>
                      <Link to="/Admin/Faculties">
                      <i class="bi bi-person-badge"></i>
                      <span class={FacultyDashbaord.link_name}>Faculties</span>
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
              <div class="container d-sm-flex" id ={FacultyDashbaord.top}>
      
              <i class={`${FacultyDashbaord.sidebar_toggle} bi bi-list `}></i>
  
              {/* <div class={FacultyDashbaord.search_box}>
                  <i class="bi bi-search"></i>
                  <input type="text" placeholder="Search Here..."/>
              </div> */}
                      <div class={`${FacultyDashbaord.mainSearch} input-group w-50 h-100`}>
                      <input type="text" class="form-control" placeholder="Seach here.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                      <button class={`${FacultyDashbaord.searchButton} btn btn-outline-secondary`} type="button" id="button-addon2"><i class="bi bi-search text-light"></i></button>
                      </div>              
  
              <img src="../images/ayaka.jpg" alt="" id={FacultyDashbaord.profile}/>
              </div>
          </div>
  
          <div class={FacultyDashbaord.dash_content}>
              <div class={FacultyDashbaord.overview}>
                  <div class={FacultyDashbaord.title}>
                      <i class="bi bi-person-badge"></i>
                      <span class={FacultyDashbaord.text}>Area Chairs</span>
                  </div>
              </div>
  
             
              
          </div>

        

          {/* approve faculties */}

          <div class={FacultyDashbaord.registered_container}>


          <div class="container">

    <div class={`${FacultyDashbaord.topoflist} align-items-center d-sm-flex justify-content-between md`}>

    <div>
        <h4>Area Chairs</h4>
    </div>

    <div class={FacultyDashbaord.search_registerelist_container}>

    {/* <div class={FacultyDashbaord.search_register}>
    <i class="bi bi-search" id={FacultyDashbaord.search_registertop_icon}></i>
    <input type="text" placeholder="Search Here..."/>
    </div> */}
        <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Seach here.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
        <button class={`${FacultyDashbaord.searchButton} btn btn-outline-secondary`} type="button" id="button-addon2"><i class="bi bi-search text-light"></i></button>
        </div>
    {/* <button class="btn btn-lg m-3" id={FacultyDashbaord.upload_image}>Upload Image</button> */}

    </div>

</div>

<table class="table text-secondary">
       <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Middle Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Email Address</th>
            <th scope="col">Position</th>
            
          </tr>
        </thead>
          <tbody>
              <tr>
                <td>Roanne Faye</td>
                <td>lorem</td>
                <td>Verginiza</td>
                <td>Female</td>
                <td>lorem</td>
                 <td>Area Chair</td>
                 <td>
                  <btn class = "btn btn-danger">Remove</btn>
                  </td>
                 
              </tr>
              <tr>
                <td>Jerwin</td>
                 <td>lorem</td>
                 <td>Del Rosario</td>
                 <td>Male</td>
                 <td>lorem</td>
                 <td>Faculty</td>
                 <td>
                  <btn class = "btn btn-danger">Remove</btn>
                  </td>
               
                  </tr>
                  <tr>
                  <td>Christian Lance</td>
                  <td>lorem</td>
                  <td>Miranda</td>
                  <td>Male</td>
                  <td>lorem</td>
                  <td>FAculty</td>
                  <td>
                  <btn class = "btn btn-danger">Remove</btn>
                  </td>
                 
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

