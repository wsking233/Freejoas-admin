import React from 'react';
import './FreejoasDetail.css';

const FreejoasDetail = ({ freejoa }) => {
    if (!freejoa) {
        return <div>No freejoa data available</div>;
    }

    const images = freejoa.image || [];

    return (
        <div className="freejoa-container">
            <div className="freejoa-card">
                <h2>{freejoa.title}</h2>
                <div className="images">
                    {images.length === 0 ? (
                        <p>No images found</p>
                    ) : (
                        images.map((img, imgIndex) => (
                            <div key={imgIndex} className="image-container">
                                <img src={img.data} alt={img.filename} />
                                <p>{img.filename}</p>
                            </div>
                        ))
                    )}
                </div>
                <p><strong>Freejoa ID:</strong> {freejoa._id}</p>
                <p><strong>Latitude:</strong> {freejoa.latitude}</p>
                <p><strong>Longitude:</strong> {freejoa.longitude}</p>
                <p><strong>Status:</strong> {freejoa.status}</p>
                <p><strong>Amount:</strong> {freejoa.amount}</p>
                <p><strong>Description:</strong> {freejoa.description}</p>
                <p><strong>Is Active:</strong> {freejoa.isActive ? 'Yes' : 'No'}</p>
                <p><strong>Uploader ID:</strong> {freejoa.uploader}</p>
                <button>
                    Edit
                </button>
                <button>
                    Delete
                </button>
                <br />
                <button>
                    Approve
                </button>
            </div>
        </div>
    );
};

export default FreejoasDetail;
