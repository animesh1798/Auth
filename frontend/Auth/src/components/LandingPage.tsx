const handleGetDetailsButton = () => {
    fetch("http://localhost:3000/user", {
        method: "GET",
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => console.log(data))
}

const LandingPage = () => {
    return (
        <>
            <button 
                className="get-details"
                onClick = {handleGetDetailsButton}
                >Get Details</button>
        </>
    )
}

export default LandingPage