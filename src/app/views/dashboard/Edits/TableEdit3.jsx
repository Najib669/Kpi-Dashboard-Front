import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  TextField,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Button // Add this import statement
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GetAppIcon from '@mui/icons-material/GetApp';
import ExportData from '../shared/ExportData';

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  '& thead': {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    '& tr': {
      '& th': {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  '& tbody': {
    '& tr': {
      '& td': {
        paddingLeft: theme.spacing(2),
        textTransform: 'capitalize',
        borderBottom: `1px solid ${theme.palette.divider}`
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    }
  }
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center', // Align items to center vertically
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

const TableEdit3 = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/folders', {
        withCredentials: true
      });

      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
        setFilteredData(response.data.data);
      } else {
        console.error('Invalid API response. Expected an array.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('AxiosError:', error.message);
        console.error('Response data:', error.response?.data);
        console.error('Response status:', error.response?.status);
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSort = (column) => {
    const isAsc = sortBy === column && sortOrder === 'asc';
    setSortBy(column);
    setSortOrder(isAsc ? 'desc' : 'asc');

    setFilteredData();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = data.filter(
      (item) =>
        item.reference.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.count_modification.toString().includes(event.target.value)
    );
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
        Intitulée: item.assigned_user_name,
        'Total dossier cloturé': item.total_folders_assigned_user,
        'Durée de traitement': item.duration,
        'Date fin Prévue': item.due_date
      }));

      // Trigger the export
      ExportData(worksheetData, 'exported_data.xlsx');

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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <Box style={{ width: '100%' }}>
      <StyledToolbar>
        <TextField
          label="Rechercher"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment align="center">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Button color="primary" onClick={handleExportClick}>
          {/* You can replace BouncingIconButton with IconButton */}
          <IconButton>
            <GetAppIcon fontSize="medium" />
          </IconButton>
        </Button>
      </StyledToolbar>
      <StyledTable sx={{ height: '300px !important' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Intitulée</TableCell>
            <TableCell align="center">Total dossier cloturé</TableCell>
            <TableCell align="center">Durée de traitement</TableCell>
            <TableCell align="center">Date fin Prévue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(filteredData) &&
            filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
              <TableRow key={item.id}>
                <TableCell align="center">{item.assigned_user_name}</TableCell>
                <TableCell align="center">{item.total_folders_assigned_user}</TableCell>
                <TableCell align="center">{item.duration}</TableCell>
                <TableCell align="center">{item.due_date}</TableCell>
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
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TableEdit3;
