import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../../firebase/AuthContext"
import { onValue, ref } from 'firebase/database'
import { database, storage } from "../../firebase/firebase";
import { HiIdentification } from 'react-icons/hi'
import { MdEmail, MdEdit, MdSupervisorAccount } from 'react-icons/md'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import ProfileStyle from "../styles/facultydashboard.module.css";
import Swal from 'sweetalert2';


export function AreaChairProfile() {

	const nav = useNavigate()

	const { currentUser, logout } = useAuth()
	const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const navigate = useNavigate()
    

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

	function caps(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

    function toggleBurger(e){
        let body = document.querySelector("body")
        let sidebar = body.querySelector("nav");
        // e.event.targer.class.toggle(FacultyDashbaord.close)
        sidebar.classList.toggle(ProfileStyle.close);
        // if(sidebar.classList.contains("close")){
        //     localStorage.setItem("status", "close");
        // }
        // else{
        //     localStorage.setItem("status", "open");
        // }
    }
    
    function modeToggle(e){
      let body = document.querySelector("body")
    
      body.classList.toggle(ProfileStyle.dark);
      
      
    
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
  
              navigate('/Login')
  
            }
  
          })
        } catch {
          setError('Failed to log out')
        }
      }

	return (


		<body>

             
        <nav class={ProfileStyle.nav}>
          <div class={ProfileStyle.logoname} id={ProfileStyle.logoname}>
  
              <div class={ProfileStyle.logoimage} id={ProfileStyle.logo_image}>
                  <img src="../images/logo.png" alt="" className={ProfileStyle.logo}/>
              </div>
              
              <span class={ProfileStyle.logo_name} id={ProfileStyle.logo_name}>SyllabiLab</span>
              
          </div>
  
          <div class={ProfileStyle.menu_items}>
              <ul class={ProfileStyle.nav_links}>
                  <li id={ProfileStyle.dashboardbtn}><a href="#">
                      <Link to="/AreaChair/DashBoard">
                      <i class="bi bi-house-door" ></i>
                      <span class={ProfileStyle.link_name}>Dashboard</span>
                      </Link>
                     </a>
                  </li>
  
                  <li>
                 <a href="#">
                 <Link to="/AreaChair/Posts" >
                  <i class="bi bi-file-arrow-up"></i>
                  <span class={ProfileStyle.link_name}>Syllabi</span>
                 </Link>
                 </a>
                 </li>

                  <li><a href="#">
                      <Link to="/AreaChair/Faculties">
                      <i class="bi bi-person-badge"></i>
                      <span class={ProfileStyle.link_name}>Faculties</span>
                      </Link>
                     </a>
                  </li>
        

               
  

                  <li><a href="#" id={ProfileStyle.dashboard_link}>
                      <Link to="/AreaChair/Profile">
                      <i class="bi bi-person" id={ProfileStyle.dashboard_btnicon}></i>
                      <span class={ProfileStyle.link_name} id={ProfileStyle.dashboard_btn}>Profile</span>
                      </Link>
                     </a>
                  </li>

                   
  
                  {/* <li><a href="#">
                      <i class="bi bi-share"></i>
                      <span class={ProfileStyle.link_name}>Share</span>
                     </a>
                  </li> */}
              </ul>
  
              <ul class={ProfileStyle.logout_mode}>
  
                  <li><a href="#">
                      <i class="bi bi-box-arrow-left"></i>
                      <span class={ProfileStyle.link_name} onClick={handleLogout}>Logout</span>
                     </a>
                  </li>
  
                  <li class={ProfileStyle.mode}><a href="#">
                      <i class="bi bi-moon"></i>
                      <span class={ProfileStyle.link_name} >Dark Mode</span>
                     </a>
  
                     <div class={ProfileStyle.mode_toggle} onClick = {modeToggle}>
                      <span class={ProfileStyle.switch} ></span>
                     </div>
                     
                  </li>
  
              </ul>
          </div>
      </nav>


	  <section class={ProfileStyle.dashboard}>
	  <div class={ProfileStyle.top}>
              
      
              <i class={`${ProfileStyle.sidebar_toggle} bi bi-list `} onClick = {toggleBurger}></i>
  
                      {/* <div class={`${ProfileStyle.mainSearch} input-group w-50 h-100`}>
                      <input type="text" class="form-control" placeholder="Seach here.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                      <button class={`${ProfileStyle.searchButton} btn btn-outline-secondary`} type="button" id="button-addon2"><i class="bi bi-search text-light"></i></button>
                      </div>      */}
  
              <img id = {`user-profile-dp`} src="../images/ayaka.jpg" alt="" class={ProfileStyle.profile}/>
              </div>
         
  
         

         

		<div className='w-full h-auto px-10 py-5 pt-5 flex items-center justify-center'>
			<div className={ProfileStyle.profilemaincontainer}>
				<main className='flex-1 w-full p-5 flex flex-col items-center text-zinc-700'>

					<div class={`${ProfileStyle.profilecontainer} d-sm-flex`}>
					<div className=' w-32 h-32'>
						<img
							id={`user-profile-avatar`}
							src="../images/defaultdp.png"
							className={` ${ProfileStyle.profileimg} w-full h-full bg-zinc-400  rounded-[100%] object-cover`} />
					</div>


					<div class = {`${ProfileStyle.userdetailsprofile} align-items-start px-5 py-2 d-flex flex-column`}>
						            <h1 className='text-2xl font-semibold'>{user.name}</h1>
                        <h5 className='text-2xl font-semibold'>{user.email}</h5>
						            <span className='text-sm font-medium'>{user.userType ? caps(user.userType) : ''}</span>
                        <span className='text-sm font-medium'>{user.employeeId ? caps(user.employeeId) : ''}</span>
						</div>
					
					</div>
					
				</main>
				<footer className='h-12 border-t border-zinc-200 flex justify-end'>
					<button
						onClick={(e) => {
							e.preventDefault()
							nav('/AreaChair/Profile/edit-profile')
						}}
						className={` ${ProfileStyle.editprofilebtn} btn`}>
						Edit Profile
					</button>
				</footer>
			</div>
		</div>
		</section>
		</body>
	)
}