
export function getToken() {
    return localStorage.getItem('token')
}

export function setToken(token) {
    localStorage.setItem('token',token)
}
export function isLogined() {
    // 在这边使用判断存在的token是否与数据库中是否匹配
    if(localStorage.getItem("token")){
        return true;
    }else{
        return false;
    }
}