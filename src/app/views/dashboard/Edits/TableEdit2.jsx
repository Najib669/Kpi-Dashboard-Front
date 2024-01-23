import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
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

// Styled components
const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}));

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

const BouncingIconButton = styled(IconButton)`
  animation: ${bounceAnimation} 1s;
`;

const Datatable = () => {
  // State for managing data and UI
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  // Fetch data from the API on component mount
  useEffect(() => {
    console.log('useEffect');

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8005/api/statuses');
        console.log('rrrrrrrdata', response);

        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('rrrrrrrdata', data);
  // Styled Toolbar component
  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px'
  }));

  // Handle date change for start date
  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    filterData(newValue, endDate);
  };

  // Handle date change for end date
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

  // Handle export button click
  const handleExportClick = async () => {
    try {
      if (filteredData.length === 0) {
        throw new Error("Aucune donnée disponible pour l'exportation.");
      }

      const worksheet = XLSX.utils.json_to_sheet(filteredData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

      // Save the workbook as a file
      XLSX.writeFile(workbook, 'exported_data.xlsx');

      setSnackbarMessage('Données exportées avec succès.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error exporting data:', error);
      setSnackbarMessage("Erreur lors de l'exportation des données. Veuillez réessayer.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Handle page change in pagination
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change in pagination
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box style={{ width: '100%' }}>
      {/* Date pickers, export button, and ExportData component */}
      <StyledToolbar>
        <Grid item xs={12} sm={6} md={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="Date de début"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <DatePicker label="Date de fin" value={endDate} onChange={handleEndDateChange} />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <BouncingIconButton onClick={handleExportClick} aria-label="Exporter">
          <GetAppIcon />
        </BouncingIconButton>
        {/* Use the ExportData component here */}
      </StyledToolbar>

      {/* Data table */}
      <StyledTable style={{ height: 300, width: '100%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">INgenieur</TableCell>
            <TableCell align="center">Dossier Cloturé</TableCell>
            <TableCell align="center">Dossier Modifié</TableCell>
            <TableCell align="center">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(data) &&
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow key={item.id} hover>
                <TableCell align="center">{item.name_status}</TableCell>
                <TableCell align="center">{item.Audite}</TableCell>
                <TableCell align="center">{item.a_modifier}</TableCell>

                <TableCell align="center">{item.t_Status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      {/* Pagination */}
      <TablePagination
        component="div"
        rowsPerPageOptions={[25, 50, 100, 250, 1000]}
        count={Array.isArray(filteredData) ? filteredData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Lignes par page"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count} `}
        nextIconButtonProps={{ 'aria-label': 'Page suivante' }}
        backIconButtonProps={{ 'aria-label': 'Page précédente' }}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Datatable;
