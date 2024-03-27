import React, {useState} from "react";
import './listingCard.css';
// import { FaTree } from "react-icons/fa";
import LogoPlaceholder from '../images/freejoa-logo.svg'
import Modal from 'react-modal';
import axios from '../service/axios';


function ListingCard({ item }) {

    Modal.setAppElement('#root');   //use the root element as the app element

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleCardClick = () => {
        console.log('card clicked');
        setModalIsOpen(true);
    }

    const handleCardDelete = async () => {
        console.log('card deleted');
        // setModalIsOpen(false);
        console.log('delete freejoa id: ', item._id);

        try{
            await axios.delete(`/freejoa/delete`,{
                data: {
                    freejoaId: item._id
                }
            })
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            });
        }catch(err){
            console.log(err);
        }

        //go back to the dashboard
        setModalIsOpen(false);
    }

    return (
        <div>

            <div onClick={handleCardClick}>
                {item.image ? (
                    <div className="location-list--item-image" style={{
                        backgroundImage: `url(${item.image[0].data})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}>

                    </div>
                ) : (
                    <div className="location-list--item-image" style={{
                        backgroundImage: `url(${LogoPlaceholder})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}></div>
                )}
                <div className="location-list--item-container">
                    <div className="location-list--item-filter">
                        <div className="location-list--item-tree">
                            <span>{item.amount}</span>
                            <span>{item.uploader}</span>
                            {/* <FaTree /> */}
                        </div>
                    </div>
                    <span className="location-list--item-title">{item.title}</span>
                </div>
            </div>

            <div>
                <Modal 
                    isOpen={modalIsOpen} 
                    onRequestClose={() => setModalIsOpen(false)}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        },
                        content: {
                            padding: '0',
                            margin: 'auto',
                            width: '50%',
                            height: '50%',
                            border: 'none',
                            borderRadius: '10px'
                        }
                    }}
                >
                    <div>
                        <h1>Modal</h1>
                        <p>Freejoa ID: {item._id}</p>
                        <button onClick={handleCardDelete}>Delete</button>
                    </div>
                </Modal>

            </div>


        </div>

    );
}

export default ListingCard;