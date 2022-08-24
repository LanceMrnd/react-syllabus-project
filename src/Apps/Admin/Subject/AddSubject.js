import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from '../../../Apps/firebase/AuthContext'
import LoadingButton from '../../../components/LoadingButton'
import AdminDashboard from "../styles/admindashboard.module.css"
import Profile from "../Syllabus/images/ayaka.jpg"
import Logo from "../Syllabus/images/logo.png"
import Swal from 'sweetalert2';


export const AddSubject = () => {
    const [courseCode, setCourseCode] = useState()
    const [subjectTitle, setSubjectTitle] = useState()
    const [creditUnit, setCreditUnit] = useState()
    const [courseDescription, setCourseDescription] = useState()
    const [loadingState, setState] = useState(false)
    const { writeData } = useAuth()
    const navigate = useNavigate();
   
    const [error, setError] = useState('')
    const [user, setUser] = useState({})
    const {currentUser, logout} = useAuth()
    const inputClass = 'border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300'

    const AddSubjectData = [
        {
            name: 'course-code',
            label: 'Course code',
            type: 'text',
            placeholder: 'IT 101',
            onChange: (e) => setCourseCode(e.target.value),
            required: true,
        },
        {
            name: 'subject-title',
            label: 'Subject title',
            type: 'text',
            placeholder: 'Introduction to computing',
            onChange: (e) => setSubjectTitle(e.target.value),
            required: true,
        },
        {
            name: 'credit-unit',
            label: 'Credit units',
            type: 'number',
            placeholder: '3.0',
            onChange: (e) => setCreditUnit(e.target.value),
            required: true,
        },
        {
            name: 'course-description',
            label: 'Course description',
            type: 'textarea',
            row: 8,
            placeholder: 'Enter your text here...',
            onChange: (e) => setCourseDescription(e.target.value),
            required: true,
        },

    ]


    function addSubject(e) {
        e.preventDefault()
        setState(true)
        const newSubject = {
            subjectId: uuidv4(),
            courseCode: courseCode,
            subjectTitle: subjectTitle,
            creditUnits: creditUnit,
            subjectDescription: courseDescription
        }
        writeData('subject/', newSubject, newSubject.subjectId)
            .then(() => {
                setState(false)
            }).catch(() => {
                alert('Subject failed to add.')
            });

            Swal.fire(

                'Success!',
        
                'Subject Published!',
        
                'success'

                
        
              )

              navigate("Admin/Subjects")

    }

    function toggleBurger(e){
        let body = document.querySelector("body")
        let sidebar = body.querySelector("nav");
        
        // e.event.targer.class.toggle(FacultyDashbaord.close)
        sidebar.classList.toggle(AdminDashboard.close);
        // if(sidebar.classList.contains("close")){
        //     localStorage.setItem("status", "close");
        // }
        // else{
        //     localStorage.setItem("status", "open");
        // }
    }
    
      function modeToggle(e){
        let body = document.querySelector("body")
    
        body.classList.toggle(AdminDashboard.dark);
        
        
    
    }
    
    async function handleLogout() { 
      setError('')
    
      try{
        await logout()
        navigate('/Login')
      } catch {
        setError('Failed to log out')
      }
    }

    return (

        <body>

<nav class={AdminDashboard.nav}>
          <div class={AdminDashboard.logoname} id={AdminDashboard.logoname}>
  
              <div class={AdminDashboard.logoimage} id={AdminDashboard.logo_image}>
                  <img src={Logo} alt="" class={AdminDashboard.logo}/>
              </div>
              
              <span class={AdminDashboard.logo_name} id={AdminDashboard.logo_name}>SyllabiLab</span>
              
          </div>
  
          <div class={AdminDashboard.menu_items}>
              <ul class={AdminDashboard.nav_links}>
              <li id={AdminDashboard.dashboardbtn}><a href="#">
                      <Link to="/Admin/DashBoard">
                      <i class="bi bi-house-door"></i>
                      <span class={AdminDashboard.link_name}>Dashboard</span>
                      </Link>
                     </a>
                  </li>
  
                  <li><a href="#">
                      <Link to="/Admin/Posts">
                      <i class="bi bi-file-arrow-up"></i>
                      <span class={AdminDashboard.link_name}>Syllabi</span>
                      </Link>
                     </a>
                  </li>


                  <li><a href="#">
                      <Link to="/Admin/AreaChairs">
                      <i class="bi bi-person-workspace"></i>
                      <span class={AdminDashboard.link_name}>Area Chairs</span>
                      </Link>
                     </a>
                  </li>

                  <li><a href="#">
                      <Link to="/Admin/Faculties">
                      <i class="bi bi-person-badge"></i>
                      <span class={AdminDashboard.link_name}>Faculties</span>
                      </Link>
                     </a>
                  </li>

                  <li>
                    <a href="#" id={AdminDashboard.dashboard_link}>
                      <Link to="/Admin/Subjects">
                        <i class="bi bi-book" id={AdminDashboard.dashboard_btnicon}></i>
                        <span class={AdminDashboard.link_name} id={AdminDashboard.dashboard_btn}>Subjects</span>
                      </Link>
                    </a>
                  </li>

             

                 
  
  
                  <li><a href="#">
                      <Link to="/Admin/Archives">
                      <i class="bi bi-archive"></i>
                      <span class={AdminDashboard.link_name}>Archives</span>
                      </Link>
                     </a>
                  </li>

                  
  
  
                 
  
                  {/* <li><a href="#">
                      <i class="bi bi-share"></i>
                      <span class={FacultyDashbaord.link_name}>Share</span>
                     </a>
                  </li> */}
              </ul>
  
              <ul class={AdminDashboard.logout_mode}>
  
                  <li><a href="#">
                      <i class="bi bi-box-arrow-left"></i>
                      <span class={AdminDashboard.link_name} onClick={handleLogout}>Logout</span>
                     </a>
                  </li>
  
                  <li class={AdminDashboard.mode}><a href="#">
                      <i class="bi bi-moon"></i>
                      <span class={AdminDashboard.link_name}>Dark Mode</span>
                     </a>
  
                     <div class={AdminDashboard.mode_toggle} onClick = {modeToggle}>
                      <span class={AdminDashboard.switch}></span>
                     </div>
                     
                  </li>
  
              </ul>
          </div>
      </nav>

      <section class={AdminDashboard.dashboard}>

<div class={AdminDashboard.top}>
   

     <i class={`${AdminDashboard.sidebar_toggle} bi bi-list `} onClick = {toggleBurger}></i>

     {/* <div class={AdminDashboard.search_box}>
         <i class="bi bi-search"></i>
         <input type="text" placeholder="Search Here..."/>
     </div> */}
             <div class={`${AdminDashboard.mainSearch} input-group w-50 h-100`}>
             <input type="text" class={`${AdminDashboard.searchbar} form-control`} placeholder="Seach here.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
             <button class={`${AdminDashboard.searchButton} btn btn-outline-secondary`} type="button" id="button-addon2"><i class="bi bi-search text-light"></i></button>
             </div>              

     
     <img src={Profile} alt="" class={AdminDashboard.profile}/>
     
 </div>

 <div class={AdminDashboard.dash_content}>
     <div class={AdminDashboard.overview}>
         <div class={AdminDashboard.title}>
             <i class="bi bi-speedometer2"></i>
             <span class={AdminDashboard.text}>Dashboard</span>
         </div>
     </div>

    
     
 </div>

        <div className={`${AdminDashboard.addsubjectmaincontainer} h-auto`}>
            <div className='h-auto'>
                <header className='h-16 border-b border-zinc-200 flex items-center px-10'>
                    <h3 className={`${AdminDashboard.addsubtitle} mb-5`}>Adding subject</h3>
                </header>
                <main className='h-auto d-sm-flex flex-column justify-content-center'>
                    <form
                        onSubmit={addSubject}
                        id='add-subject-form'
                        name='add-subject-form'
                        spellCheck='false'
                        className=' d-sm-flex flex-column'>
                        {AddSubjectData.map((val, key) =>
                            <label
                                key={key}
                                htmlFor={val.id}
                                className={`${val.type !== 'textarea' ? ' border-b border-zinc-100' : ''}
                                    py-2 w-full h-auto d-sm-flex flex-column align-items-start justify-content-center`} >
                                <span
                                    className='w-1/6 text-sm text-zinc-600 font-medium justify-content-start' >
                                    {val.label}
                                </span>
                                {val.type !== 'textarea' ?
                                    <input
                                        id={val.id}
                                        onChange={val.onChange}
                                        label={val.label}
                                        required={val.required}
                                        type={val.type}
                                        placeholder={val.placeholder}
                                        defaultValue={val.defaultValue}
                                        className={` ${inputClass} ${AdminDashboard.addsubjectinput} form-control w-50`} /> :
                                    <textarea
                                        id={val.id}
                                        onChange={val.onChange}
                                        label={val.label}
                                        required={val.required}
                                        placeholder={val.placeholder}
                                        rows={val.row}
                                        defaultValue={val.defaultValue}
                                        className={`resize-none form-control w-50 ${AdminDashboard.addsubjectinput}  ${inputClass}`} />
                                }
                            </label>
                        )}
                    </form>
                </main>
                <footer className='h-14 flex items-center justify-end px-10'>
                    <LoadingButton
                        form={`add-subject-form`}
                        buttonType='submit'
                        loadingState={loadingState}
                        title={`Add sub`} />
                </footer>
            </div>
        </div>
        </section>
        </body>
    )
}
