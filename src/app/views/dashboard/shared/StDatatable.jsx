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

const AgentDatatable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8005/api/statuses');
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px'
  }));

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    filterData(newValue, endDate);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    filterData(startDate, newValue);
  };

  const filterData = (start, end) => {
    const filtered = data.filter((item) => {
      const itemDate = dayjs(item.yourDateProperty); // Replace 'yourDateProperty' with the actual property name
      return itemDate.isSameOrAfter(start) && itemDate.isSameOrBefore(end);
    });
    setFilteredData(filtered);
  };

  const handleExportClick = async () => {
    if (filteredData.length === 0) {
      setSnackbarMessage("Aucune donnée disponible pour l'exportation.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    try {
      // Prepare the worksheet data
      const worksheetData = filteredData.map((item) => ({
        Intitulée: item.name_status,
        'a modifier': item.a_modifier,
        'a vérifier': item.a_verifie,
        Annulé: item.Annule,
        Audité: item.Audite,
        'En cours': item.En_cours,
        'En pause': item.En_pause,
        Incomplet: item.Incomplet,
        Nouveau: item.Nouveau,
        'Total Changement': item.t_Status
      }));

      // Create a worksheet
      const worksheet = XLSX.utils.json_to_sheet(worksheetData);

      // Create a workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

      // Save the workbook as a file
      XLSX.writeFile(workbook, 'exported_data.xlsx');

      // Call the export API
      await axios.get('http://localhost:8005/api/export_user');

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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box style={{ width: '100%' }}>
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
        <Button color="primary" onClick={handleExportClick}>
          <BouncingIconButton>
            <GetAppIcon fontSize="medium" />
          </BouncingIconButton>
        </Button>
      </StyledToolbar>
      <StyledTable sx={{ marginBottom: '20%' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Intitulée</TableCell>
            <TableCell align="center">a modifier</TableCell>
            <TableCell align="center">a vérifier</TableCell>
            <TableCell align="center">Annulé</TableCell>
            <TableCell align="center">Audité</TableCell>
            <TableCell align="center">En cours</TableCell>
            <TableCell align="center">En pause</TableCell>
            <TableCell align="center">Incomplet</TableCell>
            <TableCell align="center">Nouveau</TableCell>
            <TableCell align="center">Total Changement</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(filteredData) &&
            filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow key={item.id} hover>
                <TableCell align="center">{item.name_status}</TableCell>
                <TableCell align="center">{item.a_modifier}</TableCell>
                <TableCell align="center">{item.a_verifie}</TableCell>
                <TableCell align="center">{item.Annule}</TableCell>
                <TableCell align="center">{item.Audite}</TableCell>
                <TableCell align="center">{item.En_cours}</TableCell>
                <TableCell align="center">{item.En_pause}</TableCell>
                <TableCell align="center">{item.Incomplet}</TableCell>
                <TableCell align="center">{item.Nouveau}</TableCell>
                <TableCell align="center">{item.t_Status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>
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

export default AgentDatatable;
