import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../../firebase/AuthContext"
import { onValue, ref } from 'firebase/database'
import { database, storage } from "../../firebase/firebase";
import { HiIdentification } from 'react-icons/hi'
import { MdEmail, MdEdit, MdSupervisorAccount } from 'react-icons/md'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import ProfileStyle from "../styles/syllabusStyle.module.css";

export function Profile() {

	const nav = useNavigate()

	const { currentUser } = useAuth()
	const [user, setUser] = useState({})

	useEffect(() => {

		const getUserData = onValue(ref(database, `users/${currentUser.uid}`), snapshot => {
			if (snapshot.exists()) {
				setUser(snapshot.val())
				getDownloadURL(storageRef(storage, `avatars/${currentUser.uid}/${snapshot.val().photoUrl}`))
					.then((url) => {
						const avatar = document.getElementById(`user-profile-avatar`)
						avatar.setAttribute('src', url)
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
                  <li id={ProfileStyle.dashboardbtn}><a href="#" id={ProfileStyle.dashboard_link}>
                      <Link to="/Faculty/DashBoard">
                      <i class="bi bi-house-door" id={ProfileStyle.dashboard_btnicon}></i>
                      <span class={ProfileStyle.link_name} id={ProfileStyle.dashboard_btn}>Dashboard</span>
                      </Link>
                     </a>
                  </li>
  
                  <li>
                 <a href="#">
                 <Link to="/Faculty/Posts" >
                  <i class="bi bi-file-arrow-up"></i>
                  <span class={ProfileStyle.link_name}>Syllabus</span>
                 </Link>
                 </a>
                 </li>
        

                  <li><a href="#">
                      <i class="bi bi-chat-left-dots"></i>
                      <span class={ProfileStyle.link_name}>Comment</span>
                     </a>
                  </li>
  
                  <li><a href="#">
                      <Link to="/Faculty/Archives">
                      <i class="bi bi-archive"></i>
                      <span class={ProfileStyle.link_name}>Archives</span>
                      </Link>
                     </a>
                  </li>

                  <li><a href="#">
                      <Link to="/Faculty/Profile">
                      <i class="bi bi-archive"></i>
                      <span class={ProfileStyle.link_name}>Profile</span>
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
                      <span class={ProfileStyle.link_name}>Logout</span>
                     </a>
                  </li>
  
                  <li class={ProfileStyle.mode}><a href="#">
                      <i class="bi bi-moon"></i>
                      <span class={ProfileStyle.link_name}>Dark Mode</span>
                     </a>
  
                     <div class={ProfileStyle.mode_toggle}>
                      <span class={ProfileStyle.switch} ></span>
                     </div>
                     
                  </li>
  
              </ul>
          </div>
      </nav>


	  <section class={ProfileStyle.dashboard}>
	  <div class={ProfileStyle.top}>
              <div class="container d-sm-flex" id ={ProfileStyle.top}>
      
              <i class={`${ProfileStyle.sidebar_toggle} bi bi-list `}></i>
  
              <div class={ProfileStyle.search_box}>
                  <i class="bi bi-search"></i>
                  <input type="text" placeholder="Search Here..."/>
              </div>
  
              <img src="../images/ayaka.jpg" alt="" id={ProfileStyle.profile}/>
              </div>
          </div>
  
         

         

		<div className='w-full h-auto px-10 py-5 pt-5 flex items-center justify-center'>
			<div className='w-[80%] h-auto min-h-[600px] bg-white border border-zinc-200 rounded-md shadow-sm flex flex-col'>
				<main className='flex-1 w-full p-5 flex flex-col items-center text-zinc-700'>

					<div class={`${ProfileStyle.profilecontainer} d-sm-flex`}>
					<div className=' w-32 h-32'>
						<img
							id={`user-profile-avatar`}
							src="../images/defaultdp.png"
							className={` ${ProfileStyle.profileimg} w-full h-full bg-zinc-400  rounded-[100%] object-cover`} />
					</div>


					<div class = "align-items-center">
						<h2 className='text-2xl font-semibold'>{user.name}</h2>
						<span className='text-sm font-medium'>{user.userType ? caps(user.userType) : ''}</span>
						</div>
					
					</div>
					
				</main>
				<footer className='h-12 border-t border-zinc-200 flex justify-end'>
					<button
						onClick={(e) => {
							e.preventDefault()
							nav('/Faculty/Profile/edit-profile')
						}}
						className='h-fit w-fit text-sm font-normal text-white bg-sky-600 py-2 px-4
                        hover:bg-sky-700 border border-transparent rounded-md '>
						Edit Profile
					</button>
				</footer>
			</div>
		</div>
		</section>
		</body>
	)
}