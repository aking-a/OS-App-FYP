import React, { useEffect, useState } from 'react';
import { getSession } from "../../utils/getsession.js"
import styles from '../../assets/windowlist.module.css'; // Import the CSS module

function Windowlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getSession().itemlist = setItems;

    if (getSession().usernameslist !== null && getSession().usernameslist.length > 0) {
      setItems(getSession().usernameslist);
    }
  }, []);

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