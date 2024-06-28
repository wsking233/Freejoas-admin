import React from 'react';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from '@mui/icons-material/Sync';
import axios from '../service/axios';
import { DATA_TYPES } from '../service/storageKeys';

function CustomToolbar({ selectedRowIds, showApprove, dataType }) {

    const handleApprove = async () => {
        console.log('Approve Clicked', selectedRowIds);
        /**
         * Approve the selected freejoas
         */
        await axios.post('/admin/123',
            { freejoaIds: selectedRowIds }
        ).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.error(err);
        });

    }

    const deletePendingFreejoas = async () => {
        console.log('Delete Pending Freejoas Clicked', selectedRowIds);
        await axios.delete('/admin/123',
            { freejoaIds: selectedRowIds }
        ).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.error(err);
        });
    }

    const deleteVerifiedFreejoas = async () => {
        console.log('Delete Verified Freejoas Clicked', selectedRowIds);
    }

    const deleteUsers = async () => {
        console.log('Delete Users Clicked', selectedRowIds);
    }

    const handleDelete = async () => {
        console.log('Delete Clicked');
        /**
         * Delete the selected freejoas
         *  
         * */
        switch (dataType) {
            case DATA_TYPES.PENDING_FREEJOAS:
                deletePendingFreejoas();
                break;
            case DATA_TYPES.VERIFIED_FREEJOAS:
                deleteVerifiedFreejoas();
                break;
            case DATA_TYPES.USERS:
                deleteUsers();
                break;
            default:
                console.error('Invalid data type');
        }
    }

    const handleSearch = () => {
        console.log('Search Clicked');
        /**
         * Search the freejoas
         */
    }

    const handlePendingFreejoasSync = async () => {
        console.log('Sync Pending Freejoas Clicked');
    }

    const handleVerifiedFreejoasSync = async () => {
        console.log('Sync Verified Freejoas Clicked');
    }

    const handleUsersSync = async () => {
        console.log('Sync Users Clicked');
    }


    const handleSync = () => {
        console.log('Sync Clicked');
        /**
         * Sync the freejoas
         */
        switch (dataType) {
            case DATA_TYPES.PENDING_FREEJOAS:
                handlePendingFreejoasSync();
                break;
            case DATA_TYPES.VERIFIED_FREEJOAS:
                handleVerifiedFreejoasSync();
                break;
            case DATA_TYPES.USERS:
                handleUsersSync();
                break;
            default:
                console.error('Invalid data type');
        }
    }

    return (
        <GridToolbarContainer>
            <IconButton
                color="primary"
                aria-label="approve"
                component="span"
                onClick={handleSync}
            >
                <SyncIcon />
            </IconButton>

            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector
                slotProps={{ tooltip: { title: 'Change density' } }}
            />
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
            <Box sx={{ flexGrow: 1 }} />
            {showApprove &&
                <Button
                    variant="contained"
                    size="small"
                    color="success"
                    startIcon={<DeleteForeverIcon />}
                    disabled={selectedRowIds.length === 0}
                    onClick={handleApprove}
                >
                    Approve
                </Button>
            }
            <Button
                variant="contained"
                size="small"
                color="error"
                startIcon={<DeleteForeverIcon />}
                disabled={selectedRowIds.length === 0}
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

export default CustomToolbar;