import {observable, action, runInAction} from "mobx";
import agent from "../Api/agent";
import {ILoginForm, IUser} from "../Model/User";
import {RootStore} from "./rootStore";

class UserStore {

  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable loadingLogin = false;

  @action loginUser = async (body: ILoginForm) => {
    console.log('In function');
    this.loadingLogin = true;
    try {
      const response = await agent.User.login(body);
      console.log(response)
      const userUrl = response.headers.location;
      console.log(userUrl)
      const loginUser = await agent.User.getUser(userUrl)
      console.log(loginUser);
      runInAction(() => {
        this.user = loginUser;
        this.loadingLogin = false;
      })
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loadingLogin = false;
      })
    }
  };
}

export default UserStore;