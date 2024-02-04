import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function AgGridExample({data}){
  // Dati di esempio
  const rowData = data

  // Definizione delle colonne della griglia
  const columnDefs = [
    { headerName: 'Name', field: 'name', flex:2 },
    { headerName: 'Surname', field: 'surname', flex:2 },
    { headerName: 'Email', field: 'email', flex:6 },
    { headerName: 'Checked-In', field: 'checkedIn', cellDataType:'boolean', flex:1}
  ];

  return (
    <div className="ag-theme-alpine" style={{ width: '100%', height: '100%' }} >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        domLayout='autoHeight'
      />
    </div>
  );
};

;
