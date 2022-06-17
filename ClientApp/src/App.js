import React, { Component } from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
    }

    componentDidMount() {
        fetch("Employees")
            .then((response) => {
                return response.json()
            })
            .then((employees) => {
                this.setState({ employees: employees })
            })
    }

  render () {
    return (
        <div>
            <h2>Employees Data</h2>
            <b>Add a new Employee</b><button>New</button>
            <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.employees.map((emp, i) => (
                        <tr key={i}>
                            <td>{i+1}</td>
                            {Object.values(emp).map(val => { return <td>{val}</td> })}
                            <td><button>Delete</button><button>Edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  }
}
