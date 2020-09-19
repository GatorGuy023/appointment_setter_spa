import { createContext } from "react";
import UserStore from "./userStore";

export class RootStore {
  constructor() {
    this.userStore = new UserStore(this)
  }

  userStore: UserStore
}

const RootStoreContext = createContext(new RootStore());

export default RootStoreContext;