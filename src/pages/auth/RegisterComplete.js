import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {createOrUpdateUser} from '../../functions/auth'


const RegisterComplete = ({history}) => {  // props.history 

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState('')
    let dispatch = useDispatch()

  //  const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        setEmail(window.localStorage.getItem('emailForRegistration'))

    }, [history])

//    history.push('/dashboard')
    const handleSubmit = async(e) => {
        e.preventDefault()
        //validation
        if(!email || !password) {
            toast.error('Email and password is required')
            return // n'execute pas la suite du code si pblm
        }
        if(password.length < 6 ) {
            toast.error('Password must be at least 6 characters long')
            return  // n'execute pas la suite du code si pblm
        }
        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            )
        if(result.user.emailVerified) {
            //  remove user email from local storage
            window.localStorage.removeItem('emailForRegistration')
            // get user id token
            let user = auth.currentUser
            await user.updatePassword(password) // fonction firebase
            const idTokenResult = await user.getIdTokenResult() // autre fonction
            // redux store
            createOrUpdateUser(idTokenResult.token) //requete envoyée au backend
            .then((res) => {console.log("CREATE OR UPDATE RES", res) // Réponse du backend 
               dispatch({ // on peut maintenant mettre à jour le store redux
                 type: "LOGGED_IN_USER",
                 payload: {
                 name:res.data.name,
                 email: res.data.email,
                 token: idTokenResult.token,
                 role: res.data.role,
                 _id: res.data_id,
                 },
               });
             })
             .catch(err => console.log(err));
            // redirect
            history.push('/')
        }
        } catch(error) {
            console.log(error)
            toast.error(error.message)
        }
      
    };

    // Pourrait aussi être direct écrit dans return en dessous
   const completeRegistrationForm = () => 
 (  <form onSubmit={handleSubmit}>
       <input type="email" 
       className="form-control" 
       value={email} 
       autoFocus
       disabled
    />
     <input type="password" 
       className="form-control" 
       value={password} 
       onChange={(e) => setPassword(e.target.value)}
       autoFocus
       
       placeholder="Password"
    />
    <br/>
    <button type="submit" className="btn btn-raised">
            Complete Registration
    </button>
    </form>
    
 )
   



    return (
        <div className="container p-5">
           <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register complete</h4>
                  
                    {completeRegistrationForm()}
                </div>
           </div>
        </div>
    )
}

export default RegisterComplete