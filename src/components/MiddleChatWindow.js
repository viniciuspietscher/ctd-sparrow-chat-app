import { db } from "../config/fire-config"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore"
import { useState, useEffect } from "react"
import style from './MiddleChatWindow.module.css'

function MiddleChatWindow({ currentUser }) {
  const [messages, setMessages] = useState([])
  const messagesCollectionRef = collection(db, "messages")
  const queryMessages = query(messagesCollectionRef, orderBy("timestamp"))

  // captures data
  const getMessages = () => {
      const passedUser = currentUser ? currentUser.photoURL : ""
    onSnapshot(queryMessages, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  useEffect(() => {
    getMessages()
  }, [])

  return (
    <>
      <ul className={style.listGroup} >
        {/* renders message */}
        {messages.map((message) => {
          return(
            <span>
          <li key={message.id} className={style.listGroupItem}  >{message.text} 
          </li> 
          <img className={style.userImage} src={currentUser ? currentUser.photoURL : ""} width='75' />
          </span>
          )


        })}
      </ul>
    </>
  )
}

export default MiddleChatWindow
