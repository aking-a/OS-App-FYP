import { getSession} from '../../utils/getsession.js'
function addUsername(username) {
    const setUsernames = getSession().userlist;
    setUsernames(oldUsernames => [...oldUsernames, username]);
};
function removeUsername(username) {
    const setUsernames = getSession().userlist;
    setUsernames(oldUsernames => oldUsernames.filter(u => u !== username));
};

export { removeUsername, addUsername }