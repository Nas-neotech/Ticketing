import React, { useState ,useEffect, useRef } from "react";
import usePage from "../../contexts/usePage/usePage";
import ElementSettingsWrapper from "../ElementTypes/ElementSettingsWrapper/ElementSettingsWrapper";
import TestDevComponent from "./TestDevComponent";
import SearchCompo from "../SearchCompo.jsx";
import ResultCompo from "../ResultCompo.jsx";
import HeaderCompo from "../HeaderCompo.jsx";

const DevComponent = ({
  drag,
  element,
  isLayoutEle,
  parent,
  dragPreview,
  item,
}) => {
  const { isView, setSelectedElement, selectedElement } = usePage();
  const [searchResults, setSearchResults] = useState([]);
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
      ) : element?.text === "Header" ?
       <HeaderCompo />
        : element?.text === "Search" ? (
       <SearchCompo onSearchResults={(data) => setSearchResults(data)}/>
      ) : element?.text === "Result" ? (
       <ResultCompo data={searchResults}/>
      ) : (
        <p>{`This is Dev Component: id => ${element?.text || element?.id}`}</p>
      )}
    </div>
  );
};

export default DevComponent;
