import React, { useEffect } from 'react';
export default function useShowPopupListener(showPopup, setShowPopup) {
    useEffect(() => {
        if (showPopup) {

            setTimeout(() => {
                setShowPopup(false)
            }, 3000)
        }
    }, [showPopup]);
}