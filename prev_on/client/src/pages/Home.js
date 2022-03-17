import React, { useEffect } from "react";

const Home = () => {

    useEffect(() => {
        document.body.className = 'body_home';
    }, [])

    const Redirect = () => {
        window.location.href = `https://www.betaseries.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`
    }

    return (
        <div>
            <h1 className="text-5xl text-red mt-3 ml-5" id="title_home">Previously on</h1>
            <div className="text-center mt-60">
                <div id="corp_home">
                    <p className="text-4xl mb-4">Vos films et séries préférés!</p>
                    <p className="text-2xl mb-5">Ou que vous soyez, ajoutez à tout moment.</p>
                </div>
                <button className="bg-red text-white text-2xl font-bold py-2 px-8 rounded" id="btn_home" onClick={Redirect}>S'identifier </button>
            </div>
        </div>
    )
}

export default Home;