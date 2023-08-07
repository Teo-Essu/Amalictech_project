// import axios from 'axios';
import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import styles from './signUp.module.css';


const FileCards = (props) => {

  const { isAdmin } = useAuth();
  // const [downloadCounts, setDownloadCounts] = useState(props.fileDownloads);

  // const [url, setUrl] = useState('');

  const handleEmail = () => {
    // setUrl(props.cloudinaryUrl);
    localStorage.setItem('url', props.cloudinaryUrl);
    localStorage.setItem('cardId', props.id);
  }

  const download = async () => {
    console.log(isAdmin);

    // // Create a copy of the downloadCounts object
    // const updatedDownloadCounts = { ...downloadCounts };
    // // Update the download count for the specific card
    // updatedDownloadCounts[props.id] = (updatedDownloadCounts[props.id] || 0) + 1;

    // // Update the state with the new download counts
    // setDownloadCounts(updatedDownloadCounts);

    const getBasename = (filePath) => {
      // Get the last part of the path using split and pop
      const parts = filePath.split('/');
      return parts.pop();
    };

    try {
      const response = await fetch(`http://localhost:3500/download?url=${props.cloudinaryUrl}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        const basename = getBasename(props.cloudinaryUrl);
        a.download = basename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download file');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      window.alert("Error downloading file!");
    }


    // try {
    //   // const token = localStorage.getItem('accessToken');
    //   await axios.get(`http://localhost:3500/download?url=${props.cloudinaryUrl}`,
    //     // {
    //     //     headers: {
    //     //         Authorization: `Bearer ${token}`,
    //     //     },
    //     // }
    //   )
    // } catch (error) {
    //   if (!error.response) {
    //     console.error("No Server Response");
    //   } else if (error.response) {
    //     console.log("Error downloading", error.response.data);
    //   }
    // }
  }

  return (
    <main className='container'>
      <div className='card mt-4'>
        <div className='card-body'>
          <h4 className='card-title'>{props.fileTitle}</h4>
          <div className='card-subtitle text-muted mb-2'>
            {props.fileDate}
          </div>
          <div className='card-text mb-2'>{props.fileDescription}</div>
          <a href='/email' className='btn btn-primary m-1' onClick={handleEmail}>Send</a>
          <a href={props.cloudinaryUrl} target="_blank" rel="noopener noreferrer" className='btn btn-success m-1'>Preview</a>
          <button className='btn btn-info m-1' onClick={download}>Download</button>
          <div className={styles.bottom_left}>
            <div className='container'>
              <div className='position-relative'>
                {(isAdmin) && <p className='text-primary mb-auto mt-2 fw-bold'>{props.fileSends || 0} Sends</p>}
                {(isAdmin) && <p className={`text-info mt-1 fw-bold `}> {props.fileDownloads || 0} Downloads</p>}
              </div>
            </div>
          </div>
        </div>

      </div>

    </main>
  )
}

export default FileCards;