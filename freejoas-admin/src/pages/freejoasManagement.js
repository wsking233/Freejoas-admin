import React, { useState, useEffect } from 'react';
import './userManagement.css';
import axios from '../service/axios';
import SessionStorageManager from '../service/SessionStorageManager';
import { FREEJOAS, DATA_TYPES } from '../service/storageKeys';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CustomToolbar from '../components/CustomToolbar';


function FreejoasManagement() {

    const [freejoas, setFreejoas] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);


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
            field: 'description',
            headerName: 'Description',
            width: 100,
        },
        {
            field: 'createdAt',
            headerName: 'Upload Date',
            width: 200,
        },
        {
            field: 'image',
            headerName: 'Images',
            renderCell: (params) => {
                const image = params.row.image[0];
                return image ? <img src={image.data} alt={image.filename} style={{ width: 100, height: 100 }} /> : <p>No image</p>;
            }
        }
    ];


    const fetchfreejoasFromAPI = async () => {
        // fetch freejoas from the server
        try {
            const response = await axios.get('/freejoa/all');
            if (response.data.data === null || response.data.data === undefined || response.data.data.length === 0) {
                console.log('No data');
                return;
            }
            console.log("API: /freejoa/all called successfully");
            setFreejoas(() => (response.data.data));
            SessionStorageManager().setItem(FREEJOAS, response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const cachedFreejoas = SessionStorageManager().getItem(FREEJOAS);
        if (cachedFreejoas) {
            setFreejoas(() => (cachedFreejoas));
            console.log("Cached Freejoas");
        } else {
            fetchfreejoasFromAPI();
        }
    }, []);

    return (
        <div>

            <div>
                <h2>Verified Freejoas</h2>
            </div>

            <div>
                <Box sx={{ height: 700 }}>
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
                        pageSizeOptions={[5, 10, 20]}
                        disableRowSelectionOnClick
                        checkboxSelection

                        onRowSelectionModelChange={(newRowSelectionModel) => {
                            console.log("Data selected: ", newRowSelectionModel);
                            setRowSelectionModel(newRowSelectionModel);
                        }}
                        rowSelectionModel={rowSelectionModel}
                        slots={{
                            toolbar: () => 
                            <CustomToolbar 
                                selectedRowIds={rowSelectionModel} 
                                showApprove={false} 
                                dataType={DATA_TYPES.VERIFIED_FREEJOAS}
                                />
                        }}
                    />
                </Box>
            </div>
        </div>
    );
}

export default FreejoasManagement;