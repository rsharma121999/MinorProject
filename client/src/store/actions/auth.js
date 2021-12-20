import * as actionTypes from './actionTypes';

export const authStart=(data)=>{
    return dispatch=>{
        localStorage.setItem('token',data.token)
        localStorage.setItem('user',JSON.stringify(data.user))
        dispatch(authSuccess(data.token,data.user))
    }
}

export const authSuccess=(token,user)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        user:user
    }
}

export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authCheckState=()=>{
    return dispatch=> {
        const token=localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }
        else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'))
            if(expirationDate>new Date()){
                const user=JSON.parse(localStorage.getItem('user'))
                const refreshToken=localStorage.getItem('refreshToken')
                dispatch(authSuccess(token,user,refreshToken))
            }
            else{
                dispatch(logout())
            }
        }
    }
}