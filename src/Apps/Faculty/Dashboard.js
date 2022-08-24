import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes,Route, Link, useNavigate } from 'react-router-dom';
import FacultyDashbaord from '../Faculty/styles/facultydashboard.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useAuth } from '../firebase/AuthContext'
import { set, onValue, ref, update } from "firebase/database";
import { auth , database, storage } from '../firebase/firebase' 
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
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
    
          } else {
            return setUser('No data available')
          }
        })
        return getUserData
      }, [])
    

    function modeToggle(e){
        let body = document.querySelector("body")

        body.classList.toggle(FacultyDashbaord.dark);
        
        

    }

    const [error, setError] = useState('')
    const [user, setUser] = useState({})
    const [data, setData] = useState({})
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()


    
  
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

        

      <body class={FacultyDashbaord.body}>

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
                      <Link to="/Faculty/DashBoard">
                      <i class="bi bi-house-door" id={FacultyDashbaord.dashboard_btnicon}></i>
                      <span class={FacultyDashbaord.link_name} id={FacultyDashbaord.dashboard_btn}>Dashboard</span>
                      </Link>
                     </a>
                  </li>
  
                  <li>
                 <a href="#">
                 <Link to="/Faculty/Posts" >
                  <i class="bi bi-file-arrow-up"></i>
                  <span class={FacultyDashbaord.link_name}>Syllabi</span>
                 </Link>
                 </a>
                 </li>
        

  
                  <li><a href="#">
                      <Link to="/Faculty/Archives">
                      <i class="bi bi-archive"></i>
                      <span class={FacultyDashbaord.link_name}>Archives</span>
                      </Link>
                     </a>
                  </li>

                  <li><a href="#">
                      <Link to="/Faculty/Profile">
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
  
                  <li class={FacultyDashbaord.mode}><a href="#">
                      <i class="bi bi-moon"></i>
                      <span class={FacultyDashbaord.link_name}>Dark Mode</span>
                     </a>
  
                     <div class={FacultyDashbaord.mode_toggle} onClick={modeToggle}>
                      <span class={FacultyDashbaord.switch}></span>
                     </div>
                     
                  </li>
  
              </ul>
          </div>
      </nav>
  
      <section class={FacultyDashbaord.dashboard}>
          <div class={FacultyDashbaord.top}>
              
      
              <i class={`${FacultyDashbaord.sidebar_toggle} bi bi-list`} onClick={toggleBurger}></i>
  
              {/* <div class={FacultyDashbaord.search_box}>
                  <i class="bi bi-search"></i>
                  <input type="text" placeholder="Search Here..."/>
              </div> */}
                      <div class={`${FacultyDashbaord.mainSearch} input-group w-50 h-100`}>
                      <input type="text" class={`${FacultyDashbaord.searchbar} form-control`} placeholder="Seach here.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
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

          <div class={`${FacultyDashbaord.welcome_back} `}>
              <div class="container d-sm-flex" id={FacultyDashbaord.welcome_container}>
                  <img class = {FacultyDashbaord.welcome_icon} src='../images/welcomeicon.png' alt='' id={FacultyDashbaord.icon}/>
                  <div class={FacultyDashbaord.message}>

                  <h3 class={FacultyDashbaord.greetings}>Welcome {user.name}</h3>
                  <p class={FacultyDashbaord.message}>Explore the adaptive syllabus management that can empower the Users to view results and track progress over time from all their courses in one interactive area.</p>



              </div>                 
              </div>
              

          </div>

          <div class={FacultyDashbaord.syllabus}>
              <div class="container" id={FacultyDashbaord.syllabus_stat}>

                  <div class="d-sm-flex align-items-center justify-content-between md">
                        <h5 class={FacultyDashbaord.tabletitle}>Pending Syllabus</h5>

                        {/* <select class={FacultyDashbaord.sem} aria-label="Default select example">
                        <option selected>First Semester</option>
                        <option value="1">Second Semester</option>
                        <option value="2">Third Semester</option>
                        
                        </select>

                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id={FacultyDashbaord.forchecking}/>
                        <label class={` ${FacultyDashbaord.formchecklabel} form-check-label`} for="forchecking">
                        For Checking
                        </label>
                        </div>

                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id={FacultyDashbaord.forrevision}/>
                        <label class={` ${FacultyDashbaord.formchecklabel} form-check-label`}  for="forrevision">
                        For Review
                        </label>
                        </div> */}
                  </div>


                <div class = {FacultyDashbaord.tablependingsyllabusstatcontainer}>
                  <table class={`${FacultyDashbaord.table} table table-sm`}>
           <thead class = {FacultyDashbaord.tableheader}>
           <tr>
            <th scope="col">Name</th>
            <th scope="col">File</th>
            <th scope="col" >Date Uploaded</th>
            <th scope="col" colSpan={`2`}>Status</th>
            
          </tr>
        </thead>
          <tbody>
          {Object.keys(data).map((id, index) =>{
                if(data[id].uid == user.uid && data[id].postStatus != "Approved" && data[id].location == "active"){
                return (

          

               <tr key={id}>
               <td class={FacultyDashbaord.datas}>{data[id].postTitle}</td>
               <td class={FacultyDashbaord.datas}>{data[id].postFile}</td>
               <td class={FacultyDashbaord.datas}>{data[id].postDate}</td>
               <td class={FacultyDashbaord.datas}>{data[id].postStatus}</td>
               <td class={FacultyDashbaord.datas}><button class = {`btn btn-sm btn-warning text-white`}
               onClick={function changeStatus() {
                update(ref(database, `posts/${data[id].postId}`), { location: "archived" });
                }}>Remove</button></td>
                 
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

              

              <div class="container" id={FacultyDashbaord.upload}>
                <Link to = "/Faculty/Posts/create-post">

                  <div class="upload_file">
                  {/* <form class={FacultyDashbaord.form}> */}
                      <label for="form_input" class={FacultyDashbaord.form_label}>
                      <img class = {FacultyDashbaord.add_icon} src='../images/Add_files.png' alt='' id={FacultyDashbaord.icon}/>
                      <span class={FacultyDashbaord.form_text}>Upload File</span>
                      </label>
                      
                  {/* </form>
                  <button class={`${FacultyDashbaord.uploadbtn} btn`}>Upload</button> */}

               </div>
               </Link>
                  </div>

        </div>
        <div class={FacultyDashbaord.syllabus_list}>
            <div class="container">

                <div class="align-items-center d-sm-flex  md" id={FacultyDashbaord.top_of_list}>

                    <div>
                        <h5 class={FacultyDashbaord.tabletitle}>Approve Syllabus</h5>
                    </div>

                    <div class={FacultyDashbaord.search_syllabus_container}>

                    {/* <div class={FacultyDashbaord.search_syllabus}>
                    <i class="bi bi-search" id={FacultyDashbaord.search_top_icon}></i>
                    <input type="text" placeholder="Search Here..."/>
                    </div> */}

                      <div class={`${FacultyDashbaord.mainSearch} input-group w-50 h-100`}>
                      <input type="text" class={`${FacultyDashbaord.searchbar} form-control`} placeholder="Seach here.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                      <button class={`${FacultyDashbaord.searchButton} btn btn-outline-secondary`} type="button" id="button-addon2"><i class="bi bi-search text-light"></i></button>
                      </div>   

                    </div>

                </div>
                <div class = {FacultyDashbaord.tableapprovesyllabuscontainer}>
                <table class={`${FacultyDashbaord.table} table`}>
                       <thead class = {FacultyDashbaord.tableheader}>
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">File</th>
                            <th scope="col">Date Uploaded</th>
                            
                          </tr>
                       </thead>
              <tbody>
              {Object.keys(data).map((id, index) =>{
                if(data[id].uid == user.uid && data[id].postStatus =="Approved" && data[id].location == "active"){
                return (

          

               <tr key={id}>
               <td>{data[id].postTitle}</td>
               <td>{data[id].postFile}</td>
               <td>{data[id].postDate}</td>
               <td class={FacultyDashbaord.datas}><button class = {`btn btn-sm btn-warning text-white`}
               onClick={function changeStatus() {
                update(ref(database, `posts/${data[id].postId}`), { location: "archived" });
                }}>Remove</button></td>
                 
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

