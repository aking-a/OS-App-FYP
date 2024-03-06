import React, { useEffect, useState } from 'react';
import { getSession } from "../../utils/getsession.js"
import styles from '../../assets/windowlist.module.css'; // Import the CSS module

function Windowlist() {
  const [items, setItems] = useState([]);//the list of usernames
  //when this updates the html will update (the list of usernames will be displayed in the windowlist component)

  //used to update the list with the current users in the session
  useEffect(() => {
    getSession().itemlist = setItems;

    if (getSession().usernameslist !== null && getSession().usernameslist.length > 0) {
      setItems(getSession().usernameslist);
    }
  }, []);
  //IMPORTANT: the usernamelist is updated outside of this component because the userlist window may not be open when a user joins or leaves the session

  return (
    <div className={styles.container}>
      {items.length > 0 ? (
        items.map((username, index) => (
          <div key={index} className={styles.username_item}>
            {username}
          </div>
        ))
      ) : (
        <div className={styles.empty_message}>No one is in the session.</div>
      )}
    </div>
  );
}

export default Windowlist;