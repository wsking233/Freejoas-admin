import React from 'react';
import { GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid';
import { Box, Button, IconButton, TextField } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from '@mui/icons-material/Sync';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PropTypes from 'prop-types';

function CustomToolbar({ selectedRowIds, showApprove, showDataTransfer, onTransfer, onSync, onDelete, onApprove }) {
    // Add prop validation for selectedRowIds
    CustomToolbar.propTypes = {
        selectedRowIds: PropTypes.array.isRequired,
        showApprove: PropTypes.bool.isRequired,
        showDataTransfer: PropTypes.bool.isRequired,
        onTransfer: PropTypes.func.isRequired,
        onSync: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onApprove: PropTypes.func.isRequired
    };


    return (
        <GridToolbarContainer>
            <IconButton
                color="primary"
                aria-label="approve"
                component="span"
                onClick={onSync}
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
            // onClick={handleSearch}
            >
                <SearchIcon />
            </IconButton>
            {showDataTransfer &&
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    startIcon={<FileCopyIcon />}
                    disabled={selectedRowIds.length === 0}
                    onClick={onTransfer}
                >
                    Data Transfer
                </Button>
            }

            <Box sx={{ flexGrow: 1 }} />
            {showApprove &&
                <Button
                    variant="contained"
                    size="small"
                    color="success"
                    startIcon={<DeleteForeverIcon />}
                    disabled={selectedRowIds.length === 0}
                    onClick={onApprove}
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
                onClick={onDelete}
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