import {
  ResetPasswordInput,
  ResetPasswordPayload,
  ChangeUserDataInput,
  RegisterUserDataInput,
  ResetUserPasswordInput,
  ChangeUserPasswordInput,
  ChangeUserPasswordPayload,
} from "@/lib/validations/user.schema";
import axios from "../axios";
import jwtDecode from "jwt-decode";
import { Axios, AxiosError } from "axios";
// import { JWT } from "next-auth/jwt";

const AuthService = {
  CheckToken: async (token: any) => {
    console.log(`@ME token: `, { token });
    return await axios
      .get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200 && res.data) {
          return res.data;
        }
        return;
      })
      .catch((e) => {
        console.log(e);
        return;
      });
  },

  SignIn: async ({ email, password }: { email: string; password: string }) => {
    console.log("@Sign in", email, password);
    return await axios
      .post("/api/login_check", { email, password })
      .then((res) => {
        console.log("token: ", res.data.token);
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  },
  SignUp: async (payload: RegisterUserDataInput) => {
    return await axios
      .post("/api/users", payload, {
        validateStatus: function (status) {
          return status < 400;
        },
      })
      .then((res) => {
        // console.log(res.data);
        return res;
      });
    // .catch((e) => {
    //   console.log(e);
    //   // throw new Error(e.response?.data?.error || "An error occured");
    //   throw new Error(e) as AxiosError;
    // });
  },
  RequestResetUserPassword: async (payload: ResetUserPasswordInput) => {
    console.log(payload);
    return await axios
      .post("/api/reset-password/request", payload)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e));
  },
  ResetUserPassword: async (payload: ResetPasswordPayload) => {
    console.log(payload);
    return await axios
      .post("/api/reset-password/set", payload)
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e) as AxiosError;
      });
  },
  ChangeUserData:
    (id: Number | null) => async (payload: ChangeUserDataInput) => {
      console.log(`@PUT /api/users/${id}`, payload);
      return await axios
        .put(`/api/users/${id}`, payload)
        .then((res) => {
          console.log(res);
          return { res: res.data, payload: payload };
        })
        .catch((e) => console.log(e));
    },
  ChangeUserPassword:
    (id: Number) => async (payload: ChangeUserPasswordPayload) => {
      console.log(`@PATCH /api/users/${id}/password`, payload);
      return await axios
        .patch(`/api/users/${id}/password`, payload)
        .then((res) => {
          return res.data;
        })
        .catch((e) => console.log(e));
    },
  RemoveUserAccount: (id: Number) => async () => {
    console.log(`@DELETE /api/users/${id}`);
    return await axios
      .delete(`/api/users/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e));
  },
  // Refresh: async () => {
  //   return await axios
  //     .post("/api/token/refresh")
  //     .then((res) => {
  //       return res.data;
  //     })
  //     .catch((e) => {});
  // },
  // Logout: () => {
  //   // TODO logout request to server to invalidate token
  // },
};

export default AuthService;
