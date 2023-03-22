import React from "react";

class Datastored extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mitarbeiterName: "",
      value: "",
      timestamp: "",
      tableData: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("data") || "[]");
    this.setState({ tableData: data });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { mitarbeiterName, value } = this.state;
    const timestamp = new Date().toLocaleTimeString();
    const newData = {
      name: mitarbeiterName,
      status: value,
      timestamp: timestamp,
    };
    let data = JSON.parse(localStorage.getItem("data") || "[]");
    if (
      !data.some(
        (item) => item.name === newData.name && item.status === newData.status
      )
    ) {
      data.push(newData);
      localStorage.setItem("data", JSON.stringify(data));
      this.setState({ tableData: data });
    }
    this.setState({ timestamp });
    localStorage.setItem("mitarbeiterName", mitarbeiterName);
    localStorage.setItem("value", value);
  }

  handleEdit(index, field, value) {
    const newData = [...this.state.tableData];
    newData[index][field] = value;
    this.setState({ tableData: newData });
    localStorage.setItem("data", JSON.stringify(newData));
  }

  handleDelete(index) {
    const newData = [...this.state.tableData];
    newData.splice(index, 1);
    this.setState({ tableData: newData });
    localStorage.setItem("data", JSON.stringify(newData));
  }

  render() {
    const statusOptions = ["homeoffice", "in_house", "mittagspause", "feierabend"];
    const colorMap = {
        homeoffice: "#FFA500",
        in_house: "Green",
      mittagspause: "#90EE90",
      feierabend: "#FF4500",
    
    };
    return (
      <div>
        <table border="1" height="100%" width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Timestamp</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={this.state.mitarbeiterName}
                  onChange={(event) =>
                    this.setState({ mitarbeiterName: event.target.value })
                  }
                />
              </td>
              <td>
                <select
                  value={this.state.value}
                  onChange={(event) =>
                    this.setState({ value: event.target.value })
                  }
                >
                  <option value="">Select Status</option>
                  {statusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </td>
              <td>{this.state.timestamp}</td>
              <td>
                <button
                  disabled={!this.state.mitarbeiterName || !this.state.value}
                  onClick={this.handleSubmit}
                >
                  Add
                </button>
              </td>
              <td></td>
            </tr>
            {this.state.tableData.map((item, index) => (
              <tr
                key={index}
                style={{ backgroundColor: colorMap[item.status] }}
              >
                <td>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(event) =>
                      this.handleEdit(index, "name", event.target.value)
                    }
                  />
                </td>

                <td>
                  <select
                    value={item.status}
                    onChange={(event) =>
                      this.handleEdit(index, "status", event.target.value)
                    }
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{item.timestamp}</td>
                <td>
                  {" "}
                  <button onClick={() => this.handleDelete(index)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Datastored;
