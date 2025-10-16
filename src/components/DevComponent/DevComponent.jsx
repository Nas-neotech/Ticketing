import React, { useEffect, useRef } from "react";
import usePage from "../../contexts/usePage/usePage";
import ElementSettingsWrapper from "../ElementTypes/ElementSettingsWrapper/ElementSettingsWrapper";
import TestDevComponent from "./TestDevComponent";

const DevComponent = ({
  drag,
  element,
  isLayoutEle,
  parent,
  dragPreview,
  item,
}) => {
  const { isView, setSelectedElement, selectedElement } = usePage();
  const ref = useRef();

  useEffect(() => {
    if (dragPreview) {
      dragPreview(ref);
    }
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        ...(selectedElement?.id === element?.id
          ? { border: "2px solid red" }
          : {}),
      }}
      onClick={(e) => {
        if (!isView && !isLayoutEle) {
          setSelectedElement(element);
          e.stopPropagation();
        }
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-0px",
          right: "0",
          color: "var(--builder-main)",
        }}
      >
        <ElementSettingsWrapper
          drag={drag}
          parent={parent}
          isDevComponent
          element={element}
          isLayoutEle={isLayoutEle}
        />
      </div>

      {element?.id === 25890 ? (
        <TestDevComponent item={item} element={element} />
      ) : element?.text === "Search" ? (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Search
          </h2>

          {/* Name Input */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            {/* <FaUser className="text-gray-500 mr-2" /> */}
            <input
              type="text"
              placeholder="Enter name"
              className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>

          {/* Phone Input */}
          <div className="flex items-center border rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
            {/* <FaPhone className="text-gray-500 mr-2" /> */}
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
      ) : element?.text === "Result" ? (
        <div className="max-w-xs mx-auto bg-[rgb(55,16,195)] shadow-lg rounded-2xl p-6 flex flex-col items-center space-y-3">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            {/* <FaUser className="text-blue-600 text-2xl" /> */}
            icon
          </div>

          {/* User Info */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">name</h3>
            <p className="text-gray-500 text-sm">phone</p>
          </div>
        </div>
      ) : (
        <p>{`This is Dev Component: id => ${element?.text || element?.id}`}</p>
      )}
    </div>
  );
};

export default DevComponent;
