import { DialogContent } from "@/components/ui/dialog";
import {
  Action,
  Computed,
  Thunk,
  action,
  computed,
  persist,
  thunk,
} from "easy-peasy";

export interface AppStoreModel {
  isLoading: boolean;
  topMenuShow: boolean;
  searchShow: boolean;
  dialogOpen: boolean;
  dialogContent: () => React.ReactNode;
  setRequestLoading: Action<AppStoreModel, boolean>;
  toggleTopMenuShow: Action<AppStoreModel, boolean | undefined>;
  toggleSearchShow: Action<AppStoreModel, boolean | undefined>;
  toggleDialogOpen: Action<AppStoreModel, boolean | undefined>;
  setDialogContent: Action<AppStoreModel, () => React.ReactNode>;
}

const appStoreModel: AppStoreModel = persist({
  isLoading: false,
  topMenuShow: true,
  searchShow: false,
  dialogOpen: false,
  dialogContent: () => <></>,
  setRequestLoading: action((state, bool) => {
    state.isLoading = bool;
  }),
  toggleTopMenuShow: action((state, payload) => {
    if (payload === undefined) {
      state.topMenuShow = !state.topMenuShow;
    } else state.topMenuShow = payload;
  }),
  toggleSearchShow: action((state, payload) => {
    if (payload === undefined) {
      state.searchShow = !state.searchShow;
    } else state.searchShow = payload;
  }),
  toggleDialogOpen: action((state, payload) => {
    if (payload === undefined) {
      state.dialogOpen = !state.dialogOpen;
    } else state.dialogOpen = payload;
  }),
  setDialogContent: action((state, payload) => {
    if (payload) {
      state.dialogContent = payload;
    }
  }),
  // sidebarUnfoldable: false,
  // theme: 'dark',
  // loader: false,
  // sessionExpiresIn: 0,
  // setSessionExpiresIn: action((state, payload) => {
  //   state.sessionExpiresIn = payload
  // }),
  // toggleTheme: action((state) => {
  //   if (state.theme === 'dark') state.theme = 'light'
  //   else state.theme = 'dark'
  // }),
  // // toggleSidebarUnfoldable: action((state) => {
  // //   state.sidebarUnfoldable = !state.sidebarUnfoldable
  // // }),
  // toggleSidebarShow: action((state, payload) => {
  //   if (payload) state.sidebarShow = payload
  //   else state.sidebarShow = !state.sidebarShow
  // }),
  // toggleLoader: action((state, payload) => {
  //   state.loader = payload
  // }),
});

export default appStoreModel;
