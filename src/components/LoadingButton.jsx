import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import AdminDashboard from "../Apps/Admin/styles/admindashboard.module.css";

import { Link } from 'react-router-dom'


export default function LoadingButton(
    { dedicatedFunc, loadingState, title, form, buttonType, btnColor }
) {

    return (

        
            <button
                form={form}
                type={buttonType}
                onClick={dedicatedFunc}
                className={`btn text-white  ${btnColor} ${AdminDashboard.genupload}`} >
                {title}
                {loadingState ? <FontAwesomeIcon
                    className='text-lg ml-2'
                    icon={faCircleNotch} spin /> : ''}              
            </button>

    )
}
