import React, { useState, useEffect } from 'react';

function DigitalClock({ onTimeChange }) { 
  const [created_at, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newTime = new Date();
      setDateTime(newTime);
      onTimeChange(newTime); 
    }, 60000); 

    return () => clearInterval(intervalId); 
  }, [onTimeChange]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', spacebetween: '30px' }}>
      <p>{formatDate(created_at)}</p>
    </div>
  );
}

export default DigitalClock;
