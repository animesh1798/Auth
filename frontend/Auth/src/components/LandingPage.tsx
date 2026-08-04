const handleGetDetailsButton = () => {
    fetch("http://localhost:3000/user", {
        method: "GET",
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

const handleLogout = () => {
    fetch("http://localhost3000/user/logout", {
        method: "GET",
        credentials: "include"
    })
    .then(res => res.json())
    .then(console.log)
}

const LandingPage = () => {
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