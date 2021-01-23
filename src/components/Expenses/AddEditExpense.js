import React, {useEffect, useState} from "react";
import axiosInstance from "../../http/axiosInstance";
import {useAuth} from "../../auth/authContext";
import {Redirect} from "react-router";
import {Col, Container, Dropdown, DropdownButton, InputGroup, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import history from "../../history/history";

const AddEditExpense = (props) => {
    let expense = props.location && props.location.state && props.location.state.expense ? props.location.state.expense : undefined;
    const [categories, setCategories] = useState([]);
    const [expenseToAdd, setExpenseToAdd] = useState(expense ?
        {...expense} : {
            description: '',
            value: 0,
            category: {
                id: 0,
                name: ''
            }
        });
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // fetchExpenses();
        fetchCategories();
    }, []);

    let auth = useAuth();
    const fetchCategories = () => {
        axiosInstance(auth)
            .get('/category')
            .then(res => setCategories(res.data))
    };

    function saveExpense(e) {
        e.preventDefault();
        expense ?
            axiosInstance(auth)
                .put(`/expense/${expense.id}`, {
                    description: expenseToAdd.description,
                    value: expenseToAdd.value,
                    category: expenseToAdd.category.id
                })
                .then(() => history.push("/expenses"))
                .catch(() => setErrorMessage('Unable to update an expense')) :
            axiosInstance(auth)
                .post('/expense', {
                    description: expenseToAdd.description,
                    value: expenseToAdd.value,
                    category: expenseToAdd.category.id
                })
                .then(() => history.push("/expenses"))
                .catch(() => setErrorMessage('Unable to create an expense'));

    }

    return (
        <Container className="align-items-center d-flex flex-column justify-content-center">
            <Container as={Col} sm="12" md="8" lg="6" className={"d-flex flex-column justify-content-center"}>
                <Form onSubmit={saveExpense}>
                    <Form.Group controlId="formCategory">
                        <Form.Control
                            style={{opacity: '0.95'}}
                            size="lg"
                            type="text"
                            placeholder="Description"
                            value={expenseToAdd.description}
                            onChange={(e) => setExpenseToAdd({...expenseToAdd, description: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategory" className={"btn-block"}>
                        <DropdownButton
                            className={"btn-block"}
                            as={InputGroup.Prepend}
                            variant="light"
                            title={expenseToAdd.category && expenseToAdd.category.name ? expenseToAdd.category.name : 'Category'}
                            id="category-dropdown"
                        >
                            {categories && categories.map(category =>
                                <Dropdown.Item
                                    key={category.id}
                                    onSelect={() => setExpenseToAdd({...expenseToAdd, category})}
                                    href="#"
                                >
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </DropdownButton>
                    </Form.Group>
                    <Form.Group controlId="formValue">
                        <Form.Control
                            style={{opacity: '0.95'}}
                            size="lg"
                            type="text"
                            placeholder="Value"
                            value={expenseToAdd.value}
                            onChange={(e) => setExpenseToAdd({...expenseToAdd, value: e.target.value})}
                        />
                    </Form.Group>
                    {errorMessage && <p className="warning text-center">{errorMessage}</p>}
                    <Row className="justify-content-center">
                        <Button variant="dark" type="submit" size={"md"}>
                            {expense ? 'Update' : 'Create'}
                        </Button>
                    </Row>
                </Form>
            </Container>
        </Container>
    );
}

export default AddEditExpense;