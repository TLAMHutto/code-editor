// src/monaco/LeftSidebar.tsx
import React, { useState } from 'react';
import '../../monaco/styles/leftsidebar.scss' // Import the SCSS file for styling

const LeftSidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className={`left-sidebar ${expanded ? 'expanded' : ''}`} onMouseEnter={toggleSidebar} onMouseLeave={toggleSidebar}>
      <ul>
        <li>
          <a href="#">
            <span className="nav-icon">
              <i className="fa-solid fa-plus"></i>
            </span>
            <span className="nav-text">Add</span>
          </a>
        </li>
        {/* Add more items as needed */}
      </ul>
    </nav>
  );
};

export default LeftSidebar;