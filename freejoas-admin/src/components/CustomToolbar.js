import React from 'react';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';

function CustomToolbar() {

    const handleApprove = async (e) => {
        e.preventDefault();
        console.log('Approve Clicked');
        /**
         *  Approve the selected freejoas
         */

    }

    const handleDelete = async (e) => {
        e.preventDefault();
        console.log('Delete Clicked');
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
                color="error"
                startIcon={<DeleteForeverIcon />}
                // disabled=
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