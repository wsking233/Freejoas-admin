import React, { useState, useEffect } from 'react';
import './userManagement.css';
import axios from '../service/axios';
import SessionStorageManager from '../service/SessionStorageManager';
import { FREEJOAS } from '../service/storageKeys';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';


function FreejoasManagement() {

    const [freejoas, setfreejoas] = useState([]);
    const navigate = useNavigate();

    const columns = [
        {   
            field: '_id', 
            headerName: 'Freejoa ID', 
        },
        {
          field: 'title',
          headerName: 'Title',
          width: 150,
        },
        {
          field: 'latitude',
          headerName: 'Latitude',
          width: 110,
        },
        {
          field: 'longitude',
          headerName: 'Longitude',
          type: 'number',
          width: 110,
        },
        {
          field: 'status',
          headerName: 'Status',
          description: 'This column has a value getter and is not sortable.',
          width: 70,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 70,
        },
        {
            field: 'isActive',
            headerName: 'Active',
            width: 70,
        },
        {
            field: 'uploader',
            headerName: 'Uploader ID',
            width: 150,
        },
        {
            field:'description',
            headerName:'Description',
            width: 200,
        },
        {
            field: 'createdAt',
            headerName: 'Upload Date',
            width: 110,
            type: 'date',
            valueGetter: (params) => new Date(Date.parse(params.value)),
        },
        {
            field:'image',
            headerName:'Images',
            renderCell: (params) => {
                const image = params.row.image[0];
                return image ? <img src={image.data} alt={image.filename} style={{ width: 100, height: 100 }} /> : <p>No image</p>;
            }
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 220,
            renderCell: (params) => {
                return (
                    <div style={{columnGap: '8px'}}>
                        <Button 
                            variant="contained" 
                            size="small" 
                            color="success" 
                            startIcon={<DoneIcon />}
                            >
                            Approve
                        </Button>                    
                        <IconButton 
                            color="error"
                            aria-label="delete" 
                            onClick={() => deleteUser(params.row._id)}
                            >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                );
            }
        },
      

      ];

    const deleteUser = (id) => {
        alert(`Delete user with id: ${id}`);
        // setfreejoas(freejoas.filter(user => user.id !== id));
    };

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

    const handleRowClick = (freejoa) => {
        navigate(`/detail/${freejoa._id}`, { state: { freejoa } });

    };

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
        <div>
            
            <div>
                <h2>Verified Freejoas Data</h2>

                <input
                    type="text"
                    placeholder="Search..."
                />

            </div>

            <div>
                <Box sx={{ height: 700, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        columns={columns}
                        rows={freejoas}
                        initialState={{
                        pagination: {
                            paginationModel: {
                            pageSize: 10,
                            },
                        },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </div>
    );
}

export default FreejoasManagement;