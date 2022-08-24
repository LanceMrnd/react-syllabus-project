import React, { useEffect, useState } from 'react'
import { onValue, ref, update} from "firebase/database";
import {BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import FacultyDashbaord from '../Admin/styles/admindashboard.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useAuth } from '../firebase/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
// import database from '@react-native-firebase/database'; 
import { auth,  users, database, storage  } from '../firebase/firebase' 
import Swal from 'sweetalert2';

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
    
            navigate ('/Login')
    
          }
    
        })
      } catch {
        setError('Failed to log out')
      }
    }

    const [data, setData, error, setError] = useState({})
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()
    const {user, setUser} = useNavigate({})

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
  
        } else {
          return setUser('No data available')
        }
      })
      return getUserData
    }, [])


    // useEffect(()=>{

    //     database.ref().child("users").on("value", (snapshot) =>{
    //         if(snapshot.val() !== null){
    //             setData({ ...snapshot.val()});
    //         }else{
    //             setData({});
    //         }
    //     });

    //     return () => {
    //         setData({});
    //     }


    // }, []);

    useEffect(() => {
        onValue(ref(database, "users"), (snapshot) => {
          if (snapshot.exists() && snapshot.length !== 0) {
             
            setData(Object.values(snapshot.val()));
              
          }
        });
      }, []);

    // function User({ userID }){
    //     useEffect(()=>{
    //         const onChildAdd = database().ref('uid')
    //     })
    // }
  


  
    



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
                      <Link to = "/Admin/Posts">
                      <i class="bi bi-file-arrow-up"></i>
                      <span class={FacultyDashbaord.link_name}>Syllabi</span>
                      </Link>
                     </a>
                  </li>


                  <li><a href="#">
                      <Link to="/Admin/AreaChairs">
                      <i class="bi bi-person-workspace"></i>
                      <span class={FacultyDashbaord.link_name}>Area Chairs</span>
                      </Link>
                     </a>
                  </li>

                  <li><a href="#">
                      <Link to="/Admin/Faculties" id={FacultyDashbaord.faculty_link}>
                      <i class="bi bi-person-badge" id={FacultyDashbaord.dashboard_btnicon}></i>
                      <span class={FacultyDashbaord.link_name}  id={FacultyDashbaord.faculty_btn}> Faculties</span>
                      </Link>
                     </a>
                  </li>

                  <li>
                    <a href="#">
                      <Link to="/Admin/Subjects">
                        <i class="bi bi-book"></i>
                        <span class={FacultyDashbaord.link_name}>Subjects</span>
                      </Link>
                    </a>
                  </li>


                  

             
  
                  <li><a href="#">
                      <Link to="/Admin/Archives">
                      <i class="bi bi-archive"></i>
                      <span class={FacultyDashbaord.link_name}>Archives</span>
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
  
                  <li><a href="#" onClick={handleLogout}>
                      <i class="bi bi-box-arrow-left"></i>
                      <span class={FacultyDashbaord.link_name}>Logout</span>
                     </a>
                  </li>
  
                  <li class={FacultyDashbaord.mode}><a href="#">
                      <i class="bi bi-moon"></i>
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
              
      
              <i class={`${FacultyDashbaord.sidebar_toggle} bi bi-list `} onClick = {toggleBurger}></i>
  
              {/* <div class={FacultyDashbaord.search_box}>
                  <i class="bi bi-search"></i>
                  <input type="text" placeholder="Search Here..."/>
              </div> */}
                      <div class={`${FacultyDashbaord.mainSearch} input-group w-50 h-100`}>
                      <input type="text" class="form-control" placeholder="Seach here.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                      <button class={`${FacultyDashbaord.searchButton} btn btn-outline-secondary`} type="button" id="button-addon2"><i class="bi bi-search text-light"></i></button>
                      </div>              
  
              <img src="../images/ayaka.jpg" id = {`user-profile-avatar`}alt="" class={FacultyDashbaord.profile}/>
              </div>
          
  
          <div class={FacultyDashbaord.dash_content}>
              <div class={FacultyDashbaord.overview}>
                  <div class={FacultyDashbaord.title}>
                      <i class="bi bi-person-badge"></i>
                      <span class={FacultyDashbaord.text}>Faculties</span>
                  </div>
              </div>
  
             
              
          </div>

        

          {/* approve faculties */}

          <div class={FacultyDashbaord.facultylisttable}>


          <div class="container">

    <div class={`${FacultyDashbaord.topoflist} align-items-center d-sm-flex justify-content-between md`}>

    <div>
        <h4>Faculties</h4>
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
<div class = {`${FacultyDashbaord.facultytablecontainer} scrollable`}>

<table class={`${FacultyDashbaord.facultytable} table text-secondary h-50`}>
       <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email Address</th>
            <th scope="col">Position</th>
            
          </tr>
        </thead>
          <tbody>
              
              

              {Object.keys(data).map((id, index) =>{
                if(data[id].userType == "Faculty" && data[id].access == "accepted"){
                  return (
                 <tr key={id}>
                
                 <td>{data[id].name}</td>
                 <td>{data[id].email}</td>
                 <td>{data[id].userType}</td>
                     
                   
                {/* <td>Female</td>
                <td>lorem</td>
                 <td>Area Chair</td> */}
                 <td>
                  <btn class = "text-light btn btn-warning" onClick={function changeStatus() {
                 update(ref(database, `users/${data[id].uid}`), { userType: "Area Chair" });
                 }}>Promote</btn>
                  </td>
                  <td>
                  <btn class = "btn btn-danger" onClick={function changeStatus() {
                 update(ref(database, `users/${data[id].uid}`), { access: "archived" });
                 }}>Remove</btn>
                  </td>
                 
              </tr>
                  
                  )
              }})}
          
              {/* <tr>
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
                 
                  </tr> */}
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

