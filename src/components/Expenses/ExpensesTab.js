import {useAuth} from "../../auth/authContext";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../http/axiosInstance";
import {DropdownButton, Form, FormControl, InputGroup, Tab, Table, Tabs, Dropdown} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router";
import RawLink from "../Link/RawLink";

const ExpensesTab = () => {

    let auth = useAuth();
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = () => {
        axiosInstance(auth)
            .get('/expense')
            .then(res => setExpenses(res.data))
    }

    const removeExpense = (id) => {
        axiosInstance(auth)
            .delete(`/expense/${id}`)
            .then(() => fetchExpenses());
    }

    return (
        <Table size={"sm"} responsive variant={"secondary"}>
            <thead>
            <tr>
                <th colSpan={"2"}>Description</th>
                <th>Category</th>
                <th>Value</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {expenses && expenses.map(e => (
                <tr key={e.id}>
                    <td colSpan={"2"}>{e.description}</td>
                    <td>{e.category.name}</td>
                    <td>{e.value}</td>
                    <td>
                        <Button size={"sm"} className="m-1" variant="danger" onClick={() => removeExpense(e.id)}>
                            🅧
                        </Button>
                        <Button as={RawLink} size={"sm"} className="m-1" variant="warning" to={{
                            pathname: "/expenses/edit",
                            state: {
                                expense: e
                            }
                        }}>
                            ✎
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default ExpensesTab;