import React from 'react';


class Anwesenheit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mitarbeiterName: '',
      value: 'in_house'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const mitarbeiterName = localStorage.getItem('mitarbeiterName');
    const value = localStorage.getItem('value');
    //console.log(localStorage.getItem("mitarbeiterName"));
    //console.log(localStorage.getItem("value"));

    if (mitarbeiterName) {
      this.setState({ mitarbeiterName: mitarbeiterName });
    }
    if (value) {
      this.setState({ value: value });
    }

  }

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('mitarbeiterName', this.state.mitarbeiterName);
    localStorage.setItem('value', this.state.value);
    //console.log(this.state.mitarbeiterName ,'is currently  in ' , this.state.value);
  }

  render() {
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
                value={this.state.mitarbeiterName}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Current Status:</label>
              <select
                className="form-control"
                id="value"
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

export default Anwesenheit;