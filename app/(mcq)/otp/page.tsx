
'use client'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useEffect, useState } from 'react';
import { signInWithPhoneNumber, ConfirmationResult, RecaptchaVerifier } from 'firebase/auth';
import {auth} from '@/firebase'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {


    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
 
  } catch (error) {

    return false;
  }
};




const OTPSignIn = () => {

  const success = () => toast("OTP send successful ✅");
  const error =(e:string) =>toast.warn("Login error "+e)
  
 
  

  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [send,setSend]=useState(false)
  const [codee,setcodee]=useState(false)

  const isValid = isPhoneValid(phoneNumber);

  const handleSendOTP = async () => {
    try {
      setSend(true);

      const recaptchaContainer = document.getElementById("recaptcha-container");
      recaptchaContainer!.parentNode!.removeChild(recaptchaContainer!);
      

        // Recreate the DOM element
      const newRecaptchaContainer = document.createElement("div");
      newRecaptchaContainer.id = "recaptcha-container";
      document.body.appendChild(newRecaptchaContainer);


      const appVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
        size: 'invisible',
        callback: (response:any) => {
          
        },
      });

      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      
      
      success()
    } catch (e:any) {
      
      error(e.code as string)

    }
  };

  const validity = ()=>{
    if(isValid){
      document.documentElement.style.setProperty('--react-international-phone-border-color', 'gainsboro');
    }else{
      document.documentElement.style.setProperty('--react-international-phone-border-color', 'red');
    }

  }

  useEffect(() => {
    validity()
    
  },[phoneNumber]);
  

  

  const handleVerifyOTP = async () => {

    const response = await fetch('/api/verify',{
      method: "POST",
      headers: {
       "Content-Type": "application/json",
      },
      body: JSON.stringify({
       sessionInfo: confirmationResult?.verificationId,
       phoneNumber: phoneNumber,
       code:verificationCode,
      }),
   })

   const data:any = await response.json()

   console.log(data)
   
   if(data.token){
    window.location.href = '/';

   }

   if(data.message){
    window.location.href = '/register';

   }
   if(data.error){
    error(data.error.message)
   }
    

  };

  return (
    <div className='flex justify-center h-screen'>

      <div className='my-auto '>

      <h1 className='text-center mb-3 uppercase text-textprime font-semibold'>OTP Sign In</h1>
      <PhoneInput  defaultMask='.... ......'  defaultCountry="bd" value={phoneNumber}  onChange={(phone) => {
        setPhoneNumber(phone)
        
        
      }}/>
      
      <div id="recaptcha-container"></div>

      <div className='flex justify-center'><button className='w-full mt-3 bg-black text-white p-1 rounded-md' onClick={handleSendOTP}>{send?'Resend OTP':'Send OTP'}</button></div>

      {confirmationResult && (
        <div className='flex flex-col'>
          <input type="text" placeholder="OTP Code" value={verificationCode} onChange={(e) => {
            setcodee(false)
            setVerificationCode(e.target.value)
          }} className={`mt-3 input input-bordered ${codee?'input-error':''}  w-full max-w-xs`} />

         
          <button className=' mt-3 bg-black text-white p-1 rounded-md' onClick={handleVerifyOTP}>Verify OTP</button>
        </div>
      )}  

     </div>
     <ToastContainer position="bottom-right" />


    </div>
  );
};

export default OTPSignIn;
