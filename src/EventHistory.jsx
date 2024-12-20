import React from 'react';
import matri from "./image/matrimony.pdf"
const EventHistory = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = matri;  
    link.setAttribute('download', 'EventHistory.pdf');  
    // document.body.appendChild(link);  
    link.click();  // Trigger the download
    // document.body.removeChild(link); 
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Event History PDF</button>
    </div>
  );
}

export default EventHistory;
