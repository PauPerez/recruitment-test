import React, { Component, useState } from 'react';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            name: "",
            value: 0,
            sum:0
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

    postEmployeesList() {
        var employees = this.state.employees;

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employees),
        };

        fetch("List/ApplyChanges", options).then(data => {
            if (!data.ok) {
                throw Error(data.status);
            }
            return data;
        }).then(update => {
            console.log(update);
            fetch("List")
                .then((response) => {
                    return response.json()
                })
                .then((sum) => {
                    this.setState({ sum: sum })
                });
        }).catch(e => {
            console.log(e);
        });

        
    }

    handleEmployeeChanged(i, event) {
        var employees = this.state.employees;

        if (event.target.name === "name") {
            employees[i].name = event.target.value;
        } else {
            employees[i].value = event.target.value;
        }

        this.setState({
            employees: employees
        });
    }

    handleEmployeeDelete(i) {
        var employees = this.state.employees;

        employees.splice(i, 1);

        this.setState({
            employees: employees
        });

        this.postEmployeesList();
    }

    handleClick() {
        
        var employee = { name: this.state.name, value: this.state.value };
        var employees = this.state.employees;
        if (employee.name != "") {


            employees.push(employee);

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(employee),
            };

            fetch("List/addEmployee", options).then(data => {
                if (!data.ok) {
                    throw Error(data.status);
                }
                return data;
            }).then(update => {
                console.log(update);
                fetch("List")
                    .then((response) => {
                        return response.json()
                    })
                    .then((sum) => {
                        this.setState({ sum: sum })
                    });
            }).catch(e => {
                console.log(e);
            });

            this.setState({
                employees: employees
            });
        }
    }

    componentDidMount() {
        fetch("Employees")
            .then((response) => {
                return response.json()
            })
            .then((employees) => {
                this.setState({ employees: employees })
            });

        fetch("List")
            .then((response) => {
                return response.json()
            })
            .then((sum) => {
                this.setState({ sum: sum })
            });
        
    }

    renderRows() {
        var context = this;

        return this.state.employees.map((emp, i) => (
                <tr key={i}>
                <td>{i + 1}</td>
                <td><input name="name" type="text" value={emp.name} onChange={context.handleEmployeeChanged.bind(context, i)} onBlur={context.postEmployeesList.bind(this)} required /></td>
                <td><input name="value" type="number" value={emp.value} onChange={context.handleEmployeeChanged.bind(context, i)} onBlur={context.postEmployeesList.bind(this)} required /></td>
                <td><button onClick={context.handleEmployeeDelete.bind(context, i)} >Delete</button></td>
                </tr>
            ))
        
    }

    renderSum() {
        var context = this;

        return <h3> {this.state.sum} </h3>
    }

    render() {
    return (
        <div>
            <h2>sum of all Values for all Names that begin with A, B or C</h2>
            <h2>Employees Data</h2>
            {this.renderSum()}
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
