import React, { useState, useEffect, useRef } from 'react'
import { push, child, ref, update, get, onValue } from 'firebase/database'
import { database, storage } from "../../firebase/firebase";
import { useAuth } from "../../firebase/AuthContext"
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faCheckCircle, faChevronLeft, faSave } from '@fortawesome/free-solid-svg-icons'
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import ProfileStyle from "../styles/facultydashboard.module.css";
import Swal from 'sweetalert2';
import Profile from "../Syllabus/images/ayaka.jpg"
import Logo from "../Syllabus/images/logo.png"


export function AreaChairProfileEdit() {
    const { currentUser, writeData, uploadFile, logout } = useAuth()
    const nav = useNavigate()
    const [avatar, setAvatar] = useState()
    const [preview, setPreview] = useState()
    const [err, setErr] = useState()
    const [currentData, setCurrentData] = useState({})
    const [error, setError] = useState('')
    const [user, setUser] = useState({})
    


    const nameRef = useRef()
    const emailRef = useRef()
    const empIdRef = useRef()
    const photoUrlRef = useRef()
    const deptRef = useRef()

    const inputClass = 'border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300'

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
  
              nav('/Login')
  
            }
  
          })
        } catch {
          setError('Failed to log out')
        }
      }

    useEffect(() => {

        const getCurrent = onValue(ref(database, 'users/' + currentUser.uid), snapshot => {
            if (snapshot.exists()) {
                setCurrentData(snapshot.val())
            } else {
                setErr('User not found')
            }
        })

        return getCurrent
    }, [])

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

    useEffect(() => {
        if (avatar) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(avatar)
        } else {

        }
    }, [avatar])


    const ChangeProfileFields = [
        {
            name: 'employee-id',
            label: 'Employee ID',
            placeholder: 'HIS00AA3125',
            type: 'text',
            required: true,
            initialValue: currentData.employeeId,
            ref: empIdRef
        },
        {
            name: 'name',
            label: 'Name',
            placeholder: 'John Smith',
            type: 'text',
            required: true,
            initialValue: currentData.name,
            ref: nameRef
        },
        {
            name: 'email',
            label: 'Email Address',
            placeholder: 'johnsmith@bulsu.edu.ph',
            type: 'text',
            required: true,
            initialValue: currentData.email,
            ref: emailRef
        },

        {
            name: 'department',
            label: 'Department',
            placeholder: '',
            type: 'select',
            required: true,
            initialValue: currentData.department,
            ref: ''
        },
    ]

    const departmentOptions = [
        {
            value: '',
            title: 'Select Department',
        },
        {
            value: 'Business Analytics',
            title: 'Business Analytics',
        },
        {
            value: 'Service Management',
            title: 'Service Management',
        },
        {
            value: 'Web and Mobile Application Development',
            title: 'Web and Mobile Application Development',
        },
    ]


    const SaveChanges = (e) => {
        e.preventDefault()
        const updateProfile = {
            photoUrl: avatar ? avatar.name : '',
            uid: currentData.uid,
            employeeId: empIdRef.current.value,
            name: nameRef.current.value,
            email: emailRef.current.value,
            userType: currentData.userType,
            department: deptRef.current.value,
            access: "accepted",
        }

        writeData('users/', updateProfile, updateProfile.uid)
            .then(() => {
                uploadFile(avatar, `avatars/${currentData.uid}/${avatar.name}`)
                    .then(() => {
                        nav('/AreaChair/Profile')
                    }).catch((err) => {
                        setErr(err.message)
                    });
            }).catch((err) => {
                setErr(err.message)
            });

            Swal.fire(
        
                'Profile Updated!',
    
                'success'
                
    
              )
    
              
              nav("/AreaChair/Profile");


    }

    return (

        <body>

             
        <nav class={ProfileStyle.nav}>
          <div class={ProfileStyle.logoname} id={ProfileStyle.logoname}>
  
              <div class={ProfileStyle.logoimage} id={ProfileStyle.logo_image}>
                  <img src={Logo} alt="" className={ProfileStyle.logo}/>
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
  
              <img id = {`user-profile-dp`} src={Profile} alt="" class={ProfileStyle.profile}/>
              </div>

      
        <div className={` ${ProfileStyle.profilemaincontainer} align-items-center`}>
            <div className='align-items-center'>
                <header className='h-16 border-b border-zinc-200 flex items-center px-10'>
                    <span className='text-2xl text-zinc-700 font-medium'>{`Edit profile`} </span>

                </header>
                <div className='h-auto d-sm-flex flex-column align-items-center'>
                    <form
                        onSubmit={SaveChanges}
                        spellCheck={`false`}
                        id='edit-profile-form'
                        name='edit-profile-form'
                        className='h-auto min-h-[400px] w-full px-10 border-zinc-600'>

                        <div className='h-auto d-sm-flex flex-column align-items-center'>

                            <div
                                className={`${ProfileStyle.profilephotocontainer} align-items-center d-sm-flex flex-column`}
                                htmlFor='photo-url'>
                                     <img
                                    className={ `${ProfileStyle.editprofileimg}`}
                                    src={preview} id={`user-profile-avatar`} />
                              
                                    <div class = {ProfileStyle.uplaodbtncontainer}>
                               {/* <span className={ProfileStyle.changeprofilebtn}> */}
                               <div class = {ProfileStyle.uploadround}>
                                   
                                <input
                                    onChange={(e) => {
                                        const file = e.target.files[0]
                                        if (file) {
                                            setAvatar(file)
                                        } else {
                                            setAvatar(null)
                                        }
                                    }}
                                    ref={photoUrlRef}
                                    form={`edit-profile-form`}
                                    id={`photo-url`}
                                    type={`file`}
                                    accept={`image/*`}
                                    className={` ${ProfileStyle.choosephoto}`} />
                               
                               
                                <i class={` ${ProfileStyle.cam} bi bi-camera`}></i>
                                   
                                {/* </span> */}
                                </div>
                                </div>
                                
                            </div>
                            <span
                                
                                className='' >Profile photo</span>

                        </div>
                        {ChangeProfileFields && ChangeProfileFields.map((val, key) => {
                            return (
                                <label
                                    key={key}
                                    htmlFor={val.name}
                                    className={`${val.type !== 'hidden' ?  'py-2 d-sm-flex flex-column' : ''}
                                    ${ProfileStyle.editlabel}  flex flex-row`}>
                                    <span className='w-1/6 text-sm text-zinc-600 font-medium flex items-center'>
                                        {val.label}
                                    </span>
                                    {val.type !== 'select' ?
                                        <input
                                            id={val.name}
                                            ref={val.ref}
                                            required={val.required}
                                            type={val.type}
                                            defaultValue={val.initialValue}
                                            placeholder={val.placeholder}
                                            className={ `${inputClass} ${ProfileStyle.editinput} form-control `} /> :
                                        <select
                                            className={`${inputClass} ${ProfileStyle.editinput} form-control `}
                                            id={val.name}
                                            ref={deptRef}
                                            required={val.required} >
                                            {departmentOptions && departmentOptions.map((val, key) => {
                                                return (
                                                    <option key={key} value={val.value}>
                                                        {val.title}
                                                    </option>
                                                )
                                            })}

                                        </select>}
                                </label>
                            )
                        })}
                    </form>
                </div>
                {/* footer will be the place for the navigations/ buttons */}
                <footer className='h-14 flex items-center justify-end px-10'>
                    <button
                        form='edit-profile-form'
                        type='submit'
                        className={`${ProfileStyle.saveChanges} btn`}>
                        Save changes
                    </button>
                </footer>
            </div>
        </div >
        </section>
        </body>
    )
}