import {
  LoginUserInput,
  RegisterUserDataInput,
} from "@/lib/validations/user.schema";
import AuthService from "@/services/authService";
import {
  Action,
  Computed,
  Thunk,
  action,
  computed,
  persist,
  thunk,
} from "easy-peasy";
// import AuthService from '../services/AuthService'
import jwtDecode from "jwt-decode";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  roles: string;
  id: number;
  phoneNumber?: string;
  organisation?: string;
  country?: string;
}

export interface AuthStoreModel {
  token: string | null;
  tokenExpiration: number;
  user: User | null;
  isAuth: boolean;
  role: Computed<AuthStoreModel, string | null>;
  setUser: Action<AuthStoreModel, User | null>;
  setToken: Action<AuthStoreModel, string>;
  getUserId: Computed<AuthStoreModel, Number | null>;
  isAuthenticated: Computed<AuthStoreModel, Boolean>;
  isAdmin: Computed<AuthStoreModel, Boolean>;
  clearUser: Action<AuthStoreModel>;
  signInUser: Thunk<AuthStoreModel, LoginUserInput>;
  signUpUser: Thunk<AuthStoreModel, RegisterUserDataInput>;
  updateUserData: Thunk<AuthStoreModel>;
}

interface Token {
  username: string;
  exp: number;
  iat: number;
  roles: string[];
}

const authStoreModel: AuthStoreModel = persist({
  token: null,
  tokenExpiration: 0,
  user: null,
  isAuth: false,
  role: computed((state) => {
    return state.user?.roles || null;
  }),

  setUser: action((state, user) => {
    state.user = user;
  }),

  setToken: action((state, token) => {
    state.token = token;
    if (!!token) {
      const decoded = jwtDecode<Token>(token);
      state.tokenExpiration = decoded.exp;
    }
  }),

  getUserId: computed((state) => {
    if (state.user?.id) return state.user.id;
    else return null;
  }),

  isAuthenticated: computed((state) => {
    if (
      state.user != null &&
      state.token != null &&
      state.tokenExpiration > Date.now() / 1000
    ) {
      state.isAuth = true;
      return true;
    } else return false;
  }),

  isAdmin: computed((state) => {
    if (
      state.user?.roles.includes("ROLE_ADMIN") ||
      state.user?.roles.includes("ROLE_SUPER_ADMIN")
    )
      return true;
    return false;
  }),

  clearUser: action((state) => {
    state.user = null;
    state.token = null;
    state.tokenExpiration = 0;
  }),

  //action to verify login credentials, recive jwt  and to set appropriate state
  signInUser: thunk(async (actions, payload) => {
    console.log("@SignInUser payload", payload);
    try {
      const { token } = await AuthService.SignIn(payload);
      // const tokenExpiration = await AuthService.TokenExpiration(token)
      const user = await AuthService.CheckToken(token);
      actions.setUser(user);
      actions.setToken(token);
    } catch (e: any) {
      actions.setUser(null);
      console.log(e);
      throw e;
      // throw new Error(e)
    }
  }),

  signUpUser: thunk(async (actions, payload) => {
    console.log("@SignUpUser payload", payload);
    try {
      const res = (await AuthService.SignUp(payload)).data;
    } catch (e: any) {
      console.log(e);
      // throw new Error(e.response?.data?.error || "An error occured");
      throw e;
    }
  }),

  updateUserData: thunk(async (actions, _, { getState }) => {
    try {
      const token = getState().token;
      const user = await AuthService.CheckToken(token);
      console.log("User in updateUserData: ", user);
      actions.setUser(user);
    } catch (e: any) {
      actions.setUser(null);
      console.log(e);
      throw e;
      // throw new Error(e)
    }
  }),

  // //action to clear previously loged user
  // logoutUser: thunk(async (actions, payload) => {
  //   try {
  //     actions.clearUser()
  //     // await AuthService.Logout(paylod);
  //   } catch (e) {
  //     // console.log(e)
  //   }
  // }),

  // //action to verify if 2fa token is valid and to set appropriate state
  // validateTfa: thunk(async (actions, payload, { getState }) => {
  //   try {
  //     const data = await AuthService.ValidateTfa(payload)
  //     // console.log(data)
  //     // console.log(!!data.two_factor_complete)
  //     if (!!data.two_factor_complete) actions.setTfa(data)
  //     const user = await AuthService.CheckToken(getState().token)
  //     actions.setUser({ user })
  //   } catch (e) {
  //     console.log('error in 2fa validation:', e)
  //     actions.clearUser()
  //   }
  // }),

  // refreshToken: thunk(async (actions) => {
  //   try {
  //     // console.log('refreshToken action')
  //     const tokenData = await AuthService.Refresh()
  //     actions.setToken(tokenData)
  //   } catch (e) {
  //     actions.clearUser()
  //   }
  // }),
});

export default authStoreModel;
