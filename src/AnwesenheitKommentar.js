import React from "react";
export default function AnwesenheitKommentar () {
  return <h1>My Dashboard</h1>
}

/*
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@material-ui/core";


const colorMap = {
  in_house: "#ffcccb",
  homeoffice: "#90ee90",
  mittagspause: "#add8e6",
  feireabend :"#777"
};

const statusOptions = ["in_house", "homeoffice", "mittagspause", "feireabend"];

const styles = {
  input: {
    width: "100%",
  },
  button: {
    marginTop: "1rem",
  },
};

class AnwesenheitKommentar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      mitarbeiterName: "",
      value: "",
    };
  }

  handleEdit = (index, field, value) => {
    const tableData = [...this.state.tableData];
    tableData[index][field] = value;
    this.setState({ tableData });
  };

  handleDelete = (index) => {
    const tableData = [...this.state.tableData];
    tableData.splice(index, 1);
    this.setState({ tableData });
  };

  handleSubmit = () => {
    const { mitarbeiterName, value } = this.state;
    const newTableData = [
      ...this.state.tableData,
      {
        name: mitarbeiterName,
        status: value,
        timestamp: new Date().toLocaleString(),
      },
    ];
    this.setState({
      tableData: newTableData,
      mitarbeiterName: "",
      value: "",
    });
  };

  render() {
    const { classes = {} } = this.props;
    const { tableData, mitarbeiterName, value } = this.state;
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <TextField
                className={classes.input}
                value={mitarbeiterName}
                onChange={(event) =>
                  this.setState({ mitarbeiterName: event.target.value })
                }
              />
            </TableCell>
            <TableCell>
              <Select
                value={value}
                onChange={(event) =>
                  this.setState({ value: event.target.value })
                }
              >
                <MenuItem value="">Select Status</MenuItem>
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </TableCell>
            <TableCell>{new Date().toLocaleString()}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={!mitarbeiterName || !value}
                onClick={this.handleSubmit}
              >
                Add
              </Button>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          {tableData.map((item, index) => (
            <TableRow
              key={index}
              style={{ backgroundColor: colorMap[item.status] }}
            >
              <TableCell>
                <TextField
                  className={classes.input}
                  value={item.name}
                  onChange={(event) =>
                    this.handleEdit(index, "name", event.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Select
                  value={item.status}
                  onChange={(event) =>
                    this.handleEdit(index, "status", event.target.value)
                  }
                >
                  <MenuItem value="">Select Status</MenuItem>
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>{item.timestamp}</TableCell>
              <TableCell>
                <Button
                  disabled={!item.name || !item.status}
                  onClick={() => this.handleEditSubmit(index)}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => this.handleDelete(index)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}  
*/
        
