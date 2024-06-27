import React, { useState, useEffect } from 'react';
import './userManagement.css';
import axios from '../service/axios';
import SessionStorageManager from '../service/SessionStorageManager';
import { FREEJOAS } from '../service/storageKeys';
import { Button,IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';



function FreejoasManagement() {


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
            setfreejoas(() => (response.data.data));
            SessionStorageManager().setItem(FREEJOAS, response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const cachedFreejoas = SessionStorageManager().getItem(FREEJOAS);
        if (cachedFreejoas) {
            setfreejoas(() => (cachedFreejoas));
            console.log("Cached Freejoas");
        } else {
            fetchfreejoasFromAPI();
        }
    }, []);


    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    const handleApprove = async (e) => {
        e.preventDefault();
        console.log('Approve Clicked', rowSelectionModel);
        /**
         *  Approve the selected freejoas
         */

    }

    const handleDelete = async (e) => {
        e.preventDefault();
        console.log('Delete Clicked', rowSelectionModel);
        /**
         * Delete the selected freejoas
         */
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log('Search Clicked');
        /**
         * Search the freejoas
         */
    }

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <TextField
                    id="outlined-size-small"
                    placeholder='Search...'
                    size="small"
                >

                </TextField>
                <IconButton
                    color="primary"
                    aria-label="search"
                    component="span"
                    onClick={handleSearch}
                >
                    <SearchIcon />
                </IconButton>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector
                    slotProps={{ tooltip: { title: 'Change density' } }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    startIcon={<DoneIcon />}
                    style={{ marginRight: '8px' }}
                    disabled={rowSelectionModel.length === 0}
                    onClick={handleApprove}
                >
                    Approve
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    color="error"
                    startIcon={<DeleteForeverIcon />}
                    disabled={rowSelectionModel.length === 0}
                    onClick={handleDelete}
                >
                    Delete
                </Button>

                <GridToolbarExport
                    slotProps={{
                        tooltip: { title: 'Export data' },
                        button: { variant: 'outlined' },
                    }}
                />
            </GridToolbarContainer>
        );
    }

    return (
        <div>

            <div>
                <h2>Verified Freejoas Data</h2>
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
                            toolbar: CustomToolbar,
                        }}
                    />
                </Box>
            </div>
        </div>
    );
}

export default FreejoasManagement;