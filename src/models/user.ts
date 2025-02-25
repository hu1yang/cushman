import userPicture from "@/assets/users.png";
import IUser from "@/global";
export interface IUserState{
  userInfo:IUser
}
export default {
    state: {
      userInfo:{
        picture:userPicture,
        userName:'hu1yang'
      }
    } as IUserState,
    reducers:{
      logout(state:IUserState){
        return {
          ...state,
          userInfo: {}
        }
      }
    }
}
