import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate, 
} from "react-router-dom";
import FacultyDashbaord from "../Faculty/styles/facultydashboard.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import './Faculty/script'
// import UserDashboard from '../styles/userDashboardStyle.module.css'
import { useAuth } from '../firebase/AuthContext'
import { set, onValue, ref, update } from "firebase/database";
import { auth , database, storage } from '../firebase/firebase' 
import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import Swal from 'sweetalert2';



const UserDashboard = () => {

  const [error, setError] = useState('')
  const [user, setUser] = useState({})
  const [data, setData] = useState({})
  const {currentUser, logout} = useAuth()
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

  return (
    <body>
      <nav class={FacultyDashbaord.nav}>
        <div class={FacultyDashbaord.logoname} id={FacultyDashbaord.logoname}>
          <div
            class={FacultyDashbaord.logoimage}
            id={FacultyDashbaord.logo_image}
          >
            <img
              src="../images/logo.png"
              alt=""
              className={FacultyDashbaord.logo}
            />
          </div>

          <span
            class={FacultyDashbaord.logo_name}
            id={FacultyDashbaord.logo_name}
          >
            SyllabiLab
          </span>
        </div>

        <div class={FacultyDashbaord.menu_items}>
          <ul class={FacultyDashbaord.nav_links}>
            <li id={FacultyDashbaord.dashboardbtn}>
              <a href="#">
                <Link to="/Faculty/DashBoard">
                  <i class="bi bi-house-door"></i>
                  <span class={FacultyDashbaord.link_name}>Dashboard</span>
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
        


            <li>
              <a href="#" id={FacultyDashbaord.archives_link}>
                <i class="bi bi-archive" id={FacultyDashbaord.archives_btnicon}></i>
                <span class={FacultyDashbaord.link_name} id={FacultyDashbaord.archives_btn}>Archives</span>
              </a>
            </li>

            <li>
              <Link to = "/Faculty/Profile">
              <a href="#" >
                <i
                  class="bi bi-person"
                 
                ></i>
                <span
                  class={FacultyDashbaord.link_name}
                  
                >
                  Profile
                </span>
              </a>
              </Link>
            </li>

            {/* <li><a href="#">
                      <i class="bi bi-share"></i>
                      <span class={FacultyDashbaord.link_name}>Share</span>
                      </a>
                  </li> */}
          </ul>

          <ul class={FacultyDashbaord.logout_mode}>
            <li>
              <a href="#">
                <i class="bi bi-box-arrow-left"></i>
                <span class={FacultyDashbaord.link_name}>Logout</span>
              </a>
            </li>

            <li class={FacultyDashbaord.mode}>
              <a href="#">
                <i class="bi bi-moon"></i>
                <span class={FacultyDashbaord.link_name}>Dark Mode</span>
              </a>

              <div class={FacultyDashbaord.mode_toggle}>
                <span class={FacultyDashbaord.switch}></span>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <section class={FacultyDashbaord.dashboard}>
        <div class={FacultyDashbaord.top}>
            <i class={`${FacultyDashbaord.sidebar_toggle} bi bi-list `}></i>

            

            <img
              src="../images/ayaka.jpg"
              alt=""
              class={FacultyDashbaord.profile}
            />
        
        </div>

        <div class={FacultyDashbaord.dash_content}>
          <div class={FacultyDashbaord.overview}>
            <div class={FacultyDashbaord.title}>
              <i class="bi bi-archive"></i>
              <span class={FacultyDashbaord.text}>Archives</span>
            </div>
          </div>
        </div>

        <div class={FacultyDashbaord.syllabus_list}>
          <div class="container">
            <div
              class="topoflist align-items-center d-sm-flex justify-content-between md"
              id={FacultyDashbaord.top_of_list}
            >
              <div>
                <h4>Archived Syllabus</h4>
              </div>

              <div class={FacultyDashbaord.search_syllabus_container}>
             
           
              </div>
            </div>

            <table class="table text-secondary">
              <thead>
                <tr>
                 
                  <th scope="col">Title</th>
                  <th scope="col">File</th>
                  <th scope="col">Date Uploaded</th>
                  <th scope="col" colSpan={`2`}>status</th>
                </tr>
              </thead>
              <tbody>
              {Object.keys(data).map((id, index) =>{
                if(data[id].uid == user.uid && data[id].location == "archived"){
                return (

          

               <tr key={id}>
               <td class={FacultyDashbaord.datas}>{data[id].postTitle}</td>
               <td class={FacultyDashbaord.datas}>{data[id].postFile}</td>
               <td class={FacultyDashbaord.datas}>{data[id].postDate}</td>
               <td class={FacultyDashbaord.datas}>{data[id].postStatus}</td>
               <td class={FacultyDashbaord.datas}><btn class = {`btn btn-sm btn-warning text-white`}
              onClick={function changeStatus() {
                update(ref(database, `posts/${data[id].postId}`), { location: "active" });
                }}>Retrive</btn></td>
                 
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
      </section>

      <script src="script.js"></script>
    </body>
  );
};

export default UserDashboard;
