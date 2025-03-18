import { useDispatch, useSelector } from 'umi'
import Cookies from "js-cookie";
import {IUser} from "@/types/user";
import {RootState} from "@/types/state";
const useUserInfo = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo) as IUser;  // 获取 userInfo 数据
  const dispatch = useDispatch();
  const setUserInfo = ({token,userInfo}:{token:string,userInfo:IUser}) => {
    Cookies.set('token', token);
    Cookies.set('userInfo', JSON.stringify(userInfo));
    dispatch({
      type: 'user/setUserInfo',
      userInfo
    })
  };
  return {
    userInfo,
    setUserInfo
  }
}

export default useUserInfo
