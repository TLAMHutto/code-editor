import React, { useState } from 'react';
import '../../monaco/styles/leftsidebar.scss';

const LeftSidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [message, setMessage] = useState('');

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleAddClick = async () => {
    const fileName = 'new-file.txt';
    try {
      const response = await window.electron.createNewFile(fileName);
      setMessage(response);
    } catch (error) {
      console.error('Error creating file:', error);
      setMessage('Failed to create file');
    }
  };

  return (
    <nav className={`left-sidebar ${expanded ? 'expanded' : ''}`} onMouseEnter={toggleSidebar} onMouseLeave={toggleSidebar}>
      <ul>
        <li>
          <a href="#" onClick={handleAddClick}>
            <span className="nav-icon">
              <i className="fa-solid fa-plus"></i>
            </span>
            <span className="nav-text">Add</span>
          </a>
        </li>
      </ul>
      {message && <div className="message">{message}</div>}
    </nav>
  );
};

export default LeftSidebar;
