import {IUserState} from "@/models/user";
import {ICommon} from "@/models/commons";

export interface RootState {
  count: number;
  user: IUserState;
  common: ICommon;
}
