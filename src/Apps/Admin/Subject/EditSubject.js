import React, { useEffect, useState, useRef } from "react";
import {Link, useParams, useNavigate } from "react-router-dom";
import LongInput, { LongTextArea } from "../../../components/Inputs/LongInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheckCircle,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { onValue, ref } from "firebase/database";
import { database } from "../../../Apps/firebase/firebase";
import { useAuth, useFirebase } from "../../../Apps/firebase/AuthContext";
import LoadingButton from "../../../components/LoadingButton";
import AdminDashboard from "../styles/admindashboard.module.css"
import Swal from "sweetalert2";


function EditSubject() {
  const id = useParams();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { writeData } = useAuth();
  const [subject, setSubject] = useState({});
  const courseCodeRef = useRef();
  const courseTitleRef = useRef();
  const creditUnitRef = useRef();
  const courseDescriptionRef = useRef();
  const nav = useNavigate();
  const {currentUser, logout} = useAuth()
  const navigate = useNavigate()
  const EditSubjectData = [
    {
      id: "course-code",
      label: "Course code",
      type: "text",
      placeholder: "IT 101",
      required: true,
      defaultValue: subject.courseCode,
      ref: courseCodeRef,
    },
    {
      id: "subject-title",
      label: "Subject title",
      type: "text",
      placeholder: "Introduction to computing",
      required: true,
      defaultValue: subject.subjectTitle,
      ref: courseTitleRef,
    },
    {
      id: "credit-unit",
      label: "Credit units",
      type: "number",
      placeholder: "3.0",
      required: true,
      defaultValue: subject.creditUnits,
      ref: creditUnitRef,
    },

    {
      id: "course-description",
      label: "Course description",
      type: "textarea",
      placeholder: "Enter your text here...",
      required: false,
      row: 8,
      defaultValue: subject.subjectDescription,
      ref: courseDescriptionRef,
    },
  ];


  const inputClass =
    "border border-zinc-300 flex-1 py-3 px-3 outline-none rounded-md text-zinc-700 text-sm ring-2 ring-transparent focus:border-sky-400 focus:ring-sky-300";

  useEffect(() => {
    const getCurrentData = onValue(
      ref(database, "subject/" + id.id),
      (snapshot) => {
        if (snapshot.exists()) {
          setSubject(snapshot.val());
        } else {
          console.log("There is no data");
        }
      }
    );

    return getCurrentData;
  }, []);


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

  function UpdateSubject(e) {
    e.preventDefault();
    setLoading(true);
    const updatedSubject = {
      subjectId: subject.subjectId,
      courseCode: courseCodeRef.current.value,
      subjectTitle: courseTitleRef.current.value,
      creditUnits: creditUnitRef.current.value,
      subjectDescription: courseDescriptionRef.current.value,
    };
    writeData("subject/", updatedSubject, updatedSubject.subjectId)
      .then(() => {
        setLoading(false);
        nav(`/Admin/Subjects/${id.id}`);
      })
      .catch((err) => {
        alert("Failed to update subject");
      });

      Swal.fire({

        title: 'Are you sure you want to save changes?',

        icon: 'warning',

        showCancelButton: true,

        confirmButtonColor: '#3085d6',

        cancelButtonColor: '#d33',

        confirmButtonText: 'Yes'

      }).then((result) => {

        if (result.isConfirmed) {  

          Swal.fire(

            'Profile Updated!',

            'success'

          )

          navigate("/Admin/Subjects");

        }

      })


  }

  return (

    <body>

<nav class={AdminDashboard.nav}>
          <div class={AdminDashboard.logoname} id={AdminDashboard.logoname}>
  
              <div class={AdminDashboard.logoimage} id={AdminDashboard.logo_image}>
                  <img src="../images/logo.png" alt="" class={AdminDashboard.logo}/>
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
  
              
              <img src="../images/ayaka.jpg" alt="" class={AdminDashboard.profile}/>
              
          </div>
  
          <div class={AdminDashboard.dash_content}>
              <div class={AdminDashboard.overview}>
                  <div class={AdminDashboard.title}>
                      <i class="bi bi-speedometer2"></i>
                      <span class={AdminDashboard.text}>Dashboard</span>
                  </div>
              </div>
  
             
              
          </div>

    <div className="h-auto py-5 px-10 flex justify-center">
      <div className="h-auto w-[80%] bg-white shadow-md rounded-md">
        <header className="h-16 border-b border-zinc-200 flex items-center px-10">
          <span className="text-2xl text-zinc-700 font-medium">
            {`Edit subject`}{" "}
          </span>
        </header>
        <main className="h-auto min-h-[500px] px-10 flex flex-col">
          <form
            onSubmit={UpdateSubject}
            id="edit-subject-form"
            name="edit-subject-form"
            spellCheck="false"
            className=" flex-1"
          >
            {EditSubjectData &&
              EditSubjectData.map((val, key) => {
                return (
                  <label
                    key={key}
                    htmlFor={val.id}
                    className={`${
                      val.type !== "textarea" ? " border-b border-zinc-100" : ""
                    }
                                    py-5 w-full h-auto flex flex-row`}
                  >
                    <span className="w-1/6 text-sm text-zinc-600 font-medium flex items-center">
                      {val.label}
                    </span>

                    {val.type !== "textarea" ? (
                      <input
                        id={val.id}
                        ref={val.ref}
                        label={val.label}
                        required={val.required}
                        type={val.type}
                        defaultValue={val.defaultValue}
                        className={inputClass}
                      />
                    ) : (
                      <textarea
                        id={`course-description`}
                        rows={8}
                        type={`text`}
                        placeholder={`Enter your text here`}
                        ref={courseDescriptionRef}
                        required={true}
                        defaultValue={subject.subjectDescription}
                        className={`${inputClass} resize-none`}
                      />
                    )}
                  </label>
                );
              })}
          </form>
        </main>
        <footer className="h-14 flex items-center justify-end px-10">
          <LoadingButton
            form={`edit-subject-form`}
            type={`submit`}
            title={`Save changes`}
            loadingState={loading}
          />
        </footer>
      </div>
    </div>
    </section>
    </body>
  );
}

export default EditSubject;
