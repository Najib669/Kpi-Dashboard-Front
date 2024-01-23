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
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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

const TableEdit4 = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage] = useState('');
  const [snackbarSeverity] = useState('success');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8005/api/users', {
        withCredentials: true
      });

      if (Array.isArray(response.data)) {
        setData(response.data);
        setFilteredData(response.data);
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

  // Function to determine the background color based on KPI value
  const getBackgroundColor = (value) => {
    if (value >= 90) {
      return '#7ed321'; // Green for high performance
    } else if (value >= 70) {
      return '#ffcc00'; // Yellow for moderate performance
    } else {
      return ''; // Add a default color if needed
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = data.filter(
      (item) =>
        item.name_ingenieur.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.nb_dossier_client.toString().includes(event.target.value) ||
        item.nb_dossier_ing.toString().includes(event.target.value)
    );
    setFilteredData(filtered);
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
        <IconButton>
          <ExportData />
        </IconButton>
      </StyledToolbar>
      <StyledTable sx={{ height: '300px !important' }}>
        <TableHead>
          <TableRow>
            <TableCell align="center"> Reference</TableCell>
            <TableCell align="center"> Intitulée</TableCell>
            <TableCell align="center">
              {' '}
              Modification <br /> du Client
            </TableCell>
            <TableCell align="center">
              {' '}
              Modification <br /> d'Ingenieur
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
            <TableRow key={item.id}>
              <TableCell align="center">{item.reference}</TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.count_modification}</TableCell>
              <TableCell align="center">{item.count_modification}</TableCell>
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

export default TableEdit4;
