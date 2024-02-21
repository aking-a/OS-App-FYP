import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from "@chakra-ui/react";
import styles from '../../assets/dropdown.module.css'; // import the CSS module
import { userSaveFile } from '../../utils/savefile.js';
import { getSession } from '../../utils/getsession.js';
import listlistener from '../../hooks/userListListener.js'
import { getApp } from '../../hooks/useSetApp.js'

export default function DropdownMenu() {
    const [usernames, setUsernames] = useState([]);
    const [winlist, setWinlist] = useState(null);

    const options = [
        { id: 1, label: 'save' },
        { id: 2, label: 'user list' },
    ];
    const handleSelect = (option) => {
        if (option.label === 'save') {
            userSaveFile()
        }
        if (option.label === 'user list') {
            const proc = getApp().proc
            const winlist = proc.createWindow({id: 'userListWindow',
            title: 'User List',
            dimension: { width: 200, height: 600 },
            position: { left: 100, top: 200 }})
            setWinlist(winlist)
        }
    };
    
    useEffect(() => {
        const session = getSession()
        session.setUsernames(setUsernames)
    }, []);
    listlistener(usernames,winlist);

    return (
        <Box>
            <Menu>
                <MenuButton as={Button} className={styles.menuButton}>
                    {'Menu'}
                </MenuButton>
                <MenuList className={styles.menuList}>
                    {options.map((option) => (
                        <MenuItem key={option.id} onClick={() => handleSelect(option)} className={styles.menuItem}>
                            {option.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </Box>
    );
};