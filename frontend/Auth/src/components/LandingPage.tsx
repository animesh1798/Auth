import { useNavigate } from "react-router-dom"



const LandingPage = () => {

    const navigate = useNavigate()

    const handleGetDetailsButton = () => {
    fetch("http://localhost:3000/user", {
        method: "GET",
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

    const handleLogout = async () => {
        
        try{
        const resp = await fetch("http://localhost:3000/user/logout", {
            method: "GET",
            credentials: "include"
        })

        if (!resp.ok)
            throw new Error("Can't logout")
        const data = await resp.json()
        
        navigate("/")
        alert(data.message)

        } catch (e){
            console.log(e)
        }
        
    }

    return (
        <>
            <button 
                className="get-details"
                onClick = {handleGetDetailsButton}
                >Get Details</button>
            
            <button 
                className="logout"
                onClick={handleLogout}
                >Logout</button>
        </>
    )
}

export default LandingPage