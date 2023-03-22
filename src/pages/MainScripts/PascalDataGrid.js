import React from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';

import data from '../../localJsonData/anwesenheit.json';
import "../../css/PascalDataGrid.css";
import NameCellRender from '../Modal/NameCellRender';

const gridOptions = {
  // other properties...
  pagination: true,
  paginationPageSize: 25, // show 10 rows per page
  editable: true,


};


// Custom filter for status-dropdown
const CustomStatusFilter = (props) => {
  const { filter = {} } = props;

  const handleChange = (e) => {
    props.onFilterChanged({ ...filter, status: e.target.value });
  };

  return (
    <select value={filter.status || ''} onChange={handleChange}>
      <option value="">All</option>
      <option value="im Hause (Hamburg)">im Hause (Hamburg)</option>
      <option value="wird erwartet">wird erwartet</option>
      <option value="Krank">Krank</option>
      <option value="Urlaub">Urlaub</option>
      <option value="HomeOffice">HomeOffice</option>
      <option value="beim Kunden">beim Kunden</option>
    </select>
  );
};

class PascalDataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnsDefs: [
        { headerName: 'MITARBEITER', field: 'MITARBEITER',editable:true,floatingFilter:true },
        { headerName: 'POOL', field: 'POOL', editable:true , floatingFilter:true },
        { headerName: 'NAME', field: 'NAME', cellRendererFramework: NameCellRender,floatingFilter:true  },
        { headerName: 'NEBENSTELLE', field: 'NEBENSTELLE' },
        {
          headerName: 'status',
          field: 'status',
          filterFramework: CustomStatusFilter,
          filterParams: {
            values: [
              'im Hause (Hamburg)',
              'wird erwartet',
              'Krank',
              'Urlaub',
              'HomeOffice',
              'beim Kunden'
            ],
            onFilterChanged: this.handleFilterChanged // pass down the function
          }
        },
        { headerName: 'PERSONALNR', field: 'PERSONALNR' ,floatingFilter:true },
      ],
      originalData: data,
      rowData: data
    };
  }

  //handling the details
handleCellClicked = (event) => {
    const colId = event.column.getColId();
    if (colId === "NAME") {
      const rowData = event.data;
      const detailsPanel = document.getElementById("detailsPanel");
  
      detailsPanel.innerHTML = `<p>Name: ${rowData.NAME}</p>
      <br/>
      <p>Pool: ${rowData.POOL}</p>   <br/>
      <p>nebenstellet: ${rowData.NEBENSTELLE}</p>   <br/>
      <p>Status: ${rowData.status}</p>`;
    }
  };

  // Search funcalities
  handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredData = this.state.originalData.filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchQuery)
    );
    this.setState({ rowData: filteredData });
  };

  //filtering the data 
  handleFilterChanged = (filter) => {
    const { originalData } = this.state;

    const filteredData = originalData.filter((item) => {
      if (filter.MITARBEITER && !item.MITARBEITER.toLowerCase().includes(filter.MITARBEITER.toLowerCase())) {
        return true;
      }
      if (filter.POOL && !item.POOL.toLowerCase().includes(filter.POOL.toLowerCase())) {
        return false;
      }
      if (filter.NAME && !item.NAME.toLowerCase().includes(filter.NAME.toLowerCase())) {
        return false;
      }
      if (filter.NEBENSTELLE && !item.NEBENSTELLE.toLowerCase().includes(filter.NEBENSTELLE.toLowerCase())) {
        return false;
      }
      if (filter.status && item.status !== filter.status) {
        return false;
      }
      if (filter.PERSONALNR && !item.PERSONALNR.toLowerCase().includes(filter.PERSONALNR.toLowerCase())) {
        return false;
      }
      return true;
    });

    this.setState({ rowData: filteredData });
  };


 render(){


 return (
    <div className="grid-container">
    <div className="filter-container" >
      <label htmlFor="search">Search:</label> 
      <input type="text" id="search"  onChange={this.handleSearch} />
    
      </div>
    <div className='ag-theme-balham' 
    style={{
        width:1000,
        height:800,
      

    }}>
    
    <AgGridReact
   columnDefs={this.state.columnsDefs}
   rowData={this.state.rowData}
  
    frameworkComponents={{
      clickableCellRenderer: NameCellRender,
   }}
   floatingFilter={true}
   gridOptions={gridOptions}
   defaultColDef={{
    sortable: true,
    suppressClickEdit:true,

    filter: true,
    headerClass: 'custom-header',
    headerHeight: 18,
    cellClass: 'custom-cell',
    cellRenderer: 'ICellRenderer',
   }}

   onCellClicked={this.handleCellClicked}

 
></AgGridReact>
</div>
<div className="button-container">
  <div className="panel">
    <div className="toolbar">
      <span className="title">Mitearbeiter</span>
      <button className="close-btn" onClick={this.handleClosePanel}>
        X
      </button>
      <div id ="detailsPanel"></div>

    </div>
    
  </div>
</div>

  
</div>
);

}
}

export default PascalDataGrid;



         
