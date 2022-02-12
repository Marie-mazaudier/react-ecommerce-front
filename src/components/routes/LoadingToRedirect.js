import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () => {
    const [count, setCount]= useState(1)
    let history = useHistory()

    useEffect(()=> { // au lancement, décrémentation du state countdown

        const interval =setInterval(()=> {
            setCount((currentCount) => --currentCount) // moins 1
        }, 1000)
        // redirect once count is equal to 0
        count === 0 && history.push('/')
        //cleanup
        return () => clearInterval(interval)

    }, [count, history]) // dependance useEffect au countdown jusqu'à 0

    return(
        <div className="container p-5 text-center">
            <p>Redirectiong you in  {count} seconds </p>
        </div>
    )
}

export default LoadingToRedirect