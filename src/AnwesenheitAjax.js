import React from 'react';

class AnwesenheitAjax extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mitarbeiterName: '',
      value: 'in_house',
      timestamp: '',
      tableData:[]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem('data') || '[]');
    this.setState({ tableData: data });
  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {mitarbeiterName, value } = this.state;
    const timestamp = new Date().toLocaleTimeString();
    this.setState({ timestamp });
    const newData = {
      name:mitarbeiterName,
      status:value,
      timestamp:timestamp
    };
    let data = JSON.parse(localStorage.getItem('data') || '[]'); // get existing data or an empty array if none exists
if (!Array.isArray(data)) {
  data = []; // set data to an empty array if it is not already an array
}
data.push(newData); // add new data to existing data array
localStorage.setItem('data', JSON.stringify(data)); // save all data to local storage

    
    // Make the AJAX request
    fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: mitarbeiterName,
        status: value,
        timestamp: timestamp
      })
    }).then(response => {
      if (response.ok) {
        console.log('Data saved successfully');
        this.setState({data:data});//update all data
        window.location.reload(); // reload browser automatically
        
        
     }  else {
        console.error('Failed to save data');
      }
    }).catch(error => {
      console.error('Error saving data', error);
    
    });

localStorage.setItem('mitarbeiterName', mitarbeiterName);
localStorage.setItem('value', value);
  }

  render() {
    const { mitarbeiterName, value, timestamp } = this.state;
    const statusWithTimestamp = value + ' from ' + timestamp;
    return (
      <div className="card mx-auto w-50">
        <div className="card-body">
          <form onSubmit={this.handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="mitarbeiterName">MitarbeiterName:</label>
              <input
                type="text"
                className="form-control"
                id="mitarbeiterName"
                value={mitarbeiterName}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Current Status:</label>
              <select
                className="form-control"
                id="value"
                value={value}
                onChange={this.handleChange}
              >
                <option value="in_house">In House</option>
                <option value="homeoffice">Homeoffice</option>
                <option value="mittagspause">Mittagspause</option>
                <option value="feierabend">Feierabend</option>
              </select>
            </div>

        <div className="form-group">
          <label htmlFor="statusWithTimestamp">Status with Timestamp:</label>
          <input
            type="text"
            className="form-control"
            id="statusWithTimestamp"
            value={statusWithTimestamp}
            readOnly
          />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>
  </div>
);
  }
}

export default AnwesenheitAjax;