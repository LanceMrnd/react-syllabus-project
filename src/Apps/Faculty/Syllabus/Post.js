import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { database, storage } from "../../../Apps/firebase/firebase"
import Navbar from "../../../components/Navbar"
import { useAuth } from '../../firebase/AuthContext'
import PostStatus from "../../../components/PostStatus"
import SyllabusStyle from "../styles/facultydashboard.module.css";
import { getDownloadURL, ref as storageRef } from 'firebase/storage'


export default function Posts() {
  const nav = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [searchpost, setSearch] = useState("");
  const {currentUser, logout} = useAuth()

  useEffect(() => {
    onValue(ref(database, "posts"), (posts) => {
      if (posts.exists() && posts.length !== 0) {
        setPosts(Object.values(posts.val()));
      }
    });
  }, []);

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


  
    const getUserData = onValue(ref(database, `users/${currentUser.uid}`), snapshot => {
      if (snapshot.exists()) {
        setUser(snapshot.val())
      
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
  
              <div class={SyllabusStyle.logoimage} id={SyllabusStyle.logo_image}>
                  <img src="../images/logo.png" alt="" className={SyllabusStyle.logo}/>
              </div>
              
              <span class={SyllabusStyle.logo_name} id={SyllabusStyle.logo_name}>SyllabiLab</span>
              
          </div>
  
          <div class={SyllabusStyle.menu_items}>
              <ul class={SyllabusStyle.nav_links}>
                  <li id={SyllabusStyle.dashboardbtn}><a href="#" >
                      <Link to="/Faculty/DashBoard">
                      <i class="bi bi-house-door"></i>
                      <span class={SyllabusStyle.link_name}>Dashboard</span>
                      </Link>
                     </a>
                  </li>
  
                  <li>
                 <a href="#" id={SyllabusStyle.dashboard_link}>
                 <Link to="/Faculty/Posts" >
                  <i class="bi bi-file-arrow-up" id={SyllabusStyle.dashboard_btnicon}></i>
                  <span class={SyllabusStyle.link_name} id={SyllabusStyle.dashboard_btn}>Syllabi</span>
                 </Link>
                 </a>
                 </li>
        

  
                  <li><a href="#">
                      <Link to="/Faculty/Archives">
                      <i class="bi bi-archive"></i>
                      <span class={SyllabusStyle.link_name}>Archives</span>
                      </Link>
                     </a>
                  </li>

                  <li><a href="#">
                      <Link to="/Faculty/Profile">
                      <i class="bi bi-person"></i>
                      <span class={SyllabusStyle.link_name}>Profile</span>
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
                      <span class={SyllabusStyle.link_name}>Logout</span>
                     </a>
                  </li>
  
                  <li class={SyllabusStyle.mode}><a href="#">
                      <i class="bi bi-moon"></i>
                      <span class={SyllabusStyle.link_name}>Dark Mode</span>
                     </a>
  
                     <div class={SyllabusStyle.mode_toggle}>
                      <span class={SyllabusStyle.switch}></span>
                     </div>
                     
                  </li>
  
              </ul>
          </div>
      </nav>

      <section class={SyllabusStyle.dashboard}>


      <div class={SyllabusStyle.top}>
              
      
              <i class={`${SyllabusStyle.sidebar_toggle} bi bi-list `}></i>
  
              {/* <div class={SyllabusStyle.search_box}>
                  <i class="bi bi-search"></i>
                  <input type="text" placeholder="Search Here..."/>
              </div> */}

                      <div class={`${SyllabusStyle.mainSearch} input-group w-50 h-100`}>
                      <input type="text" class={`${SyllabusStyle.searchbar} form-control`} placeholder="Seach here.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                      <button class={`${SyllabusStyle.searchButton} btn btn-outline-secondary`} type="button" id="button-addon2"><i class="bi bi-search text-light"></i></button>
                      </div>  
  
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
      <main className="w-full text-lg py-5 px-10 grid grid-cols-3 gap-3" id = {SyllabusStyle.container}>
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
              if(val.uid == user.uid && val.location == "active"){
              return (
                <div
                  key={key}
                  className={` ${SyllabusStyle.syllabuscontainer} d-flex flex-row`} 
                ><div class="container py-2">
                  <div className="d-flex flex-row">
                    <Link
                      to={`/Faculty/Posts/${val.postId}`}
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
      </main>
    </div>
    </section>
        
    </body>
  );
}
