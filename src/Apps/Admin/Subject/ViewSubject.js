import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { database } from "../../../Apps/firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../Apps/firebase/AuthContext";
import Modal from "../../../components/Modal";
import LoadingButton from "../../../components/LoadingButton";
import AdminDashboard from "../styles/admindashboard.module.css"

export const ViewSubject = () => {
  const subjectId = useParams();
  const [subject, setSubject] = useState({});
  const { deleteData } = useAuth();
  
  const {currentUser, logout} = useAuth()
  const navigate = useNavigate()
  const nav = useNavigate();
  const [error, setError] = useState();
  let [isOpen, setIsOpen] = useState(false);
  const dialogMessage =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tempus lectus id tortor sodales, ac scelerisque dolor scelerisque. Vestibulum vitae tellus et mauris eleifend imperdiet.";

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
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

  useEffect(() => {
    const getSubject = onValue(
      ref(database, "subject/" + subjectId.id),
      (snapshot) => {
        setSubject(snapshot.val());
      }
    );

    return getSubject;
  }, []);

  function deleteSubject() {
    deleteData('subject/' + subject.subjectId)
        .then(() => {
            alert('Subject deleted!')
            nav('/subjects')
        }).catch(() => {
            alert('failed to delete subject!')
        });
    alert("DELETING SUBJECT");
    closeModal();
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

    <div className="h-auto p-10 flex justify-center">
      <div className="w-[80%] bg-white border border-zinc-200 rounded-md">
        <main className="h-auto min-h-[500px] flex flex-col p-5">
          <h1 className="text-5xl text-zinc-700 text-center ">
            {subject.courseCode}{" "}
          </h1>
          <h2 className="text-md font-medium text-center text-zinc-600 ">
            {subject.subjectTitle}{" "}
          </h2>
          <h2 className="text-md font-medium text-zinc-600 text-center ">
            {`Credit units: ${subject.creditUnits}`}{" "}
          </h2>
          <p className="text-md text-zinc-700 mt-4 border-red-600 flex-1 text-justify px-10">
            {subject.subjectDescription}
          </p>
          <Modal
            dialogTitle={`Delete subject?`}
            dialogMessage={dialogMessage}
            handleClose={closeModal}
            buttonTitle={`Delete`}
            dedicatedFunction={deleteSubject}
            isOpen={isOpen}
          />
        </main>
        <footer className="h-14 flex items-center justify-end px-10">
          <LoadingButton
            btnColor={`bg-red-600 hover:bg-red-700`}
            dedicatedFunc={openModal}
            title={`Delete`}
          />

          <LoadingButton
            dedicatedFunc={(e) => {
              e.preventDefault();
              nav("/Admin/Subjects/" + subject.subjectId + "/EditSubject");
            }}
            title={`Edit subject`}
          />
        </footer>
      </div>
    </div>
    </section>
    </body>
  );
};
