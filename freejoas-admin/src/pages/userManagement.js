import React, { useState, useEffect } from 'react';
import axios from '../service/axios';
import SessionStorageManager from '../service/SessionStorageManager';
import { USER, DATA_TYPES } from '../service/storageKeys';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CustomToolbar from '../components/CustomToolbar';


function UserManagement() {

    const [users, setUsers] = useState([]);
    const [rowSelectionModel, setRowSelectionModel] = useState([]);

    
    const columns = [
        {
            field: '_id',
            headerName: 'User ID',
            width: 250,
        },
        {
            field: 'username',
            headerName: 'Username',
            width: 100,
        },
        {
            field: 'firstname',
            headerName: 'Firstname',
            width: 100,
        },
        {
            field: 'lastname',
            headerName: 'Lastname',
            width: 100,
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 180,
        },
        {
            field: 'accountType',
            headerName: 'Role',
            width: 70,
        },
        {
            field: 'uploads',
            headerName: 'Uploads',
            width: 100,
        },
        {
            field: 'createdAt',
            headerName: 'Created At	',
            width: 200,
        },
    ];

    const fetchUsersFromAPI = async () => {
        // fetch users from the server
        try {
            const response = await axios.get('/user/all');
            if (response.data.data === null || response.data.data === undefined || response.data.data.length === 0) {
                console.log('No data');
                return;
            }
            console.log("API: /user/all called successfully");
            setUsers(()=>(response.data.data));
            SessionStorageManager().setItem(USER, response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const cachedUsers = SessionStorageManager().getItem(USER);
        if (cachedUsers) {
          setUsers(()=>(cachedUsers));
          console.log("cachedUsers");
        } else {
          fetchUsersFromAPI();
        }

    }, []);

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
                        rows={users}
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
                                dataType={DATA_TYPES.USERS} 
                                />
                        }}
                    />
                </Box>
            </div>
        </div>
    );
}

export default UserManagement;