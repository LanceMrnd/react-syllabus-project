import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useAuth, useFirebase } from "../Apps/firebase/AuthContext";
import { ref, update } from "firebase/database";
import { database } from "../Apps/firebase/firebase";
import SyllabusStyle from "../Apps/AreaChair/styles/syllabusStyle.module.css";

export default function Status({ post }) {
  const [status, setStatus] = useState();
  const { admin, isAreaChair } = useAuth();

  function changeStatus(UpdateStatus) {
    update(ref(database, `posts/${post.postId}`), { postStatus: UpdateStatus });
  }

  return (
    <div className="w-full text-right w-50">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            disabled={!isAreaChair && !admin}
            className={`${SyllabusStyle.setStatus} d-lg-flex  justify-center items-center w-auto h-auto px-2 py-1 text-xs btn
                        text-white`}
          >
            <span className={`SyllabusStyle.setStatusText px-2`}>Set Status</span>
            <span class = "px-2" ><i class="bi bi-chevron-down"></i>
            </span>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter={`transition ease-out duration-100`}
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={` ${SyllabusStyle.choosecontainer} absolute right-0 w-56 mt-2 origin-top-right
                    rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            <div className={` ${SyllabusStyle.choiceList} px-1 py-1 w-50`}>
              {[
                {
                  title: "Need reviews",
                  status: "Needs reviewing",
                },
                {
                  title: "Approved",
                  status: "Approved",
                },
                {
                  title: "Need revisions",
                  status: "Needs revisions",
                },
              ].map((val, key) => {
                return (
                  <Menu.Item key={key}>
                    {({ active }) => (
                      <button 
                        onClick={() => {
                          changeStatus(val.status);
                        }}
                        className={`${
                          active ? "bg-zinc-600 text-white" : "text-gray-900"
                        }
                                                ${SyllabusStyle.statusChoice}    btn items-center w-full px-5 py-2 text-sm`}
                      >
                        {val.title}
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
