import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from "@chakra-ui/react";
import styles from '../../assets/dropdown.module.css'; // import the CSS module

export default function DropdownMenu({ options, handleSelect }) {
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