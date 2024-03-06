import { getSession } from "../utils/getsession"
import React, { useEffect } from "react"

export default function useDidMountListener(DidMount, setSid, setUser, setCode, setLanguage, setPopupMessage, setShowPopup, setIsVisible, setLink) {
  useEffect(() => {
    //making sure the editor is mounted
    if (getSession().editorRef != null) {

      //setting up all the session useStates and other variables
      const session = getSession()
      const editor = session.editorRef

      setSid(session.sessionID)
      setUser(session.username)
      setCode(session.code)

      setLanguage(session.language)

      session.code = setCode
      session.popupMessage = setPopupMessage
      session.showPopup = setShowPopup

      if (session.isVisible) {
        setIsVisible(true)
        setLink(session.sharelink)
      }
    }


  }, [DidMount])
}