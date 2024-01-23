// ExportData.js
import React, { useState } from 'react';
import axios from 'axios';
import { IconButton, Snackbar, Alert, styled } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { keyframes } from '@emotion/react';

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

const ExportData = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleExportClick = async () => {
    try {
      const response = await axios.get('http://localhost:8005/api/export_user', {
        responseType: 'blob',
        withCredentials: true
      });

      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'data_exported.xlsx';
      link.click();

      setSnackbarMessage('Les données ont été exportées avec succès.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error exporting data:', error);
      console.log('Error Response:', error.response);
      setSnackbarMessage("Erreur lors de l'exportation des données. Veuillez réessayer.");
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <BouncingIconButton color="" onClick={handleExportClick}>
        <GetAppIcon fontSize="small" />
      </BouncingIconButton>
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
    </>
  );
};

export default ExportData;
