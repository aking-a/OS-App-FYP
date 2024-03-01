import React,{ useEffect } from 'react';
import { getSession } from '../utils/getsession.js';

export default function listlistener(usernames) {
    useEffect(() => {
        getSession().usernameslist = usernames
        if(usernames.length > 0 &&  getSession().itemlist !== null) {
            getSession().itemlist(usernames);
        }
    }, [usernames]);
}