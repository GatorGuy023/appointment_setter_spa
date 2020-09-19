import React, {useContext} from "react";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import {ErrorMessage, Field, Formik, Form as FormikForm} from "formik";
import * as Yup from "yup";
import RootStoreContext from "../Store/rootStore";
import {observer} from "mobx-react-lite";
import {ILoginForm} from "../Model/User";
import Spinner from "react-bootstrap/Spinner";

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const {loginUser, loadingLogin} = rootStore.userStore;
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required(),
        password: Yup.string()
          .required()
      })}
      onSubmit={async (values: ILoginForm, { setErrors }) => {
          await loginUser(values, setErrors);
      }}
    >
      {({ isSubmitting}) => (
        <Form as={FormikForm}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control as={Field} name="username" type="text" placeholder="Enter username" />
              <ErrorMessage name="username" render={(error) => <Alert variant="danger">{error}</Alert>} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control as={Field} name="password" type="password" placeholder="Password" />
            <ErrorMessage name="password" render={(error) => <Alert variant="danger">{error}</Alert>} />
          </Form.Group>
          <Button type="submit" variant="success" disabled={loadingLogin}>
              Login {loadingLogin && (
                  <Spinner animation="border" variant="dark" size="sm">
                      <span className="sr-only">Loading...</span>
                  </Spinner>
                )
            }
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default observer(LoginForm);