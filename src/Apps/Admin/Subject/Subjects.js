import React, { useState, useEffect } from "react";
import { useAuth, useFirebase } from "../../../Apps/firebase/AuthContext";
import { ref, onValue } from "firebase/database";
import { database } from "../../../Apps/firebase/firebase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faAdd, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Node from "../../../components/Node";
import "../../../components/Inputs/LongInput";
import Navbar from "../../../components/Navbar";
import AdminDashboard from "../styles/admindashboard.module.css"

function Subjects() {
  const [visible, setVisible] = useState(false);
  const [courseCode, setCourseCode] = useState();
  const [subjectTitle, setSubjectTitle] = useState();
  const [creditUnit, setCreditUnit] = useState();
  const [courseDescription, setCourseDescription] = useState();
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState([]);
  const nav = useNavigate();
  const [error, setError] = useState('')
  const [user, setUser] = useState({})
  const {currentUser, logout} = useAuth()
  const navigate = useNavigate()
    

  const { writeData } = useAuth();
  const newSubject = {
    subjectId: uuidv4(),
    courseCode: courseCode,
    subjectTitle: subjectTitle,
    creditUnits: creditUnit,
    subjectDescription: courseDescription,
  };

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

  useEffect(() => {
    const getSubjects = onValue(ref(database, "subject"), (snapshot) => {
      setSubject(Object.values(snapshot.val()));
    });

    return getSubjects;
  }, []);

  const AddSubjectData = [
    {
      name: "course-code",
      label: "Course code",
      type: "text",
      placeholder: "IT 101",
      onChange: (e) => setCourseCode(e.target.value),
      required: true,
    },
    {
      name: "subject-title",
      label: "Subject title",
      type: "text",
      placeholder: "Introduction to computing",
      onChange: (e) => setSubjectTitle(e.target.value),
      required: true,
    },
    {
      name: "credit-unit",
      label: "Credit units",
      type: "number",
      placeholder: "3.0",
      onChange: (e) => setCreditUnit(e.target.value),
      required: true,
    },

    {
      name: "course-description",
      label: "Course description",
      type: "text",
      placeholder: "Enter your text here...",
      onChange: (e) => setCourseDescription(e.target.value),
      required: true,
    },
  ];

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
    
    <div className="h-auto">
      <Navbar
        headerTitle={`Subjects`}
        buttonOnClick={() => nav("/Admin/Subjects/AddSubject")}
        searchBarOnChange={(e) => setSearch(e.target.value)}
      />

      <main className="h-auto px-10 py-5 grid grid-cols-12 gap-2 ">
        {subject
          .filter((entry) =>
            Object.values(entry).some(
              (val) =>
                typeof val === "string" &&
                val.toLowerCase().includes(search.toLowerCase())
            )
          )
          .map((val, key) => {
            return (
              <Node
                key={key}
                link={`/Admin/Subjects/${val.subjectId}`}
                title={val.courseCode}
                subTitle={val.subjectTitle}
                icon={faBook}
              />
            );
          })}
      </main>
    </div>
    </section>
    </body>

          


  );
}

export default Subjects;
