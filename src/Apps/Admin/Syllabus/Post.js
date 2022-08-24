import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { database, storage } from "../../../Apps/firebase/firebase"
import Navbar from "../../../components/NavbarAreaChair"
import PostStatus from "../../../components/PostStatus"
import SyllabusStyle from "../styles/admindashboard.module.css";
import { useAuth } from '../../firebase/AuthContext'
import { getDownloadURL, ref as storageRef } from 'firebase/storage'



export default function Posts() {
  const nav = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchpost, setSearch] = useState("");
  const [error, setError] = useState('')
  const {currentUser, logout} = useAuth()
  const [user, setUser] = useState({})

  useEffect(() => {
    onValue(ref(database, "posts"), (posts) => {
      if (posts.exists() && posts.length !== 0) {
        setPosts(Object.values(posts.val()));
      }
    });
  }, []);

  function toggleBurger(e){
    let body = document.querySelector("body")
    let sidebar = body.querySelector("nav");
    // e.event.targer.class.toggle(FacultyDashbaord.close)
    sidebar.classList.toggle(SyllabusStyle.close);
    // if(sidebar.classList.contains("close")){
    //     localStorage.setItem("status", "close");
    // }
    // else{
    //     localStorage.setItem("status", "open");
    // }
}

function modeToggle(e){
  let body = document.querySelector("body")

  body.classList.toggle(SyllabusStyle.dark);
  
  

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

        nav ('/Login')

      }

    })
  } catch {
    setError('Failed to log out')
  }
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

    } else {
      return setUser('No data available')
    }
  })
  return getUserData
}, [])

  return (



    <body>

<nav class={SyllabusStyle.nav}>
          <div class={SyllabusStyle.logoname} id={SyllabusStyle.logoname}>
  
              <div class={SyllabusStyle.logoimage} >
                  <img src="../images/logo.png" alt="" className={SyllabusStyle.logo}/>
              </div>
              
              <span class={SyllabusStyle.logo_name} id={SyllabusStyle.logo_name}>SyllabiLab</span>
              
          </div>
  
          <div class={SyllabusStyle.menu_items}>
              <ul class={SyllabusStyle.nav_links}>
              <li id={SyllabusStyle.dashboardbtn}><a href="#" >
                      <Link to="/Admin/DashBoard">
                      <i class="bi bi-house-door"></i>
                      <span class={SyllabusStyle.link_name} >Dashboard</span>
                      </Link>
                     </a>
                  </li>
  
                  <li><a href="#" id={SyllabusStyle.dashboard_link}>
                      <Link to="/Admin/Posts">
                      <i class="bi bi-file-arrow-up"  id={SyllabusStyle.dashboard_btnicon}></i>
                      <span class={SyllabusStyle.link_name} id={SyllabusStyle.dashboard_btn}>Syllabi</span>
                      </Link>
                     </a>
                  </li>


                  <li><a href="#">
                      <Link to="/Admin/AreaChairs">
                      <i class="bi bi-person-workspace"></i>
                      <span class={SyllabusStyle.link_name}>Area Chairs</span>
                      </Link>
                     </a>
                  </li>

                  <li><a href="#">
                      <Link to="/Admin/Faculties">
                      <i class="bi bi-person-badge"></i>
                      <span class={SyllabusStyle.link_name}>Faculties</span>
                      </Link>
                     </a>
                  </li>

                  <li>
                    <a href="#">
                      <Link to="/Admin/Subjects">
                        <i class="bi bi-book"></i>
                        <span class={SyllabusStyle.link_name}>Subjects</span>
                      </Link>
                    </a>
                  </li>

                
         
  
  
                  <li><a href="#">
                      <Link to="/Admin/Archives">
                      <i class="bi bi-archive"></i>
                      <span class={SyllabusStyle.link_name}>Archives</span>
                      </Link>
                     </a>
                  </li>
  
  
                 
  
                  {/* <li><a href="#">
                      <i class="bi bi-share"></i>
                      <span class={SyllabusStyle.link_name}>Share</span>
                     </a>
                  </li> */}
              </ul>
  
              <ul class={SyllabusStyle.logout_mode}>
  
                  <li><a href="#">
                      <i class="bi bi-box-arrow-left"></i>
                      <span class={SyllabusStyle.link_name} onClick = {handleLogout}>Logout</span>
                     </a>
                  </li>
  
                  <li class={SyllabusStyle.mode}><a href="#">
                      <i class="bi bi-moon"></i>
                      <span class={SyllabusStyle.link_name}>Dark Mode</span>
                     </a>
  
                     <div class={SyllabusStyle.mode_toggle} onClick = {modeToggle}>
                      <span class={SyllabusStyle.switch}></span>
                     </div>
                     
                  </li>
  
              </ul>
          </div>
      </nav>

      <section class={SyllabusStyle.dashboard}>


      <div class={SyllabusStyle.top}>
              
      
              <i class={`${SyllabusStyle.sidebar_toggle} bi bi-list `} onClick = {toggleBurger}></i>
  
              {/* <div class={SyllabusStyle.search_box}>
                  <i class="bi bi-search"></i>
                  <input type="text" placeholder="Search Here..."/>
              </div> */}
  
              <img src="../images/ayaka.jpg" id = {`user-profile-avatar`} alt="" class={SyllabusStyle.profile}/>
              
          </div>
  
          <div class={SyllabusStyle.dash_content}>
              <div class={SyllabusStyle.overview}>
                  <div class={SyllabusStyle.title}>
                  <i class="bi bi-file-arrow-up"></i>
                      <span class={SyllabusStyle.text}>Syllabus</span>
                  </div>
              </div>
  
             
              
          </div>
      
  
          <div className="w-full h-auto min-h-[600px]" id = {SyllabusStyle.syllabusbody}>
      <Navbar
        headerTitle={`Posted Syllabus`}
        searchBarOnChange={(e) => setSearch(e.target.value)}
        buttonOnClick={(e) => {
          e.preventDefault();
          nav("/Faculty/Posts/create-post");
        }}
      />
      <div className="w-full  text-lg py-5 px-10 grid grid-cols-3 gap-3" id = {SyllabusStyle.container}>
        {posts &&
          posts
            .sort(
              (a, b) =>
                new Date(b.postDate).getTime() - new Date(a.postDate).getTime()
            )
            .filter((entry) =>
              Object.values(entry).some(
                (val) =>
                  typeof val === "string" &&
                  val.toLowerCase().includes(searchpost.toLowerCase())
              )
            )
            .map((val, key) => {

              if(val.location =="active"){
        
              return (
                <div
                  key={key}
                  className={` ${SyllabusStyle.syllabuscontainer} d-flex flex-row`} 
                ><div class="container py-2">
                  <div className="d-flex flex-row">
                    <Link
                      to={`/Admin/Posts/${val.postId}`}
                      className=""
                    >
                      {val.postTitle}
                    </Link>
                    
                  </div>
                  <div class = "py-1">
                  <span className={SyllabusStyle.dateposted}>{`Posted: ${val.postDate}`}</span>
                  </div>
                  <div className="d-flex flex-row-reverse pt-4 pb-3">
                    <PostStatus
                      textSize={`text-xs`}
                      postStatus={val.postStatus}
                    />
                  </div>
                  </div>
                </div>
              );
            }})}
      </div>
    </div>
    </section>
        
    </body>
  );
}
