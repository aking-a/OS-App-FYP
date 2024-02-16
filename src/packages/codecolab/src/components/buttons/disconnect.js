import React from 'react';
import { handleDisconnect } from '../../utils/socket/socketoutgoing';
import { getSession } from '../../utils/getsession';
import styles from '../../assets/disconectbutton.module.css';
import { getApp } from '../../hooks/useSetApp';
import {Box, BoxContainer, Button,Menubar} from '@osjs/gui';


function DisconnectButton() {
  const core = getApp().core

  function Disconnect() {

    const socket = getSession().socket
    const sessionID = getSession().sessionID
    const username = getSession().username
    handleDisconnect(socket, sessionID, username)
  };
  const menu = (()=>{
    core.make('osjs/contextmenu', {
      position: Event || Element || Object,
  
      menu: [{
        label: 'Some label',
        onclick: ev => console.log('Clicked')
      }, {
        label: 'Sub items',
        items: [{
          label: 'Sub item',
          onclick: ev => console.log('Clicked sub item')
        }, {
          label: 'Check item 1',
          checked: true,
          onclick: ev => console.log('Clicked sub item')
        }, {
          label: 'Check item 2',
          checked: true,
          onclick: ev => console.log('Clicked sub item')
        }]
      }]
    });
  })

  return (
    <div>
      <button className={styles.disconnectButton} onClick={Disconnect}>Disconnect</button>
    </div>
  );
}

export default DisconnectButton;