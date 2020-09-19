import React, {useContext, useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "./Forms/LoginForm";
import RootStoreContext from "./Store/rootStore";
import {observer} from "mobx-react-lite";
import {ToastContainer} from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import HomePage from "./Pages/HomePage";

const App = () => {
    const rootStore = useContext(RootStoreContext);
    const {user, reloadUser} = rootStore.userStore;
    const [isLoadingApp, setIsLoadingApp] = useState(true);
    useEffect(() => {
        setIsLoadingApp(true);
        reloadUser().finally(() => {
            setIsLoadingApp(false)
        });
    }, [reloadUser])

    if (isLoadingApp) {
        return (
            <Container>
                <Row className="justify-content-center align-items-stretch">
                    <Col xs="auto">
                        <Spinner animation="border" variant="dark" /> Loading...
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return (
            <Container fluid>
                <Row as="header">
                    <Col xs={12} className="center-text">
                        AppointmentSetter
                    </Col>
                </Row>
                <Row as="main" className="justify-content-center align-items-stretch">
                    <Col xs="auto">
                        {user ? <HomePage /> : <LoginForm/>}
                    </Col>
                </Row>
                <Row as="footer">
                    <Col xs={12} className="center-text">
                        <ToastContainer/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default observer(App);