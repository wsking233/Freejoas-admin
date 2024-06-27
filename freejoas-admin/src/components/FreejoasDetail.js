import React, { useEffect } from 'react';
import './FreejoasDetail.css';
import { useLocation } from 'react-router-dom';

const FreejoasDetail = () => {

    const location = useLocation();
    const { freejoa } = location.state || {};

    useEffect(() => {
        console.log('Freejoas Detail Page');
        console.log("data:  ", freejoa);
        console.log("data.image", freejoa.image);
    }, []);

    if (!freejoa) {
        return <h1>No data found</h1>
    }

    return (
        <div className="freejoa-container">
            <div className="freejoa-card">

                <h2>{freejoa.title}</h2>
                <div className="images">
                    {freejoa.image.length === 0 ? <p>No images found</p>
                        :
                        freejoa.image.map((img, imgIndex) => (
                            <div key={imgIndex} className="image-container">
                                <img src={img.data} alt={img.filename} />
                                <p>{img.filename}</p>
                            </div>
                        ))}
                </div>
                <p><strong>Freejoa ID:</strong> {freejoa._id}</p>   
                <p><strong>Latitude:</strong> {freejoa.latitude}</p>
                <p><strong>Longitude:</strong> {freejoa.longitude}</p>
                <p><strong>Status:</strong> {freejoa.status}</p>
                <p><strong>Amount:</strong> {freejoa.amount}</p>
                <p><strong>Description:</strong> {freejoa.description}</p>
                <p><strong>Is Active:</strong> {freejoa.isActive ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
};

export default FreejoasDetail;
