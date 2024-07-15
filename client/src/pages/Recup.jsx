import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Recup = () => {
  const [choixValidation, setChoixValidation] = useState('');
  const [codeValidation, setCodeValidation] = useState('');
  const [etape, setEtape] = useState(1);
  const [compteConnecte, setCompteConnecte] = useState('user@gmail.com');
  const [modalVisible, setModalVisible] = useState(false);
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('');
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleRetour = () => {
    
    setEtape((prevEtape) => Math.max(prevEtape - 1, 1));
    // Clear error messages when going back
    setPasswordError('');
    setCodeError('');
    setGeneralError('');
    setEmailError('');
  };


  const [compteUtilisateur, setCompteUtilisateur] = useState('');
  const handleCheckUserAndSendResetEmail = async () => {
    const emailInput = document.querySelector('#emailInput');
  
    if (etape === 1) {
      if (!emailInput || !emailInput.value.includes('@uni.com')) {
        setEmailError('Please enter a valid e-mail address.');
        return;
      } else {
        setEmailError('');
      }
    }
  
    const instance = axios.create({
      withCredentials: true
    });
  
    try {
      // Envoyer directement le mail de réinitialisation
      localStorage["email_reset"]=emailInput.value
      const response = await instance.post(`http://localhost:5000/guests/sendOtp`, {
        email: emailInput.value,
      });
  
      const resetEmailData = response.data;
      console.log(resetEmailData);

      // Stocker le compte de l'utilisateur dans l'état
      setCompteUtilisateur(emailInput.value);

      // Continuer avec la logique de votre application en fonction de la réponse
      setEtape(3);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'OTP:', error);
  
      if (error.response) {
        // Réponse reçue avec un statut d'erreur (par exemple, 404)
        if (error.response.status === 404) {
          alert('L\'utilisateur n\'existe pas.');
        } else {
          console.error('Erreur de réponse avec le statut:', error.response.status);
        }
      } else if (error.request) {
        // La requête a été effectuée mais aucune réponse n'a été reçue
        console.error('Aucune réponse reçue de la part du serveur.');
      } else {
        // Une autre erreur s'est produite pendant la configuration de la requête
        console.error('Erreur de configuration de la requête:', error.message);
      }
    }
  };
  
const [enteredOtp, setEnteredOtp] = useState('');
const [verificationMessage, setVerificationMessage] = useState('');
const handleVerifierCode = async () => {
  const otpcode = document.querySelector('#otpcode');
  try {
    // Envoyer le code OTP au serveur pour vérification
    const response = await axios.post(`http://localhost:5000/guests/verify`, {
      enteredOtp: otpcode.value,
    });

    // Traiter la réponse du serveur
    const data = response.data;

    if (data.message.includes('Erreur lors de la vérification du code OTP.')) {
      alert('Code OTP incorrect.');
    } else {
      // Code correct, aucune alerte 
      setEtape(4);
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du code OTP:', error);
    // // Gérer l'erreur, afficher un message, etc.
    setVerificationMessage('Erreur lors de la vérification du code OTP.');
  }
};


  const handleContinue = () => {
    if (etape === 5 && (nouveauMotDePasse === '' || confirmationMotDePasse === '')) {
      setGeneralError('Please fill in both password fields.');
    } else {
      setModalVisible(false);
      setEtape(4);
      setGeneralError('');
    }
  };

  const handleModifierMotDePasse = () => {
    setEtape(5);
  };

  const handleIgnorer = () => {
    setEtape(7);
  };
  const [motDePasseError, setMotDePasseError] = useState('');
  const handleNewPassword = async () => {
    // Vérifiez que le nouveau mot de passe et la confirmation sont identiques
    if (nouveauMotDePasse !== confirmationMotDePasse) {
      setMotDePasseError("Les mots de passe ne correspondent pas.");
      return;
    }
  
    // Effectuez la requête vers votre API pour mettre à jour le mot de passe
    try {
      const response = await axios.post('http://localhost:5000/guests/changepsswrd', {
        newPassword: nouveauMotDePasse,
        email: localStorage["email_reset"]
      
      });
  
      const responseData = response.data;
      alert(responseData.message); // Affichez le message de l'API

      setEtape(6);
  
      // Continuez avec la logique de votre application en fonction de la réponse de l'API
      // Par exemple, redirigez l'utilisateur vers une nouvelle page ou effectuez d'autres actions nécessaires.
    } catch (error) {
      console.error('Erreur lors de la réinitialisation du mot de passe:', error);
      // Gérez l'erreur, affichez un message d'erreur, etc.
      setMotDePasseError('Erreur lors de la réinitialisation du mot de passe.');
    }
  };

  

  return (
    <div className="container">
      <a href='/Login'className="retour-button" onClick={handleRetour}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M5 12l6 6" />
          <path d="M5 12l6 -6" />
        </svg>
      </a>

      {etape === 1 && (
        <div>
          <h2>Account Recovery</h2>
          <p className='ph'>To secure your account, we need to ensure that it's really you.</p>

          <input id="emailInput"  placeholder='Please Enter your e-mail address'></input>
          {emailError && <div className="error-message">{emailError}</div>}
          <br></br><br></br>
          {/* <p className='optiontext'>Choose the recovery option:</p> */}
          <button className='optionbutton' onClick={ handleCheckUserAndSendResetEmail}>✉ Receive a code on your trusted e-mail account</button>
          {/* <button className='optionbutton' onClick={ handleCheckUserAndSendResetEmail}>✉ Receive a code on your trusted e-mail account</button> */}
        </div>
      )}
      {etape === 2 && (
        <div>
          <h1>LOGO</h1>
          {choixValidation === 'gmail' ? (
            <p className='optiontext'>A validation code will be sent to {compteConnecte}.</p>
          ) : (
            <p>Un code de validation sera envoyé à votre email.</p>
          )}
          <button onClick={handleCheckUserAndSendResetEmail}>Send the validation code</button>
        </div>
      )}

      {etape === 3 && (
        <div>
          <h1>LOGO</h1>
          <p className='optiontext'>Enter the validation code below:</p>
          <input id="otpcode" placeholder='Type your code here..'  ></input>
          <button onClick={handleVerifierCode}>Verify the code</button>
          <br></br><br></br>
          <br></br><br></br>
        </div>
      )}

      {etape === 4 && (
        <div>
               <img src='envelope1.svg' alt="Envelop icon" style={{
            width: '50%',
            height: '50%',
            marginRight: 'auto',
            marginLeft: 'auto',
          }} />
          <h2>Welcome back! {compteUtilisateur}</h2> <br></br><br></br>
          <p className='optiontext'>Your account has been successfully recovered.<br></br>You can change your password if you have forgotten it. </p><br></br>
          <button onClick={handleModifierMotDePasse} style={{ marginRight: '0px' }}>Change password</button>
          {/* <button onClick={handleContinue}><Link to='/Welcomeback'>Continue</Link></button> */}
        </div>
      )}

      {etape === 5 && (
        <div>
          <h1>LOGO</h1>
          <h2>Modify password</h2>
          <input
            className='modifypassword'
            type="password"
            value={nouveauMotDePasse}
            onChange={(e) => setNouveauMotDePasse(e.target.value)}
            placeholder='Enter your new password'
          />
          <br></br><br></br>
          <input
            className='modifypassword'
            type="password"
            value={confirmationMotDePasse}
            onChange={(e) => setConfirmationMotDePasse(e.target.value)}
            placeholder='Confirm your new password'
          />
          <br></br> <br></br>
          {passwordError && <div className="error-message">{passwordError}</div>}
          <button onClick={handleNewPassword} style={{ marginRight: '100px' }}>Save the new password</button>
          <button onClick={handleIgnorer}><Link to='/Welcomeback' >Skip</Link></button>
        </div>
      )}
      {etape === 6 && (
        <div className='reset'>
          <h1 className='pwreset'>Your password has been reset!</h1>
          <img src='Ok-bro.svg' alt='success'/>
          <button className='nextbutton'><Link to='/Inbox'>Next</Link></button>
        </div>
      )}

      {codeError && <div className="error-message">{codeError}</div>}
      {generalError && <div className="error-message">{generalError}</div>}
      <style>
        {`body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f4f4f4;
  }
  
  .container {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 450px;
    width: 100%;
    border-radius: 20px;
  }
  .retour-button {
    position: absolute;
    top: 10px;
    left: 25px; 
    padding:0;
    cursor: pointer;
    background-color: transparent;
    color:black;
  }
  
  .nextbutton{
    border-radius: 20px;
    font-size: 15px;
    background-color: #395886;
    padding:10px 25px 10px;
    position: relative;
    bottom: 10px;
    right: 5px; 
    cursor: pointer;
    // margin-top:20px;
  }
  h2 {
    color: #395886;
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
    font-size: 30px;
    margin-top: 15px;
  }
  
  .ph {
    color: black;
    font-size:13px;
    margin-top:10px;
    color:#628ecb;
  }
 
  .oval-button {
    background-color: transparent;
    color: #000;  
    border: 1px solid #628ecb; 
    border-radius: 20px;
    padding: 3px 8px 3px; 
    cursor: pointer;
    font-size: 14px;
    box-shadow: none;
  }
  .oval-button:hover{
    opacity:0.8;
  }


  

   .optionbutton{
    border-radius: 20px;
    background-color: #395886;
    color:white;
    font-size: 15px;
    padding:10px 15px 10px;
    margin-top: 15px;
    width:100%;
  }
  
  .optiontext{
    margin-bottom:8px;
    background-color: transparent;
    color:black;
    font-size:14px;
  }
  button{
    border-radius: 20px;
    background-color: #395886;
    color:white;
    font-size: 15px;
    padding:10px 15px 10px;
    margin-top: 15px;
  }
  button:hover { 
  opacity:0.8;  }
  
  input {
    padding: 15px;
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #628ecb;
    border-radius: 20px;
    font-size: 14px;
  }
  .modifypassword{
    padding: 15px;
    margin-bottom: 4px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #628ecb;
    border-radius: 20px;
    font-size: 14px;
  }
  input::placeholder{
    font-size: 14px;
    color:#628ecb;
    padding:5px 8px 5px;
  }
 .reset {
  background-color: transparent;
  border:none;
 }
 .pwreset{
  font-family: 'Times New Roman', Times, serif;
  font-size: 25px;
  color:#395886;
  margin-bottom:10px;
 }
 img{
  width:100%;
  height:100%;
  right:auto;
  left:auto;
  padding:20px;
  align-self: center;
 }
 `

        }
      </style>
    </div>

  );
};

export default Recup;
