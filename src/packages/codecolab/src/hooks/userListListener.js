import React,{ useEffect } from 'react';
import { getSession } from '../utils/getsession.js';

export default function listlistener(usernames) {
    //this makes sure the window/user list window is open if it is it will setthe usernames to be the same as the userlist
    //this will re-render the windowlist if its open therefore actively updating the list when usesr join and leave
    useEffect(() => {
        getSession().usernameslist = usernames
        if(usernames.length >= 0 &&  getSession().itemlist !== null) {
            console.log('usernames', getSession().itemlist)
            getSession().itemlist(usernames);
        }
    }, [usernames]);
}