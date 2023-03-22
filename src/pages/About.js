import React from 'react';
import { DataGrid, Column } from 'react-data-grid';

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mitarbeiterName: '',
      value: '',
      timestamp: '',
      tableData: [],
      filters: {}
    };
    
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem('data') || '[]');
    this.setState({ tableData: data });
  }

   handleEdit(index, field, value) {
    const newData = [...this.state.tableData];
    newData[index][field] = value;
    this.setState({ tableData: newData });
    localStorage.setItem('data', JSON.stringify(newData));
  }
  handleSubmit(event) {
    event.preventDefault();
    const { mitarbeiterName, value } = this.state;
    const timestamp = new Date().toLocaleTimeString();
    const newData = {
      name: mitarbeiterName,
      status: value,
      timestamp: timestamp
    };
    let data = JSON.parse(localStorage.getItem('data') || '[]');
    if (!data.some((item) => item.name === newData.name && item.status === newData.status)) {
      data.push(newData);
      localStorage.setItem('data', JSON.stringify(data));
      this.setState({ tableData: data });
    }
    this.setState({ timestamp });
    localStorage.setItem('mitarbeiterName', mitarbeiterName);
    localStorage.setItem('value', value);
  }

  handleFilterChange(event) {
    this.setState({ statusFilter: event.target.value });
  }

  render() {
    const statusOptions = ['homeoffice', 'mittagspause', 'in_house','feierabend'];
    const statusColors = { 'homeoffice': 'orange', 'in_house': 'green', 'mittagspause': 'pink' ,'feierabend':'red'  };
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.mitarbeiterName} onChange={(event) => this.setState({ mitarbeiterName: event.target.value })} />
          </label>
          <label>
            Status:
            <select value={this.state.value} onChange={(event) => this.setState({ value: event.target.value })}>
              {statusOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
        <br />
        <label>
          Filter by Status:
          <select value={this.state.statusFilter} onChange={this.handleFilterChange}>
            <option value="">All</option>
            {statusOptions.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <br />
        <DataGrid
  columns={[
    <Column key="name" header="Name" field="name" />,
    <Column key="status" header="Status" field="status" />,
    <Column key="timestamp" header="Timestamp" field="timestamp" />
  ]}
  rows={this.state.tableData}
  rowKey="timestamp"
  onGridSort={(sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      } else if (sortDirection === 'DESC') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };
    const sortedRows = sortDirection === 'NONE' ? this.state.tableData : [...this.state.tableData].sort(comparer);
    this.setState({ tableData: sortedRows });
  }}
  onAddFilter={(columnKey, value, operator) => {
    const filters = { ...this.state.filters };
    filters[columnKey] = { value, operator };
    const filteredRows = this.state.tableData.filter(row => {
      let include = true;
      Object.entries(filters).forEach(([columnKey, { value, operator }]) => {
        if (operator === 'contains') {
          include = include && row[columnKey].includes(value);
        } else if (operator === 'equals') {
          include = include && row[columnKey] === value;
        }
      });
      return include;
    });
    this.setState({ tableData: filteredRows });
  }}
  onClearFilters={() => this.setState({ filters: {} })}
/>

      </div>
    );
            }
          }
    export default About;