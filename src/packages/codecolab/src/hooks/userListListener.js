import React,{ useEffect } from 'react';
import { getSession } from '../utils/getsession.js';

export default function listlistener(usernames) {
    useEffect(() => {
        getSession().usernameslist = usernames
        if(usernames.length > 0 &&  getSession().itemlist !== null) {
            console.log('usernames', getSession().itemlist)
            getSession().itemlist(usernames);
        }
        if(getSession().usernameslist.length == 0 &&  getSession().itemlist === null) {
            consoleq.log('usernameshasdone')
            getSession().itemlist(usernames)
        }
    }, [usernames]);
}