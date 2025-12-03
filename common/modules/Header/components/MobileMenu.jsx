import React, { useState, useEffect, useRef } from "react";
import MobileMenuLinks from "./MobileMenuLinks";

function MobileMenu({ title, populerTourData, categoryData }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleDocumentClick = (e) => {
    // Check if the click target is inside the menu or its children
    if (!menuRef.current || menuRef.current.contains(e.target)) {
      return;
    }

    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   document.addEventListener('click', handleDocumentClick, false);
  //   return () => {
  //     document.removeEventListener('click', handleDocumentClick, false);
  //   };
  // }, [isOpen]);

  const menuStatus = isOpen ? 'isopen' : '';

  return (
    <>
      <div className="menu-btns">
        <div className="hambclicker" onClick={handleMenuToggle}></div>
        <div ref={menuRef} id="hambmenu" className={menuStatus}>
          <span></span><span></span><span></span><span></span>
        </div>
        <div className="title">
          <span>{title}</span>
        </div>
      </div>
      <MobileMenuLinks menuStatus={menuStatus} populerTourData={populerTourData} categoryData={categoryData} />
    </>
  );
}

export default MobileMenu;
