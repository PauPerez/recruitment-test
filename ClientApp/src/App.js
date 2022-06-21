import React, { Component, useState } from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            name: "",
            value: 0
        };
    }

    updateEmployee(event) {
        if (event.target.name === "name") {
            this.setState({
                name: event.target.value
            });
        } else {
            this.setState({
                value: event.target.value
            });
        }
    }

    handleClick() {
        
        var employee = { name: this.state.name, value: this.state.value };
        var employees = this.state.employees;

        employees.push(employee);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        };

        fetch("List", options).then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data;
        }).then(update => {
            console.log(update);
        }).catch(e => {
            console.log(e);
        });

        this.setState({
            employees: employees
        });
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

    renderRows() {
        return this.state.employees.map((emp, i) => (
                <tr key={i}>
                <td>{i + 1}</td>
                <td><input name="name" type="text" value={ emp.name }/></td>
                <td><input name="value" type="number" value={ emp.value }/></td>
                <td><button>Delete</button><button>Edit</button></td>
                </tr>
            ))
        
    }

    render() {
    return (
        <div>
            <h2>Employees Data</h2>
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
                    <tr>
                        <td></td>
                        <td><input type="text" name="name" onChange={this.updateEmployee.bind(this)} /></td>
                        <td><input type="number" name="value" onChange={this.updateEmployee.bind(this)} /></td>
                        <td><button onClick={this.handleClick.bind(this)} >Add</button></td>
                    </tr>
                    {this.renderRows()}
                </tbody>
            </table>
        </div>
    );
  }
}
