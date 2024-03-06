//getting the user name from the logged in user
import {getApp} from '../../hooks/useSetApp'
export default function GetUserName(){
    const prefix = getApp().core.getUser();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${prefix}${randomNumber}`;
}