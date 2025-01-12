import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useNavigate } from "react-router"
import axios from "axios"

export const Dashboard = () => {
    const navigate=useNavigate();
    let [amount,setAmount]=useState(0);
    let [firstname,setFirstname]=useState("");
    useEffect(()=>{
        let token=localStorage.getItem("token");
        if(!token)
            navigate("/signin");
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        }).then(res=>{setAmount(res.data.balance)})

        axios.get("http://localhost:3000/api/v1/user/getName",{
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        }).then(res=>{setFirstname(res.data.firstname)})
        
        
    },[navigate])


    return <div>
        <Appbar name={firstname} />
        <div className="m-8">
            <Balance value={amount} />
            <Users />
        </div>
    </div>
}