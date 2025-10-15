import React, { useEffect, useRef } from "react";
import usePage from "../../contexts/usePage/usePage";
import ElementSettingsWrapper from "../ElementTypes/ElementSettingsWrapper/ElementSettingsWrapper";
import TestDevComponent from "./TestDevComponent";

const DevComponent = ({drag , element , isLayoutEle , parent , dragPreview , item}) => {
    const {isView , setSelectedElement , selectedElement} = usePage()
    const ref = useRef()

    useEffect(() => {
        if(dragPreview){
            dragPreview(ref)
        }
    },[])

    return(
        <div
        ref={ref}
        style={{
            position:"relative",
            ...(selectedElement?.id == element?.id
            ? {
                border: "2px solid red",
                }
            : {}),
        }}
        onClick={(e)=>{
            if(!isView && !isLayoutEle){
                setSelectedElement(element)
                e.stopPropagation()
            }
        }}
        >
            <div style={{position: 'absolute' , top:'-0px' , right:'0' , color: 'var(--builder-main)'}}>
                <ElementSettingsWrapper drag={drag} parent={parent} isDevComponent element={element} isLayoutEle={isLayoutEle} />
            </div>
            {element?.id == 25890 
            ? 
            <TestDevComponent item={item} element={element}/>
            :
            element?.text == "Search" 
            ? 
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
  <h2 className="text-xl font-semibold text-gray-800 text-center">Search</h2>

  {/* Name Input */}
  <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-500 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5.121 17.804A9 9 0 1118.364 4.56M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
    <input
      type="text"
      placeholder="Enter name"
      className="flex-1 outline-none text-gray-700 placeholder-gray-400"
    />
  </div>

  {/* Phone Input */}
  <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 text-gray-500 mr-2"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5h2l3.6 7.59-1.35 2.44A1 1 0 008 17h8a1 1 0 00.92-.62l3.58-8.26A1 1 0 0019.58 7H5.21"
      />
    </svg>
    <input
      type="tel"
      placeholder="Enter phone number"
      className="flex-1 outline-none text-gray-700 placeholder-gray-400"
    />
  </div>

  {/* Search Button */}
  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-xl transition-colors">
    Search
  </button>
</div>

            : 
            <p>
            {`This is Dev Component: id => ${element?.text || element?.id}`}
            </p>
            } 
            
        </div>
    )
}

export default DevComponent
