import React, {useState} from "react";
import {useAuth} from "../../auth/authContext";
import axiosInstance from "../../http/axiosInstance";
import history from "../../history/history";
import {Col, Container, Dropdown, DropdownButton, InputGroup, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AddEditCategory = (props) => {
    let category = props.location && props.location.state && props.location.state.category ? props.location.state.category : undefined;
    const [categoryToAdd, setCategoryToAdd] = useState(category ? {...category} : {
        name: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    let auth = useAuth();

    function saveCategory(e) {
        e.preventDefault();
        category ?
            axiosInstance(auth)
                .put(`/category/${category.id}`, {
                    name: categoryToAdd.name
                })
                .then(() => history.push("/categories"))
                .catch(() => setErrorMessage('Unable to update a category')) :
            axiosInstance(auth)
                .post('/category', {
                    name: categoryToAdd.name
                })
                .then(() => history.push("/categories"))
                .catch(() => setErrorMessage('Unable to create a category'));

    }

    return (
        <Container className="align-items-center d-flex flex-column justify-content-center">
            <Container as={Col} sm="12" md="8" lg="6" className={"d-flex flex-column justify-content-center"}>
                <Form onSubmit={saveCategory}>
                    <Form.Group controlId="formName">
                        <Form.Control
                            style={{opacity: '0.95'}}
                            size="lg"
                            type="text"
                            placeholder="Name"
                            value={categoryToAdd.name}
                            onChange={(e) => setCategoryToAdd({...categoryToAdd, name: e.target.value})}
                        />
                    </Form.Group>
                    {errorMessage && <p className="warning text-center">{errorMessage}</p>}
                    <Row className="justify-content-center">
                        <Button variant="dark" type="submit" size={"md"}>
                            {category ? 'Update' : 'Create'}
                        </Button>
                    </Row>
                </Form>
            </Container>
        </Container>
    );
}

export default AddEditCategory;