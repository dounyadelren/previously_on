import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer"
import Netflix from "../assets/images/netflix.jpeg"
import Disney from "../assets/images/disneyplus.jpeg"
import Amazon from "../assets/images/primevideo.jpeg"
import Orange from "../assets/images/orange.png"
import Canal from "../assets/images/canal.webp"
import Rakuten from "../assets/images/rakuten.png"

const InfoMovie = () => {

    function convertHMS(value) {
        const sec = parseInt(value, 10);
        let hours = Math.floor(sec / 3600);
        let minutes = Math.floor((sec - (hours * 3600)) / 60);
        let seconds = sec - (hours * 3600) - (minutes * 60);
        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return hours + ' h ' + minutes + ' min'
    }

    let { id } = useParams()
    let stars = <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="yellow" d="M14.43 10L12 2l-2.43 8H2l6.18 4.41L5.83 22L12 17.31L18.18 22l-2.35-7.59L22 10z"></path>
    </svg>;
    let location = useLocation();
    let statusMovie = location?.state;
    let navigate = useNavigate();
    const [movie, setMovie] = useState();
    const token = sessionStorage.getItem("Token")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const res = await fetch(`https://api.betaseries.com/movies/movie?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}`)
            const json = await res.json();
            setMovie(json.movie)
            setIsLoading(false)
        }
        fetchData();
    }, [id])

    const addSee = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            await fetch(`https://api.betaseries.com/movies/movie?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&state=1&profile=1&token=${token}`, {
                method: "POST",
            })
            navigate('/list/movies');
            window.location.reload(true);
        }
        fetchData()
    }

    const addNotSee = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            await fetch(`https://api.betaseries.com/movies/movie?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&state=0&profile=0&token=${token}`, {
                method: "POST",
            })
            navigate('/list/movies');
            window.location.reload(true);
        }
        fetchData()
    }

    const addFav = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            await fetch(`https://api.betaseries.com/movies/favorite?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
                method: "POST",
            })
            navigate('/list/movies')
            window.location.reload(true);
        }
        fetchData()
    }

    const deleteFav = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            await fetch(`https://api.betaseries.com/movies/favorite?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
                method: "DELETE",
            })
            navigate('/list/movies');
            window.location.reload(true);
        }
        fetchData()
    }

    const removeSee = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            await fetch(`https://api.betaseries.com/movies/movie?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
                method: "DELETE",
            })
            navigate('/list/movies');
            window.location.reload(true);
        }
        fetchData()
    }

    const trailer = (urlCode) => {
        window.location.href = "https://www.youtube.com/watch?v=" + urlCode
    }

    return (
        <>
            <Nav />
            {
                isLoading ?
                    <>
                        <div className="h-36"></div>
                        <div className="flex justify-center mt-40">
                            <svg width="6rem" height="6rem" viewBox="0 0 1024 1024" className="animate-spin"><path fill="#E50914" d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
                        </div>
                    </>
                    :
                    <>
                        <div className="flex justify-center">
                            {
                                movie?.backdrop ?
                                    <img id="backdrop" src={movie?.backdrop} alt="chargement" />
                                    :
                                    <img className="object-cover h-128" src={movie?.poster} alt="chargement" />
                            }
                        </div>
                        <div className="grid grid-cols-2 leading-7 mr-4 ml-4 mt-5 sm:flex sm:flex-col">
                            <div className="col-start-1 col-end-3">
                                <div className="w-9/12">
                                    <p className="text-4xl md:text-xl sm:text-lg">{movie?.title}</p>
                                    <div className="flex items-center mt-2">
                                        <p className="mr-4 text-gray">{movie?.production_year}</p>
                                        <div className="mr-4 text-gray">
                                            {
                                                movie?.notes?.mean !== null ?
                                                    <div className="flex items-center flex-wrap">
                                                        <span className="mr-1">{movie?.notes?.mean}/5</span>
                                                        {1.5 < movie?.notes?.mean && <span>{stars}</span>}
                                                        {2.5 < movie?.notes?.mean && <span>{stars}</span>}
                                                        {3.5 < movie?.notes?.mean && <span>{stars}</span>}
                                                        {4.5 < movie?.notes?.mean && <span>{stars} </span>}
                                                    </div>
                                                    :
                                                    <p>Aucun avis</p>
                                            }
                                        </div>
                                        <p className="mr-4 text-gray">{convertHMS(movie?.length)}</p>
                                        <button className="text-red" onClick={(e) => trailer(movie?.trailer)}>
                                            <svg width="1.8em" height="1.8em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 3H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h5v2h8v-2h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm0 14H3V5h18v12zm-5-6l-7 4V7z"></path></svg>
                                        </button>

                                    </div>
                                    <p className="sm:mt-5">{movie?.synopsis}</p>
                                </div>
                            </div>
                            <div className="mt-2 col-end-4 col-span-1 text-right sm:text-left sm:mt-5">
                                {
                                    statusMovie?.status ?
                                        <>
                                            {
                                                statusMovie?.status === true ?
                                                    <button onClick={deleteFav} type="submit">
                                                        <svg className="hover:text-red" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M16.5 3c-.96 0-1.9.25-2.73.69L12 9h3l-3 10l1-9h-3l1.54-5.39C10.47 3.61 9.01 3 7.5 3C4.42 3 2 5.42 2 8.5c0 4.13 4.16 7.18 10 12.5c5.47-4.94 10-8.26 10-12.5C22 5.42 19.58 3 16.5 3z"></path>
                                                        </svg>
                                                    </button>
                                                    :
                                                    <>
                                                        <button onClick={addFav} type="submit">
                                                            <svg className="hover:text-red" width="2.5em" height="2.5em" viewBox="0 0 256 256"><path fill="currentColor" d="M236 92c0 30.6-17.7 62-52.6 93.4a314.3 314.3 0 0 1-51.5 37.6a8.1 8.1 0 0 1-7.8 0C119.8 220.6 20 163.9 20 92a60 60 0 0 1 108-36a60 60 0 0 1 108 36Z"></path>
                                                            </svg>
                                                        </button>
                                                        <button className="ml-4" onClick={removeSee} type="submit">
                                                            <svg className="hover:text-gray" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"></path></svg>
                                                        </button>
                                                    </>
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                statusMovie?.status === 0 ?
                                                    <button onClick={addSee} type="submit">
                                                        <svg className="hover:text-gray mr-4" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5l1.5 1.5M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-.25.65-.56 1.26-.92 1.85a5.77 5.77 0 0 0-1.9-.73l.64-1.12a9.821 9.821 0 0 0-17.64 0A9.821 9.821 0 0 0 12 17.5l1.21-.07c-.14.5-.21 1.03-.21 1.57v.46l-1 .04c-5 0-9.27-3.11-11-7.5c1.73-4.39 6-7.5 11-7.5Z"></path>
                                                        </svg>
                                                    </button>
                                                    :
                                                    <>
                                                        <button onClick={addSee} type="submit">
                                                            <svg className="hover:text-gray mr-4" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5l1.5 1.5M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-.25.65-.56 1.26-.92 1.85a5.77 5.77 0 0 0-1.9-.73l.64-1.12a9.821 9.821 0 0 0-17.64 0A9.821 9.821 0 0 0 12 17.5l1.21-.07c-.14.5-.21 1.03-.21 1.57v.46l-1 .04c-5 0-9.27-3.11-11-7.5c1.73-4.39 6-7.5 11-7.5Z"></path>
                                                            </svg>
                                                        </button>
                                                        <button onClick={addNotSee} type="submit">
                                                            <svg className="hover:text-gray" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5c.36 0 .72 0 1.08-.05a6.09 6.09 0 0 1-.08-.95c0-.36.04-.72.1-1.08c-.36.04-.73.08-1.1.08c-3.76 0-7.17-2.14-8.82-5.5a9.821 9.821 0 0 1 17.64 0c-.12.24-.26.45-.39.68c.66.16 1.29.43 1.86.82c.27-.5.51-1 .71-1.5c-1.73-4.39-6-7.5-11-7.5M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m6 5.5v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2Z"></path></svg>
                                                        </button>
                                                    </>
                                            }
                                        </>
                                }
                                <div className="flex justify-end sm:justify-start">
                                    <p className="mt-5 text-gray">Réalisateur: </p>
                                    <p className="mt-5 ml-1"> {movie?.director}</p>
                                </div>
                                <div className="flex justify-end sm:justify-start sm:mt-5">
                                    <p className="text-gray">Genre: </p>
                                    {
                                        movie?.genres?.map((x, i) => (
                                            <div key={i} className="">
                                                <p className="ml-2">{x}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex justify-end sm:justify-start sm:mt-5">
                                    <p className="ml-1">{movie?.followers} followers</p>
                                </div>
                                <div className="flex justify-end sm:justify-start sm:mt-5">
                                    <>
                                        {
                                            movie?.platform_links?.map((n, i) => (
                                                (() => {
                                                    switch (n.platform) {
                                                        case 'Netflix':
                                                            return (<img className="h-[50px] w-570px] rounded-full object-cover object-center" src={Netflix} alt="Netflix" />)
                                                        case 'Amazon Prime Video':
                                                            return (<img className="h-[70px] w-[70px] rounded-full object-cover object-center" src={Amazon} alt="Amazon Prime Video" />)
                                                        case 'Salto':
                                                            return (<img className="h-[70px] rounded-full object-cover object-center" src={Netflix} alt="Salto" />)
                                                        case 'Disney+':
                                                            return (<img className="h-[70px] w-[70px] object-cover rounded-full" src={Disney} alt="Disney +" />)
                                                        case 'Canal Play VOD':
                                                            return (<img className="h-[70px] rounded-full object-cover object-center" src={Canal} alt="Canal Play VOD" />)
                                                        case 'Orange VOD':
                                                            return (<img className="h-[70px] w-[70px] rounded-full object-cover object-center" src={Orange} alt="Orange VOD" />)
                                                        case 'Rakuten TV':
                                                            return (<img className="w-[70px] object-contain object-center" src={Rakuten} alt="Rakuten TV" />)
                                                        default:
                                                            return null
                                                    }
                                                })()

                                            ))
                                        }
                                    </>
                                </div>
                            </div>
                        </div>
                    </>
            }
            <div className="sm:mt-20">
                <Footer />
            </div>
        </>
    )
}

export default InfoMovie