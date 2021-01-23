import {useAuth} from "../../auth/authContext";
import React, {useEffect, useState} from "react";
import axiosInstance from "../../http/axiosInstance";
import {Alert, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import RawLink from "../Link/RawLink";
import '../../index.css'

const CategoryTab = () => {
    let auth = useAuth();
    const [categories, setCategories] = useState([]);
    const [cannotDeleteMessage, setCannotDeleteMessage] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = () => {
        axiosInstance(auth)
            .get('/category')
            .then(res => setCategories(res.data))
    };

    const removeCategory = (id) => {
        axiosInstance(auth)
            .delete(`/category/${id}`)
            .then(() => fetchCategories())
            .catch(() => setCannotDeleteMessage(true));
    }

    return (
        <Table size={"sm"} responsive variant={"secondary"} >
            {cannotDeleteMessage && (
                <Alert className="position-absolute text-center full-width sticky-top" variant="danger" onClose={() => setCannotDeleteMessage(false)} dismissible>
                    <Alert.Heading>Unable to delete category</Alert.Heading>
                    <p>Category is in use or a server error occurred</p>
                </Alert>
            )}
            <thead>
            <tr>
                <th colSpan={"4"}>Description</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {categories && categories.map(category => (
                <tr key={category.id}>
                    <td colSpan={"4"}>{category.name}</td>
                    <td>
                        <Button size={"sm"}
                                className="m-1"
                                variant="danger"
                                onClick={() => removeCategory(category.id)}
                        >
                            🅧
                        </Button>
                        <Button as={RawLink} size={"sm"} className="m-1" variant="warning" to={{
                            pathname: "/categories/edit",
                            state: {category}
                        }}>
                            ✎
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );

}
export default CategoryTab;