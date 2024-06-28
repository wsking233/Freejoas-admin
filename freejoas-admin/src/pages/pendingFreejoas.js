import React, { useState, useEffect } from 'react';
import './userManagement.css';
import axios from '../service/axios';
import SessionStorageManager from '../service/SessionStorageManager';
import { PENDING_FREEJOAS, DATA_TYPES } from '../service/storageKeys';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CustomToolbar from '../components/CustomToolbar';



function PendingFreejoasManagement() {

    const [pendingFreejoas, setPendingFreejoas] = useState([]);
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


    const fetchPendingFreejoasFromAPI = async () => {
        // fetch pendingFreejoas from the server
        try {
            const response = await axios.get('/admin/pending/freejoas/all');
            if (response.data.data === null || response.data.data === undefined || response.data.data.length === 0) {
                console.log('No data');
                return;
            }
            console.log("API: admin/pending/pendingFreejoas/all called successfully");
            setPendingFreejoas(() => (response.data.data));
            SessionStorageManager().setItem(PENDING_FREEJOAS, response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const cachedpendingFreejoas = SessionStorageManager().getItem(PENDING_FREEJOAS);
        if (cachedpendingFreejoas) {
            setPendingFreejoas(() => (cachedpendingFreejoas));
            console.log("Cached pendingFreejoas");
        } else {
            fetchPendingFreejoasFromAPI();
        }
    }, []);



    // const handleApprove = async (e) => {
    //     e.preventDefault();
    //     console.log('Approve Clicked', rowSelectionModel);
    //     /**
    //      *  Approve the selected pendingFreejoas
    //      */

    // }

    // const handleDelete = async (e) => {
    //     e.preventDefault();
    //     console.log('Delete Clicked', rowSelectionModel);
    //     /**
    //      * Delete the selected pendingFreejoas
    //      */
    // }

    // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     console.log('Search Clicked');
    //     /**
    //      * Search the pendingFreejoas
    //      */
    // }

    return (
        <div>

            <div>
                <h2>Pending Freejoas</h2>
            </div>

            <div>
                <Box sx={{ height: 700 }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        columns={columns}
                        rows={pendingFreejoas}
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
                                showApprove={true} 
                                dataType={DATA_TYPES.PENDING_FREEJOAS}
                                />
                        }}
                    />
                </Box>
            </div>
        </div>
    );
}

export default PendingFreejoasManagement;