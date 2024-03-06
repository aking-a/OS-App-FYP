import { getSession} from '../../utils/getsession.js'

//just adds/removes a username from the usernames state array
function addUsername(username) {
    const setUsernames = getSession().userlist;
    setUsernames(oldUsernames => [...oldUsernames, username]);
};
function removeUsername(username) {
    const setUsernames = getSession().userlist;
    setUsernames(oldUsernames => oldUsernames.filter(u => u !== username));
};

export { removeUsername, addUsername }