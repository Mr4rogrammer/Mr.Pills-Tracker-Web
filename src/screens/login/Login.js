import './Login.css';
import { TypeAnimation } from 'react-type-animation';
import { auth, googleAuthProvider } from '../../config/firebase';
import { signInWithPopup } from "firebase/auth";
import { useEffect, useState } from 'react';
import Base from '../base/Base';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  function infoToast(message) {
    toast.info(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
    });
}

  const [email, setEmail] = useState('');

  useEffect(() => {
    setEmail(localStorage.getItem('email'))
  })

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll"
    };
  }, []);

  const handleGoogleAuth = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        setEmail(user.email);
        localStorage.setItem('email', user.email)
        localStorage.setItem('name', user.displayName)
        localStorage.setItem('image', user.photoURL)
      })
      .catch((error) => {
        console.log(error)
        infoToast(error.message)
      });
  }

  return (

    <center>
       <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
      {email ? <Base /> :
        <div className="Login">
          <div className="content-wrapper">
            <center>
              <img className="image" src={require('../../images/logo.svg').default} alt='mySvgImage' />
              <p className='we_take_care'>We take care of your</p>
              <TypeAnimation
                sequence={[
                  "Childer's. ❤️",
                  2000,
                  "Parent's. 😻",
                  2000,
                  'all your loved ones. 🫶',
                  2000,
                ]}
                wrapper="span"
                speed={10}
                style={{ fontSize: '2em', color: 'black', fontFamily: 'Poppins', }}
                repeat={Infinity}
              />
              <div className="login-button" onClick={handleGoogleAuth}>
                <img className="google-logo" src={require('../../images/googlelogo.svg').default} alt='mySvgImage' />
                <p className='login-text'>Access Mr.Pills Tracker</p>
              </div>
            </center>
          </div>
        </div>
      }
    </center>
  );
}

export default App;
