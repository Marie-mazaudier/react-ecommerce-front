import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"; // Pour savoir si le user est loggé ou pas

const ForgotPassword = ({history}) => { // historique du react router dom pour la redirection
 const [email, setEmail] = useState('')
 const [loading, setLoading]= useState(false)

 const {user} = useSelector((state) => ({...state}))

 useEffect(() => {
    if(user && user.token)
    { 
        history.push('/')
    }
 }, [user, history])
 
 const handleSubmit = async (e) => { // async car fonction firebase
    e.preventDefault();
    setLoading(true)

    const config = { 
        url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
        handleCodeInApp: true,
    }
    await auth.sendPasswordResetEmail(email, config) 
    .then(() => {
        setEmail('')
        setLoading(false)
        toast.success("Check your Email for password reset link")
    })
    .catch((error) => {
        setLoading(false)
        toast.error(error.message)
        console.log('Error message in forgot password', error)
    })
 }
 return ( 
    <div className="container col-md-6 offset-md-3 p-5">
       {loading ?  
       (<h4 className="text-danger">Loading</h4> )
       : 
       ( <h4>Forgot password</h4>)
       }
       <form onSubmit={handleSubmit}>
           <input 
           type="email" 
           className="form-control" 
           value={email} 
           onChange={(e) => setEmail(e.target.value)}
           placeholder = "Type your email"
           autoFocus
           />
           <br/>
           <button className="btn btn-raised" disabled={!email}>
               Submit
           </button>
       </form>
    </div>
 )

}

export default ForgotPassword

