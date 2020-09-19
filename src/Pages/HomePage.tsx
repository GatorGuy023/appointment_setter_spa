import React, {useContext} from "react"
import RootStoreContext from "../Store/rootStore";
import {observer} from "mobx-react-lite";
import Button from "react-bootstrap/Button";

const HomePage = () => {
    const rootStore = useContext(RootStoreContext)
    const {user, logout} = rootStore.userStore;

    return (
        <p>
            Hello, {user!.fullName}! Would you like to <Button variant="success" onClick={() => logout()}>Logout</Button>
        </p>
    )
}

export default observer(HomePage);