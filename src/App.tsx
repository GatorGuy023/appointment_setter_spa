import React, {useContext} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "./Forms/LoginForm";
import RootStoreContext from "./Store/rootStore";
import {observer} from "mobx-react-lite";

const App = () => {
    const rootStore = useContext(RootStoreContext);
    const {user} = rootStore.userStore;

  return (
      <Container fluid>
        <Row as="header">
          <Col xs={12} className="center-text">
            AppointmentSetter
          </Col>
        </Row>
        <Row as="main" className="justify-content-center">
          <Col xs="auto">
              {user ? <p>Welcome {user.fullName}</p> : <LoginForm />}
          </Col>
        </Row>
        <Row as="footer">
          <Col xs={12} className="center-text">
            Footer
          </Col>
        </Row>
      </Container>
  );
}

export default observer(App);