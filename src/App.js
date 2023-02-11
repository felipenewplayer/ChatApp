import { Auth } from "./components/Auth";
import { useState, useRef } from "react";
import './App.css';
import Cookies from "universal-cookie";
import { Chat } from "./Chat";
import { signOut } from "firebase/auth";
import { auth } from './firebase'


function App() {

  const cookies = new Cookies();
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null)

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove('auth-token');
    setIsAuth(false);
    setRoom(null);
  }

  if (!isAuth) {
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }


  return (
    <>
      {room ?
        <Chat room={room} />
        :
        <div className="room">
          <label>Enter Room Name:</label>
          <input ref={roomInputRef} />
          <button onClick={() => setRoom(roomInputRef.current.value)}>Enter chat</button>

          <div className="sign-out">
            <button onClick={signUserOut}>Sign out</button>
          </div>
        </div>

      }

    </>
  )
}

export default App;
