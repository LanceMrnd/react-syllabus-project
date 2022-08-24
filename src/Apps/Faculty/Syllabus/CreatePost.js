import React, {useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../../Apps/firebase/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import LoadingButton from "../../../components/LoadingButton.jsx"
import { onValue, ref } from "firebase/database";
import { database } from "../../../Apps/firebase/firebase";
import SyllabusStyle from "../styles/facultydashboard.module.css";
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage'
import Profile from "../Syllabus/images/ayaka.jpg"
import Logo from "../Syllabus/images/logo.png"
import Swal from "sweetalert2";

import { storage  } from "../../../Apps/firebase/firebase";
import { ModalBody } from "react-bootstrap";

export default function CreatePost() {
  const idRef = useRef();
  const titleRef = useRef();
  const postStatusRef = useRef();
  const descriptionRef = useRef();
  const authorRef = useRef();
  const fileRef = useRef();
  const { writeData, uploadFile, currentUser } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState();
  const [error, setError] = useState("Failed to write data");
  const [Url, setUrl] = useState('');
  const [user, setUser] = useState({})


  useEffect(() => {
    return onValue(ref(database, `users/${currentUser.uid}`), (user) => {
      if (user.exists()) {
        setName(user.val().name);
        
      } else {
        setName(`User not found`);
      }
    });
  });
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

  const AddPost = [
    {
      id: "post-id",
      label: "",
      type: "hidden",
      defaultValue: uuidv4(),
      placeholder: "",
      ref: idRef,
      required: true,
    },
    {
      id: "post-status",
      label: "",
      type: "hidden",
      defaultValue: "Needs reviewing",
      placeholder: "",
      ref: postStatusRef,
      required: true,
    },

    {
      id: "post-author",
      label: "",
      type: "hidden",
      defaultValue: "",
      placeholder: "",
      ref: authorRef,
      required: true,
    },
    {
      id: "post-title",
      label: "Post title",
      type: "text",
      defaultValue: "",
      placeholder: "Introduction to Computing Syllabi S.Y.21-22",
      ref: titleRef,
      required: true,
    },
    {
      id: "syllabus-file",
      label: "Syllabi File",
      type: "file",
      defaultValue: "",
      placeholder: "",
      ref: fileRef,
      accept:
        "application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      required: true,
    },
    {
      id: "syllabus-description",
      label: "Description",
      type: "text",
      defaultValue: "",
      placeholder: "",
      ref: descriptionRef,
      required: false,
    },
  ];

  function PublishPost(e) {
    e.preventDefault();
    const Post = {
      postId: idRef.current.value,
      postStatus: postStatusRef.current.value,
      postTitle: titleRef.current.value,
      postFile: fileRef.current.files[0].name,
      postFileUrl: `syllabus/${idRef.current.value}/${fileRef.current.files[0].name}`,
      postDescription: descriptionRef.current.value,
      postDate: new Date().toLocaleString(),
      uid: currentUser.uid,
      postAuthor: name,
      location: "active"
    };

    writeData("posts/", Post, Post.postId)
      .then(() => {
        uploadFile(
          fileRef.current.files[0],
          `syllabus/${Post.postId}/${fileRef.current.files[0].name}`
        )

        database.ref(`/files/${idRef.name}`).put(idRef)
        .on("state_changed", alert("success"), alert, () => {
          // Getting Download Link
          storage.ref("idRef").child(idRef.name).getDownloadURL()
          .then((url) => {
            setUrl(url);
          })
        })

          .then(() => {
            nav("/Faculty/Posts");
          })
          .catch((err) => {
            setError(err.message);
            console.log(err);
          });
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
      Swal.fire(

        'Published!',

        'Syllabus Published!',

        'success'
        

      )
     
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
                  <span class={SyllabusStyle.link_name}>Syllabus</span>
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
              
      
              <i class={`${SyllabusStyle.sidebar_toggle} bi bi-list`}></i>
{/*   
              <div class={SyllabusStyle.search_box}>
                  <i class="bi bi-search"></i>
                  <input type="text" placeholder="Search Here..."/>
              </div> */}
  
              <img src={Profile} alt="" id = {`user-profile-avatar`} class={SyllabusStyle.profile}/>
              </div>
          
  
          <div class={SyllabusStyle.dash_content}>
              <div class={SyllabusStyle.overview}>
                  <div class={SyllabusStyle.title}>
                  <i class="bi bi-file-arrow-up"></i>
                      <span class={SyllabusStyle.text}>Syllabus</span>
                  </div>
              </div>
             
              
          </div>



  

    <div className={` ${SyllabusStyle.uploadsyllabuscontainer} w-full   px-10 flex justify-center`}>
      <div className="container   ">
        <header className="h-16 border-b flex items-center px-10">

        <Link to="/Faculty/Posts"class="btn my-2 btn-light"><i class="bi bi-arrow-left"></i></Link>
          <h5 className="text-2xl text-zinc-700 font-medium">
            {`Upload File`}{" "}
          </h5>
        </header>
        <main className="form-float h-100">
          <form
            id="create-post"
            name="create-post"
            spellCheck={false}
            onSubmit={PublishPost}
            className="min-h-[500px] w-full px-10"
          >
            {AddPost &&
              AddPost.map((val, key) => {
                return (
                  <div 
                    key={key}
                    htmlFor={val.id}
                    className={`${
                      val.type !== "hidden"
                        ? "py-2 border-b border-zinc-100"
                        : ""
                    }
                    ${SyllabusStyle.uplaodinput}  w-full flex flex-row`}
                  >
                    <span className="w-1/6 text-sm text-zinc-600 font-medium flex items-center">
                      {val.label}
                    </span>
                    <input
                      id={val.id}
                      ref={val.ref}
                      required={val.required}
                      type={val.type}
                      accept={val.accept && val.accept}
                      defaultValue={val.defaultValue}
                      placeholder={val.placeholder}
                      className={`form-control`}
                    />
                  </div>
                );
              })}
          </form>
        </main>
        <footer className="h-14 flex items-center justify-end px-10">
          {error && (
            <div className=" text-red-600">
              {/* <FontAwesomeIcon icon={faWarning} className="mr-2 text-xs" />
              <span className="text-sm font-medium">{`Error: ${error}`}</span> */}
            </div>
          )}

          <LoadingButton
            form={`create-post`}
            type={`submit`}
            title={`Publish`}
           
          />
        </footer>
      </div>
    </div>
    </section>
    </body>
  );
}
