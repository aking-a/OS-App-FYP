import React from 'react';
import { handleDisconnect } from '../../utils/socket/socketoutgoing';
import { getSession } from '../../utils/getsession';
import styles from '../../assets/disconectbutton.module.css';
import { getApp } from '../../hooks/useSetApp';
import { Box } from "@chakra-ui/react";


function DisconnectButton() {
  const core = getApp().core

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