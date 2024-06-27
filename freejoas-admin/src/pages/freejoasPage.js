import React from "react";
import SessionStorageManager from '../service/SessionStorageManager';
import FreejoasDetail from "../components/FreejoasDetail";
import axios from '../service/axios';
import { useState, useEffect } from 'react';
import { FREEJOAS } from '../service/storageKeys';
import './freejoasPage.css';



function FreejoasPage() {

    const [freejoas, setfreejoas] = useState([]);


    const fetchfreejoasFromAPI = async () => {
        // fetch freejoas from the server
        try {
            const response = await axios.get('/freejoa/all');
            if (response.data.data === null || response.data.data === undefined || response.data.data.length === 0) {
                console.log('No data');
                return;
            }
            console.log("API: /freejoa/all called successfully");
            setfreejoas(()=>(response.data.data));
            SessionStorageManager().setItem(FREEJOAS, response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const cachedFreejoas = SessionStorageManager().getItem(FREEJOAS);
        if (cachedFreejoas) {
            setfreejoas(()=>(cachedFreejoas));
          console.log("Cached Freejoas");
        } else {
            fetchfreejoasFromAPI();
        }
    }, []);


    return (
        <div >
            <h2>Verified Freejoas Data</h2>
            <div className="freejoas-container">
                {freejoas.length === 0 ?
                    <h1>No data found</h1>
                    :
                    freejoas.map((item, index) => (
                        <FreejoasDetail key={index} freejoa={item} />
                    ))
                }
            </div>
        </div>
    );
}

export default FreejoasPage;