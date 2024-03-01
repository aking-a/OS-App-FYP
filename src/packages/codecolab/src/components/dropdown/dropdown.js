import React, { useEffect, useState } from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from "@chakra-ui/react";
import styles from '../../assets/dropdown.module.css'; // import the CSS module
import { getSession } from '../../utils/getsession.js';
import listlistener from '../../hooks/userListListener.js'
import handleSelect from '../../utils/handleselect.js';

export default function DropdownMenu() {
    const [usernames, setUsernames] = useState([]);

    const options = [
        { id: 1, label: 'save' },
        { id: 2, label: 'user list' },
    ];
    
    useEffect(() => {
        const session = getSession()
        session.userlist = setUsernames
    }, []);
    listlistener(usernames);

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