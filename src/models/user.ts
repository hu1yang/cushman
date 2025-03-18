import Cookies from "js-cookie";
import userPicture from "@/assets/users.png";
import {IUser} from "@/types/user";

export interface IUserState{
  userInfo:IUser
}
export default {
    namespace: 'user',
    state: {
      userInfo:{
        picture:userPicture,
        username:'',
        id:null
      }
    } as IUserState,
    reducers:{
      setUserInfo(state:IUserState, {userInfo}: { userInfo:IUser }){
        console.log(userInfo)
        return {
          ...state,
          userInfo
        }
      },
      logout(state:IUserState){
        return {
          ...state,
          userInfo: {}
        }
      }
    },
    effects:{
      *setUserInfoEffects({ payload: todo }, {call, put}){
        const userInfoStr = Cookies.get('userInfo');
        if(userInfoStr){
          try {
            const userInfo = JSON.parse(userInfoStr);
            yield put({
              type:'setUserInfo',
              userInfo
            })
          }catch (e) {
            console.log(e)
          }
        }
      }
    }
}
