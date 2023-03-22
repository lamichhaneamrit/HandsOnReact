import React from 'react';

class AnwesenheitStatus extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'in_house'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
     
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
      //localStorage.setItem('status', this.state.status);
    console.log(this.state.status);
      //alert('Your Current Status is : ' + this.state.value);
      //event.preventDefault();
    }
  
    render() {
      return (
        <div className="card mx-auto w-50">
        <div className="panel-heading">Update Your Status</div>
        <div className="card-body">
          <form onSubmit={this.handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="status">Current Status:</label>
              <select
                className="form-control"
                id="status"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <option value="in_house">In House</option>
                <option value="homeoffice">Homeoffice</option>
                <option value="mittagspause">Mittagspause</option>
                <option value="feierabend">Feierabend</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      );
    }
  }
  

  export default AnwesenheitStatus;