// Import necessary components and modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import GetAppIcon from '@mui/icons-material/GetApp';
import { keyframes } from '@emotion/react';
import * as XLSX from 'xlsx';

// Styling for the table
const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

// Bouncing animation for the export button
const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

// Styled IconButton with bouncing animation
const BouncingIconButton = styled(IconButton)`
  animation: ${bounceAnimation} 1s;
`;

const AgentDatatable = () => {
  // State for holding data and managing filters
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for managing snackbar messages
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // State for date filtering
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8005/api/folders');
        setData(response.data.data);
        setFilteredData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Styled toolbar for date pickers and export button
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px'
  }));

  // Handle change in start date
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    filterData(newValue, endDate);
  };

  // Handle change in end date
  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    filterData(startDate, newValue);
  };

  // Filter data based on date range
  const filterData = (start, end) => {
    const filtered = data.filter((item) => {
      const itemDate = dayjs(item.yourDateProperty); // Replace 'yourDateProperty' with the actual property name
      return itemDate.isSameOrAfter(start) && itemDate.isSameOrBefore(end);
    });
    setFilteredData(filtered);
  };

  // Function to export data using API
  const exportDataApi = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/export_folder');
      if (response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'exported_folder_data.xlsx';
        link.click();
      } else {
        throw new Error('Invalid response from the server');
      }
      setSnackbarMessage('Données exportées avec succès.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error exporting data:', error);
      setSnackbarMessage(
        "Erreur lors de l'exportation des données. Veuillez réessayer."
      );
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Handle export button click
  const handleExportClick = async () => {
    if (filteredData.length === 0) {
      setSnackbarMessage("Aucune donnée disponible pour l'exportation.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Call export API function
    exportDataApi();
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle page change
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log('behy', filteredData);
  return (
    <Box style={{ width: '100%' }}>
      {/* Toolbar with date pickers and export button */}
      <StyledToolbar>
        <Grid item xs={12} sm={6} md={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              {/* Start date picker */}
              <DatePicker
                label="Date de début"
                value={startDate}
                onChange={handleStartDateChange}
              />
              {/* End date picker */}
              <DatePicker label="Date de fin" value={endDate} onChange={handleEndDateChange} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        {/* Export button */}
        <Button color="primary" onClick={handleExportClick}>
          <BouncingIconButton>
            <GetAppIcon fontSize="medium" />
          </BouncingIconButton>
        </Button>
      </StyledToolbar>
      {/* Table for displaying data */}
      <StyledTable sx={{ marginBottom: '20%' }}>
        <TableHead>
          {/* Table header */}
          <TableRow>
            {' '}
            <TableCell align="center"> Intitulée</TableCell>
            <TableCell align="center">Dossier</TableCell>
            <TableCell align="center">Reference</TableCell>
            <TableCell align="center">Société</TableCell>
            <TableCell align="center">Date du début</TableCell>
            <TableCell align="center"> Date fin</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(filteredData) &&
            filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow key={item.id} hover>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.ref_audit}</TableCell>
                <TableCell align="center">{item.reference}</TableCell>
                <TableCell align="center">{item.society_reference}</TableCell>{' '}
                <TableCell align="center">{item.start_date}</TableCell>
                <TableCell align="center">{item.due_date}</TableCell>
                <TableCell align="center">{item.state_entitled}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
      {/* Pagination for the table */}
      <TablePagination
        component="div"
        rowsPerPageOptions={[25, 50, 100, 250, 1000]}
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count} `}
        nextIconButtonProps={{ 'aria-label': 'Page suivante' }}
        backIconButtonProps={{ 'aria-label': 'Page précédente' }}
      />
      {/* Snackbar for displaying messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {/* Snackbar alert */}
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AgentDatatable;
