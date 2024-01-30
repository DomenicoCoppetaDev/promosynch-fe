import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme


export default function ClientsGrid({clientsToShow}){
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState(clientsToShow);
    
    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
      { field: "name" },
      { field: "surname" },
      { field: "email" },
      { field: "checked-in" }
    ]);

    return (
        <div>
            <AgGridReact  rowData={rowData} columnDefs={colDefs} />
        </div>
    )
  }