import { onValue, ref } from "firebase/database";
import React, { useState, useEffect } from "react";
import { database, storage} from "../Apps/firebase/firebase";
import SyllabusStyle from "../Apps/AreaChair/styles/syllabusStyle.module.css";
import { getDownloadURL, ref as StorageRef } from 'firebase/storage'
import { useAuth } from '../Apps/firebase/AuthContext'


export default function Comments({ postId }) {
  const [postComments, setComments] = useState([]);
  const {currentUser, setUser} = useAuth()
  // const [user, setUser] = useState({})

  useEffect(() => {
    onValue(ref(database, `comments/${postId}`), (snapshot) => {
      if (snapshot.exists()) {
        setComments(Object.values(snapshot.val()));
        onValue(ref(storage, `comments/${postId}/${snapshot.val().chatProfile}`))
        .then((url) => {
          const avatar = document.getElementById(`user-profile-avatarchat`)
          avatar.setAttribute('src', url)
    
        }).catch((err) => {
          console.log(err.message)
        })
      }
     
    });
  }, []);

  return (
    <div className="w-full h-auto min-h-[10rem] grid grid-cols-4 gap-3 py-4">
      {postComments
        ? postComments
            .sort(
              (a, b) =>
                new Date(b.commentDate).getTime() -
                new Date(a.commentDate).getTime()
            )
            .map((val, key) => (
              <div
                key={key}
                className={` ${SyllabusStyle.chats} h-auto  p-3`}
              >
                <span className={` ${SyllabusStyle.name} text-sm font-semibold`}>{val.name}</span>
                <br />
                <p className={SyllabusStyle.chatmessage}>{val.commentString}</p>
              </div>
            ))
        : ""}
    </div>
  );
}
