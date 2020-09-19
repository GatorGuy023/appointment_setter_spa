import {observable, action, runInAction} from "mobx";
import agent from "../Api/agent";
import {ILoginForm, IUser} from "../Model/User";
import {RootStore} from "./rootStore";
import {FormikErrors, FormikValues} from "formik";
import {toast} from "react-toastify";

export const USER_IRI_KEY = 'userIri';

class UserStore {

  rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;
  @observable loadingLogin = false;

  @action setUser = (user: IUser) => {
    this.user = user;
  }

  @action loginUser = async (body: ILoginForm, setErrors: (errors: FormikErrors<FormikValues>) => void) => {
    console.log('In function');
    this.loadingLogin = true;
    try {
      const response = await agent.User.login(body);
      const userIri = response.headers.location;
      const loginUser = await agent.User.getUser(userIri)
      runInAction(() => {
        localStorage.setItem(USER_IRI_KEY, userIri)
        this.user = loginUser;
        this.loadingLogin = false;
      })
    } catch (error) {
      if (error.response.data.error) {
        setErrors({username: error.response.data.error, password: ''})
      } else {
        toast.error('Unknown error occurred during login.');
      }
      runInAction(() => {
        this.loadingLogin = false;
      })
    }
  };

  @action reloadUser = async () => {
    const userIri = localStorage.getItem(USER_IRI_KEY);
    if (userIri) {
      try {
        const user = await agent.User.getUser(userIri);
        this.setUser(user);
      } catch (error) {
        toast.error('Error loading logged in user');
      }
    }
  }

  @action logout = async () => {
    try {
      await agent.User.logout();
      localStorage.removeItem(USER_IRI_KEY);
      runInAction(() => {
        this.user = null;
      })
    } catch (error) {
      toast.error('There was an error logging out.')
    }
  }
}

export default UserStore;