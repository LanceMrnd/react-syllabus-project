import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Intro from './Apps/Intro'
import Login from './Apps/login'
import SignUP from './Apps/signup'
import Choose from './Apps/choose'
import { AuthProvider } from "./Apps/firebase/AuthContext";
import DashBoardFaculty from './Apps/Faculty/Dashboard'
import DashBoardAdmin from './Apps/Admin/Dashboard'
import FacultyAdmin from './Apps/Admin/Faculty'
import AreaChairAdmin from './Apps/Admin/AreaChair'
import AreaChairFaculty from './Apps/AreaChair/Faculty'
import AreaChairsDashboard from './Apps/AreaChair/Dashboard'
import ArchivesAdmin from './Apps/Admin/Archive'
import ArchivesFaculty from './Apps/Faculty/Archives'
import AreaChairArchives from './Apps/AreaChair/Archives'
import ForgotPassword from "./Apps/ForgotPassword";
import FacultyPost from './Apps/Faculty/Syllabus/Post'
import AreaChairPost from './Apps/AreaChair/Syllabus/Post'
import PostAdmin from './Apps/Admin/Syllabus/Post'
import ViewPostAdmin from './Apps/Admin/Syllabus/ViewPost'
import FacultyCreatePost from './Apps/Faculty/Syllabus/CreatePost'
import AreaChairCreatePost from './Apps/Faculty/Syllabus/CreatePost'
import FacultyViewPost from './Apps/Faculty/Syllabus/ViewPost'
import AreaChairViewPost from './Apps/AreaChair/Syllabus/ViewPost'
import { FacultyProfile } from './Apps/Faculty/FacultyProfile/FacultyProfile'
import { FacultyProfileEdit } from './Apps/Faculty/FacultyProfile/FacultyProfileEdit'
import {AreaChairProfile} from './Apps/AreaChair/AreaChairProfile/AreaChairProfile'
import {AreaChairProfileEdit} from './Apps/AreaChair/AreaChairProfile/AreaChairProfileEdit'
import Subjects from './Apps/Admin/Subject/Subjects'
import {ViewSubject}from './Apps/Admin/Subject/ViewSubject'
import {AddSubject} from './Apps/Admin/Subject/AddSubject'
import EditSubject from './Apps/Admin/Subject/EditSubject'






function App() {

    return (

      <AuthProvider>
      <Router>

        <Routes>
          <Route path = "/" element = {<Intro/>}/>
          <Route path = "/Login" element = {<Login/>}/>
          <Route path = '/Sign-Up' element ={<SignUP/>}/>
          <Route path = '/Choose' element ={<Choose/>}/>
          <Route path = '/Faculty/DashBoard' element ={<DashBoardFaculty/>}/>
          <Route path = '/Faculty/Archives' element ={<ArchivesFaculty/>}/>
          <Route path = '/Admin/DashBoard' element ={<DashBoardAdmin/>}/>
          <Route path = '/Admin/Faculties' element ={<FacultyAdmin/>}/>
          <Route path = '/Admin/Archives' element ={<ArchivesAdmin/>}/>
          <Route path = '/Admin/AreaChairs' element ={<AreaChairAdmin/>}/>
          <Route path = '/Admin/Posts' element ={<PostAdmin/>}/>
          {/* <Route path = '/Admin/ViewPosts' element ={<ViewPostAdmin/>}/> */}
          <Route path = '/Admin/Posts/:postId' element={<ViewPostAdmin />} />
          <Route path = '/AreaChair/Dashboard' element ={<AreaChairsDashboard/>}/>
          <Route path = '/AreaChair/Faculties' element ={<AreaChairFaculty/>}/>
          <Route path = '/AreaChair/Archives' element ={<AreaChairArchives/>}/>
          <Route path = "/forgot-password" element={<ForgotPassword/>}/>

          <Route path = '/Faculty/Posts' element={<FacultyPost />} />
          <Route path = '/Faculty/Posts/create-post' element={<FacultyCreatePost />} />
          <Route path = '/Faculty/Posts/:postId' element={<FacultyViewPost/>} />
          <Route path = '/Faculty/Profile' element={<FacultyProfile />} />
          <Route path = '/Faculty/Profile/edit-profile' element={<FacultyProfileEdit />} />

          <Route path = '/AreaChair/Posts' element={<AreaChairPost />} />
          <Route path = '/AreaChair/Posts/create-post' element={<AreaChairCreatePost/>} />
          <Route path = '/AreaChair/Posts/:postId' element={<AreaChairViewPost />} />
          <Route path = '/AreaChair/Profile' element={<AreaChairProfile/>} />
          <Route path = '/AreaChair/Profile/edit-profile' element={<AreaChairProfileEdit />} />

          <Route path = '/Admin/Subjects' element={<Subjects />} />
          <Route path = '/Admin/Subjects/:id' element={<ViewSubject />} />
          <Route path = '/Admin/Subjects/AddSubject' element={<AddSubject />} />
          <Route path = '/Admin/Subjects/:id/EditSubject' element={<EditSubject />} />

          
        </Routes>  
    </Router>
    </AuthProvider>
    )

}

export default App