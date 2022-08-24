import React, { useEffect, useRef, useState } from 'react';
import {BrowserRouter as Router, Routes,Route, Link, useNavigate } from 'react-router-dom';
import FacultyDashbaord from '../AreaChair/styles/facultydashboard.module.css'
import { useAuth } from '../firebase/AuthContext'
import { set, onValue, ref } from "firebase/database";
import { auth , database, storage } from '../firebase/firebase' 
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import Swal from 'sweetalert2';
import  ReactToPrint  from 'react-to-print';


// import './Faculty/script'
// import UserDashboard from '../styles/userDashboardStyle.module.css'



const UserDashboard=()=>{


  function toggleBurger(e){
    let body = document.querySelector("body")
    let sidebar = body.querySelector("nav");
    // e.event.targer.class.toggle(FacultyDashbaord.close)
    sidebar.classList.toggle(FacultyDashbaord.close);
    // if(sidebar.classList.contains("close")){
    //     localStorage.setItem("status", "close");
    // }
    // else{
    //     localStorage.setItem("status", "open");
    // }
}

function modeToggle(e){
  let body = document.querySelector("body")

  body.classList.toggle(FacultyDashbaord.dark);
  
  

}

  useEffect(() => {
  
    const getUserData = onValue(ref(database, `users/${currentUser.uid}`), snapshot => {
      if (snapshot.exists()) {
        setUser(snapshot.val())
        getDownloadURL(storageRef(storage, `avatars/${currentUser.uid}/${snapshot.val().photoUrl}`))
          .then((url) => {
            const avatar = document.getElementById(`user-profile-avatar`)
            avatar.setAttribute('src', url)
            const avatardp = document.getElementById(`user-profile-dp`)
            avatardp.setAttribute('src', url)
          }).catch((err) => {
            console.log(err.message)
          })
          onValue(ref(database, "posts"), (snapshot) => {
            if (snapshot.exists() && snapshot.length !== 0) {
              setData(Object.values(snapshot.val()));
            }
          });


          // onValue(ref(database, "posts"), (snapshot) => {
          //   if (snapshot.exists() && snapshot.length !== 0) {
          //     setData(Object.values(snapshot.val()));
          //   }
          // });

      } else {
        return setUser('No data available')
      }
    })
    return getUserData
  }, [])

    let componentRef = useRef(null) 
    const [error, setError] = useState('')
    const [user, setUser] = useState({})
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()
    const [data, setData] = useState({})
  
    
  
    async function handleLogout() { 
      setError('')
  
      try{
        Swal.fire({

          title: 'Are you sure you want to Logout?',

          icon: 'warning',

          showCancelButton: true,

          confirmButtonColor: '#3085d6',

          cancelButtonColor: '#d33',

          confirmButtonText: 'Yes'

        }).then((result) => {

          if (result.isConfirmed) {  

            Swal.fire(

              'Logout!',

              'Account Logout.',

              'success'

            )

            logout()

            navigate('/Login')

          }

        })
      } catch {
        setError('Failed to log out')
      }
    }

    

  



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
                  <li id={FacultyDashbaord.dashboardbtn}><a href="#" id={FacultyDashbaord.dashboard_link}>
                      <Link to="/AreaChair/DashBoard">
                      <i class="bi bi-house-door" id={FacultyDashbaord.dashboard_btnicon}></i>
                      <span class={FacultyDashbaord.link_name} id={FacultyDashbaord.dashboard_btn}>Dashboard</span>
                      </Link>
                     </a>
                  </li>
  
                  <li><a href="#">
                      <Link to="/AreaChair/Posts">
                      <i class="bi bi-file-arrow-up"></i>
                      <span class={FacultyDashbaord.link_name}>Syllabi</span>
                      </Link>
                     </a>
                  </li>

{/* 
                  <li><a href="#">
                      <Link to="/Admin/AreaChairs">
                      <i class="bi bi-person-workspace"></i>
                      <span class={FacultyDashbaord.link_name}>Area Chairs</span>
                      </Link>
                     </a>
                  </li> */}

                  <li><a href="#">
                      <Link to="/AreaChair/Faculties">
                      <i class="bi bi-person-badge"></i>
                      <span class={FacultyDashbaord.link_name}>Faculties</span>
                      </Link>
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
                      <span class={FacultyDashbaord.link_name} onClick={handleLogout}>Logout</span>
                     </a>
                  </li>
  
                  <li class={FacultyDashbaord.mode} ><a href="#">
                      <i class="bi bi-moon" ></i>
                      <span class={FacultyDashbaord.link_name}>Dark Mode</span>
                     </a>
  
                     <div class={FacultyDashbaord.mode_toggle} onClick = {modeToggle}>
                      <span class={FacultyDashbaord.switch}></span>
                     </div>
                     
                  </li>
  
              </ul>
          </div>
      </nav>
  
      <section class={FacultyDashbaord.dashboard}>
          <div class={FacultyDashbaord.top}>
            
      
              <i class={`${FacultyDashbaord.sidebar_toggle} bi bi-list `} onClick={toggleBurger}></i>
  
              {/* <div class={FacultyDashbaord.search_box}>
                  <i class="bi bi-search"></i>
                  <input type="text" placeholder="Search Here..."/>
              </div> */}
                      <div class={`${FacultyDashbaord.mainSearch} input-group w-50 h-100`}>
                      <input type="text" class="form-control" placeholder="Seach here.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                      <button class={`${FacultyDashbaord.searchButton} btn btn-outline-secondary`} type="button" id="button-addon2"><i class="bi bi-search text-light"></i></button>
                      </div>              
  
              
              <img id = {`user-profile-avatar`} src="../images/ayaka.jpg" alt="" class={FacultyDashbaord.profile}/>
          </div>
  
          <div class={FacultyDashbaord.dash_content}>
              <div class={FacultyDashbaord.overview}>
                  <div class={FacultyDashbaord.title}>
                      <i class="bi bi-speedometer2"></i>
                      <span class={FacultyDashbaord.text}>Dashboard</span>
                  </div>
              </div>
  
             
              
          </div>

          {/* Welcome back */}

          <div class={`${FacultyDashbaord.welcome_back} `}>
              <div class="container d-sm-flex" id={FacultyDashbaord.welcome_container}>
                  <img class = {FacultyDashbaord.welcome_icon} src='../images/welcomeicon.png' alt='' id={FacultyDashbaord.icon}/>
                  <div class={FacultyDashbaord.message}>

                  <h3>Welcome Back {user.name}</h3>
                  <p>Explore the adaptive syllabus management that can empower the Users to view results and track progress over time from all their courses in one interactive area.</p>



              </div>                 
              </div>
              

          </div>

          {/* registered faculties and area chair */}


          {/* Syllabus List */}
        

        <div class={FacultyDashbaord.syllabus_list}>
            <div class="container">

                <div class={`${FacultyDashbaord.topoflist} align-items-center d-sm-flex justify-content-between md`}>

                    <div>
                        <h4>Syllabus</h4>
                    </div>

                    <div class={FacultyDashbaord.search_syllabus_container}>

                    {/* <div class={FacultyDashbaord.search_syllabus}>
                    <i class="bi bi-search" id={FacultyDashbaord.search_top_icon}></i>
                    <input type="text" placeholder="Search Here..."/>
                    </div> */}

                    {/* <button class="btn btn-lg m-3" id={FacultyDashbaord.upload_image}>Upload Image</button> */}
                    <div class="input-group mb-3 w-50">
                    <input type="text" class="form-control" placeholder="Seach here.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <button class={`${FacultyDashbaord.searchButton} btn btn-outline-secondary`} type="button" id="button-addon2"><i class="bi bi-search text-light"></i></button>
                    </div>            

                    </div>

                </div>
                <ReactToPrint
  trigger={()=>{
   
    return (
      <button class = "btn btn-dark">Print</button>
    )

  }}
    content = {()=> componentRef}
    documentTitle = "Syllabus List"
    pageStyle = "print"
  
  ></ReactToPrint>
                <div class = {FacultyDashbaord.syllabusListContainer}>
                <table class="table text-secondary"  ref = {el =>(componentRef=el)}>
                       <thead class = {FacultyDashbaord.tableheader}>
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">File</th>
                            <th scope="col">Faculty</th>
                            <th scope="col">Date Uploaded</th>
                          </tr>
                       </thead>
              <tbody>
              {Object.keys(data).map((id, index) =>{
                if(data[id].postStatus =="Approved"){
                return (

          

               <tr key={id}>
               <td>{data[id].postTitle}</td>
               <td>{data[id].postFile}</td>
               <td>{data[id].postAuthor}</td>
               <td>{data[id].postDate}</td>
                 
              {/* <td>Female</td>
              <td>lorem</td>
               <td>Area Chair</td> */}
        
               
            </tr>
                
                )
            }})}
                </tbody>
                 </table>
                 </div>

            </div>
        </div>
      </section>
  
      <script src = "script.js">
          
      </script>
  
      
      
  </body>
  

    
    
    

 

    

    
    )
}



export default UserDashboard;

