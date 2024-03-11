import React from 'react';
import { handleDisconnect } from '../../utils/socket/socketoutgoing';
import { getSession } from '../../utils/getsession';
import styles from '../../assets/disconectbutton.module.css';
import { Box } from "@chakra-ui/react";
//simple disconnect button component using elements from chakra ui

function DisconnectButton() {

  function Disconnect() {

    const socket = getSession().socket
    const sessionID = getSession().sessionID
    const username = getSession().username
    handleDisconnect(socket, sessionID, username)
  };

  return (
    <Box>
      <button className={styles.disconnectButton} onClick={Disconnect}>Disconnect</button>
    </Box>
  );
}

export default DisconnectButton;