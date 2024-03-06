import React, { useEffect } from 'react';
//controls how long the popup is displayed for by using setTimeout once its done it will reset the showPopup state
export default function useShowPopupListener(showPopup, setShowPopup) {
    useEffect(() => {
        if (showPopup) {

            setTimeout(() => {
                setShowPopup(false)
            }, 3000)
        }
    }, [showPopup]);
}