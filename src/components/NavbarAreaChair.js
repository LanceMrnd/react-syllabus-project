import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import SyllabusStyle from "../Apps/Faculty/styles/syllabusStyle.module.css";

export default function Navbar({
  headerTitle,
  searchBarOnChange,
  buttonOnClick,
}) {
  return (
    <nav className="h-14  flex flex-row justify-between px-10 border sticky top-12" id = {SyllabusStyle.syllabustop}>
      <h5 className="text-xl flex items-center font-medium text-zinc-600 " >
        {headerTitle}
      </h5>
      <div className="h-full w-auto min-w-[20rem] flex flex-row py-2">
        <div className="flex justify-center flex-1 bg-transparent mr-2">
          <input 
            onChange={searchBarOnChange}
            spellCheck={false}
            placeholder={`Search`}
            aria-placeholder={`Search`}
            type={`text`}
            className={`outline-none border border-zinc-200 bg-transparent flex-1 px-3 transition-all 
                        ring-2 ring-transparent focus:border-sky-300 focus:ring-sky-300 text-sm rounded-md form-control w-50` }
          />
        </div>
      

      </div>
    </nav>
  );
}
