import { onValue, ref, set } from "firebase/database";
import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { database, storage } from "../../../Apps/firebase/firebase";
import { useAuth, useFirebase } from "../../../Apps/firebase/AuthContext";
import Comments from "../../../components/CommentSection";
import { v4 as uuidv4 } from "uuid";
import Status from "../../../components/SetStatus";
import { getDownloadURL, ref as StorageRef } from "firebase/storage";
import PostStatus from "../../../components/PostStatus";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import History from "../../../components/HistorySection";
import SyllabusStyle from "../styles/facultydashboard.module.css";
import Profile from "../Syllabus/images/ayaka.jpg"
import Logo from "../Syllabus/images/logo.png"

export default function ViewPost() {
  const postId = useParams();
  const [post, setPost] = useState({});
  const { currentUser } = useAuth();
  const [comment, setComment] = useState();
  const [user, setUser] = useState({});

  const commentRef = useRef();

  useEffect(() => {
    onValue(ref(database, `posts/${postId.postId}`), (postData) => {
      if (postData.exists()) {
        setPost(postData.val());
      } else {
        setPost("POST NOT FOUND");
      }
    });
  }, []);

  useEffect(() => {
    return onValue(ref(database, `users/${currentUser.uid}`), (faculty) => {
      if (faculty.exists()) {
        setUser(faculty.val());
      
      getDownloadURL(StorageRef(storage, `avatars/${currentUser.uid}/${faculty.val().photoUrl}`))
          .then((url) => {
          const avatar = document.getElementById(`user-profile-avatar`)
           avatar.setAttribute('src', url)
            const avatardp = document.getElementById(`user-profile-dp`)
            avatardp.setAttribute('src', url)
         }).catch((err) => {
           console.log(err.message)
          })
        }
    });
  }, []);

  function PostComment(e) {
    e.preventDefault();
    const userComment = {
      postId: post.postId,
      commentId: uuidv4(),
      commentString: comment,
      commentDate: new Date().toLocaleString(),
      uid: user ? user.uid : "",
      name: user ? user.name : "",
      chatProfile: user ? currentUser.photoUrl : "",
    };
    set(
      ref(database, `comments/${post.postId}/${userComment.commentId}`),
      userComment
    )
      .then(() => {
        commentRef.current.value = "";
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function DownloadSyllabi(e) {
    e.preventDefault();
    getDownloadURL(StorageRef(storage, post.postFileUrl))
      .then((url) => {
        window.open(url);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (

    <body>


    <nav class={SyllabusStyle.nav}>
          <div class={SyllabusStyle.logoname} id={SyllabusStyle.logoname}>
  
              <div class={SyllabusStyle.logoimage} id={SyllabusStyle.logo_image}>
                  <img src={Logo} alt="" className={SyllabusStyle.logo}/>
              </div>
              
              <span class={SyllabusStyle.logo_name} id={SyllabusStyle.logo_name}>SyllabiLab</span>
              
          </div>
  
          <div class={SyllabusStyle.menu_items}>
              <ul class={SyllabusStyle.nav_links}>
                  <li id={SyllabusStyle.dashboardbtn}><a href="#" id={SyllabusStyle.dashboard_link}>
                      <Link to="/Faculty/DashBoard">
                      <i class="bi bi-house-door" id={SyllabusStyle.dashboard_btnicon}></i>
                      <span class={SyllabusStyle.link_name} id={SyllabusStyle.dashboard_btn}>Dashboard</span>
                      </Link>
                     </a>
                  </li>
  
                  <li>
                 <a href="#">
                 <Link to="/Faculty/Posts" >
                  <i class="bi bi-file-arrow-up"></i>
                  <span class={SyllabusStyle.link_name}>Syllabi</span>
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
                      <Link to="/Faculty/Archives">
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
             
      
              <i class={`${SyllabusStyle.sidebar_toggle} bi bi-list`}></i>
  
              <div class={SyllabusStyle.search_box}>
                  <i class="bi bi-search"></i>
                  <input type="text" placeholder="Search Here..."/>
              </div>
  
              <img id = {`user-profile-avatar`} src={Profile} alt="" class={SyllabusStyle.profile}/>
              
          </div>
  
          <div class={SyllabusStyle.dash_content}>
              <div class={SyllabusStyle.overview}>
                  <div class={SyllabusStyle.title}>
                  <i class="bi bi-file-arrow-up"></i>
                      <span class={SyllabusStyle.text}>Syllabus</span>
                  </div>
              </div>
             
              
          </div>

    <div className={`${SyllabusStyle.viewfilecontainer} w-full h-auto flex justify-center items-center py-2 px-10`}>
      <main className="w-[80%] h-auto min-h-[85vh]  rounded-md flex flex-col">
        <div className="px-5 py-4 border-b border-zinc-200 text-zinc-700 grid grid-cols-4 flex-1">
          <div className="col-span-3 overflow-hidden flex flex-col">
            <div className="h-8 w-full text-lg font-semibold flex flex-row items-center d-sm-flex justify-content-between">
              {post.postTitle}
              <PostStatus
                postStatus={post.postStatus}
                textSize={`text-xs font-normal`}
              />
            </div>
            <div className="text-xs text-zinc-600 font-semibold">
              Author:{" "}
              <Link
                to={`/faculty/${post.uid}`}
                className="text-sky-600 hover:underline cursor-pointer"
              >
                {post.postAuthor}{" "}
              </Link>
            </div>
            <div className="text-xs text-zinc-600 font-semibold ">
              {`Attachments: `}
              <Link onClick={DownloadSyllabi} to={``} className={`hover:underline text-sky-600`}>
                {post.postFile}
              </Link>
            </div>
            <div className="text-xs text-zinc-600 font-semibold">
              {`Posted: ${post.postDate}`}{" "}
            </div>
            <div className="text-sm text-zinc-600 mt-2">
              {post.postDescription}{" "}
            </div>
          </div>
          <div className="col-span-1 flex flex-col">
            <Status post={post}/>
          </div>
        </div>
        <div className={` ${SyllabusStyle.contentcontainer} w-full h-[400px] flex flex-row`}>
          {/* <div className={` ${SyllabusStyle.historycontainer}  w-1/3 border-r border-zinc-200 flex flex-col`}>
            <div className="w-full h-auto p-1 text-xs text-zinc-500 border-b border-zinc-100">
              Edit History
            </div>
            <div className="flex-1 overflow-y-auto">
              <History postId={postId.postId} />
            </div>
          </div> */}
          <div className={` ${SyllabusStyle.commentcontainer}  w-100 flex flex-col overflow-hidden `}>
            <div className="w-full h-auto p-1 text-xs text-zinc-500 border-b border-zinc-100">
              <span class = "justify-content-start">Comments
            </span>
            </div>
            <div className={` ${SyllabusStyle.comments} flex-1 px-4 overflow-y-auto `}>
              <Comments postId={postId.postId} />
            </div>
            <div className="min-h-[3.5rem] h-auto border-t border-zinc-200 flex p-2">
              <form onSubmit={PostComment} className=" flex-1 flex">
                <input
                  required={true}
                  type={`text`}
                  ref={commentRef}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Enter your comments"
                  className="form-control w-50"
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
    </section>
    </body>
  );
}
