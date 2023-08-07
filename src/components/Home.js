import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileCards from './FileCards';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('accessToken');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (!token) return navigate('/login');
        // Fetch files data from the backend API

        axios.get('http://localhost:3500/files',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(response => {
                setFiles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
                setLoading(false);
            });
    }, [navigate]);

    if (loading) {
        return <section>
            <div className='d-flex justify-content-center align-items-center fw-bold text-primary'>Loading...</div>
        </section>;
    };


    const handleSearch = (query) => {

        if (!query) {
            setSearchResults([]);
            return;
        }

        const filteredItems = files.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );
        setFiles(filteredItems);


    }

    return (
        <main>
            <Navbar onSearch={handleSearch} />
            <section>
                <div>
                    {files.map((file, index,) => (
                        <FileCards
                            key={index}
                            id={index}
                            fileTitle={file.title}
                            fileDescription={file.description}
                            fileDate={file.timestamp}
                            cloudinaryUrl={file.cloudinaryUrl}
                            fileDownloads={file.downloadNum}
                            fileSends={file.sendNum}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Home;