export default function GetUserName(){
    const prefix = 'user'
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${prefix}${randomNumber}`;
}