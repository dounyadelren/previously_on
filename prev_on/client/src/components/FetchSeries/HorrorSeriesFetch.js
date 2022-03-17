import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const HorrorSeriesFetch = () => {
    const [seriesHorror, setSeriesHorror] = useState();

    useEffect(() => {
        if (window.screen.width <= 734) {
            fetch(`https://api.betaseries.com/search/shows?client_id=${process.env.REACT_APP_CLIENT_ID}&limit=6&offset=0&genres=Horror`)
                .then(res => res.json())
                .then(data => setSeriesHorror(data.shows))
        } else {
            fetch(`https://api.betaseries.com/search/shows?client_id=${process.env.REACT_APP_CLIENT_ID}&limit=5&offset=0&genres=Horror`)
                .then(res => res.json())
                .then(data => setSeriesHorror(data.shows))
        }
    }, [])

    return (
        <div className="text-white">
            <h1 className="ml-5 mb-5">Horreur</h1>
            <div className="grid grid-cols-5 sm:grid sm:grid-cols-3">
                {
                    seriesHorror?.map((x, i) => (
                        <div key={i}>
                            <Link to={{ pathname: `/serie/${x.id}` }} >
                                <div className="ml-5 mb-5 img_thumb sm:ml-2 sm:mr-2" id="img_movies">
                                    <img className="object-cover" src={x.poster} alt="chargement" />
                                    <div id="title_movies" className="grid grid-cols-2">
                                        <div className="ml-2">
                                            <p className="text-lg truncate">{x.title}</p>
                                        </div>
                                        <div className="mr-4 col-end-4 col-span-1">
                                            <svg width="1.5em" height="1.5em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.2 102.2 0 0 0 128 26Zm0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90Zm14-42a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6v-50h-2a6 6 0 0 1 0-12h8a6 6 0 0 1 6 6v50h2a6 6 0 0 1 6 6Zm-26-92a10 10 0 1 1 10 10a10 10 0 0 1-10-10Z"></path></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default HorrorSeriesFetch