import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const InfoSerie = () => {

    const token = sessionStorage.getItem('Token')

    let { id } = useParams()
    let stars = <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="yellow" d="M14.43 10L12 2l-2.43 8H2l6.18 4.41L5.83 22L12 17.31L18.18 22l-2.35-7.59L22 10z"></path>
    </svg>;

    const [show, setShow] = useState();
    const [genres, setGenres] = useState([]);
    const [seasons, setSeasons] = useState();
    const [imgEpisodes, setImgEpisodes] = useState([])
    const [seenEpisodes, setSeenEpisodes] = useState();
    const [value, setValue] = useState('1');
    const [vu, setVu] = useState(0)
    let location = useLocation();
    let statusSerie = location?.state;
    let navigate = useNavigate();

    useEffect(() => {
        let array = []
        fetch(`https://api.betaseries.com/shows/display?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}`)
            .then(res => res.json())
            .then(data => {
                setShow(data.show);
                setSeasons(data.show.seasons_details);
                setGenres(Object.entries(data.show.genres))
            })
        fetch(`https://api.betaseries.com/shows/episodes?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&season=${value}`)
            .then(res => res.json())
            .then(data => {
                data.episodes.forEach(v => {
                    fetch(`https://api.betaseries.com/pictures/episodes?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${v.id}&width=250&height=150`)
                        .then(data => {
                            const info = {
                                id: v.id,
                                title: v.title,
                                code: v.code,
                                date: v.date,
                                description: v.description,
                                url: data.url
                            }
                            array.push(info);
                            array.sort(function compare(a, b) {
                                if (a.code < b.code) {
                                    return -1
                                }
                                if (a.code > b.code) {
                                    return +1
                                }
                                return 0
                            })
                            setImgEpisodes([...array])
                        })
                        .catch(e => console.log(e))
                })
            })

        let a = []
        fetch(`https://api.betaseries.com/episodes/unrated?client_id=${process.env.REACT_APP_CLIENT_ID}&token=${token}&nbpp=100&all`)
            .then(res => res.json())
            .then(data => {
                data.episodes.forEach(x => {
                    fetch(`https://api.betaseries.com/shows/episodes?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&season=${value}`)
                        .then(res => res.json())
                        .then(data => {
                            data.episodes.forEach(z => {
                                if (x.id === z.id) {
                                    const seen = {
                                        id: z.id,
                                        title: z.title,
                                        status: "vu"
                                    }
                                    a.push(seen);
                                    setSeenEpisodes([...a])
                                }
                            })
                        })
                        .catch(e => console.log(e))
                })
            })
    }, [value, vu, id, token])

    const addToAccount = () => {
        const fetchData = async () => {
            await fetch(`https://api.betaseries.com/shows/show?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
                method: "POST",
            })
            navigate('/list/series')
            window.location.reload(true);
        }
        fetchData()
    }

    const addFav = () => {
        const fetchData = async () => {
            await fetch(`https://api.betaseries.com/shows/favorite?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
                method: "POST",
            })
            navigate('/list/series')
            window.location.reload(true);
        }
        fetchData()
    }

    const deleteFav = () => {
        const fetchData = async () => {
            await fetch(`https://api.betaseries.com/shows/favorite?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
                method: "DELETE",
            })
            navigate('/list/series');
            window.location.reload(true);
        }
        fetchData()
    }

    const deleteFromAccount = () => {
        const fetchData = async () => {
            await fetch(`https://api.betaseries.com/shows/show?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
                method: "DELETE",
            })
            navigate('/list/series');
            window.location.reload(true);
        }
        fetchData()
    }

    const episodeWatched = (id) => {
        const fetchData = async () => {
            await fetch(`https://api.betaseries.com/episodes/watched?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&bulk=true&token=${token}`, {
                method: "POST"
            })
            setVu(vu + 1)
        }
        fetchData()
    }

    const unWatched = (id) => {
        const FetchData = async () => {
            await fetch(`https://api.betaseries.com/episodes/watched?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
                method: "DELETE"
            })
            setVu(vu - 1)
        }
        FetchData()
    }

    const handleChange = (e) => {
        e.preventDefault();
        setValue(e.target.value)
    }

    let seen = 0;

    const archiveShow = () => {
        const postData = async () => {
            await fetch(`https://api.betaseries.com/shows/archive?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
                method: "POST",
            })
            navigate('/list/series');
            window.location.reload(true);
        }
        postData()
    }

    return (
        <>
            <Nav />
            <img id="backdrop" src={show?.images.show} alt="chargement" />
            <div className="grid grid-cols-2 leading-7 mr-4 ml-4 mt-5 sm:flex sm:flex-col">
                <div className="col-start-1 col-end-3">
                    <div className="w-9/12 md:w-[500px]">
                        <h1 className="text-4xl md:text-xl">{show?.title}</h1>
                        <div className="flex items-center mt-2 md:flex-col md:items-start sm:grid sm:grid-cols-2">
                            <p className="mr-4 text-gray">{show?.creation}</p>
                            <div className="mr-4 text-gray">
                                {
                                    show?.notes?.mean !== null ?
                                        <div className="flex items-center flex-wrap">
                                            <span className="flex items-center">{Math.round(show?.notes?.mean * 100) / 100}/5 {stars}</span>
                                            {1.5 < show?.notes?.mean && <span>{stars}</span>}
                                            {2.5 < show?.notes?.mean && <span>{stars}</span>}
                                            {3.5 < show?.notes?.mean && <span>{stars}</span>}
                                            {4.5 < show?.notes?.mean && <span>{stars} </span>}
                                        </div>
                                        :
                                        <p>Aucun avis</p>
                                }
                            </div>
                            <p className="mr-4 text-gray">{show?.seasons} saison </p>
                            <p className="mr-4 text-gray"> {show?.episodes} épisodes</p>
                            <p className="mr-4 text-gray">{show?.length} min</p>
                            <p className="mr-4 text-gray">{show?.status === "Ended" ? "Terminé" : "En cours"}</p>
                        </div>
                        <p className="mt-2">{show?.description}</p>
                    </div>
                </div>
                <div className="mt-2 col-end-4 col-span-1 text-right  md:col-start-1 md:col-end-3 md:text-left sm:text-left sm:mt-5">
                    {
                        statusSerie?.myStatus === 1 ?
                            <>
                                {
                                    statusSerie?.myShow === 1 ?
                                        <>
                                            <button onClick={deleteFav}>
                                                <svg className="hover:text-red" width="2.5em" height="2.5em" viewBox="0 0 24 24" ><path fill="currentColor" d="M16.5 3c-.96 0-1.9.25-2.73.69L12 9h3l-3 10l1-9h-3l1.54-5.39C10.47 3.61 9.01 3 7.5 3C4.42 3 2 5.42 2 8.5c0 4.13 4.16 7.18 10 12.5c5.47-4.94 10-8.26 10-12.5C22 5.42 19.58 3 16.5 3z"></path></svg>
                                            </button>
                                            <button onClick={deleteFromAccount}>
                                                <svg className="hover:text-gray" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"></path></svg>
                                            </button>
                                            <button onClick={archiveShow}>
                                                <svg width="2.5em" height="2.5em" viewBox="0 0 512 512"><path fill="currentColor" d="M64 164v244a56 56 0 0 0 56 56h272a56 56 0 0 0 56-56V164a4 4 0 0 0-4-4H68a4 4 0 0 0-4 4Zm267 151.63l-63.69 63.68a16 16 0 0 1-22.62 0L181 315.63c-6.09-6.09-6.65-16-.85-22.38a16 16 0 0 1 23.16-.56L240 329.37V224.45c0-8.61 6.62-16 15.23-16.43A16 16 0 0 1 272 224v105.37l36.69-36.68a16 16 0 0 1 23.16.56c5.8 6.37 5.24 16.29-.85 22.38Z"></path><rect width="448" height="80" x="32" y="48" fill="currentColor" rx="32" ry="32"></rect></svg>
                                            </button>
                                        </>
                                        :
                                        <>
                                            <button onClick={addFav}>
                                                <svg className="hover:text-red" width="2.5em" height="2.5em" viewBox="0 0 256 256"><path fill="currentColor" d="M236 92c0 30.6-17.7 62-52.6 93.4a314.3 314.3 0 0 1-51.5 37.6a8.1 8.1 0 0 1-7.8 0C119.8 220.6 20 163.9 20 92a60 60 0 0 1 108-36a60 60 0 0 1 108 36Z"></path>
                                                </svg>
                                            </button>
                                            <button onClick={deleteFromAccount}>
                                                <svg className="hover:text-gray" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"></path></svg>
                                            </button>
                                        </>
                                }
                            </>
                            :
                            <button onClick={addToAccount}>
                                <svg className="hover:text-gray" width="2.5em" height="2.5em" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z">
                                    </path>
                                </svg>
                            </button>
                    }
                    <div className="flex justify-end md:flex-col md:justify-start sm:justify-start">
                        <p className="mt-5 text-gray md:mt-1">Show runner: </p>
                        <p className="mt-5 ml-1 md:mt-0">{show?.showrunner?.name}</p>
                    </div>
                    <div className="flex justify-end md:flex-col md:justify-start sm:flex-col sm:justify-start sm:mt-5">
                        <p className="text-gray">Genre: </p>
                        <div className="flex">
                            {
                                genres.map((element, i) => (
                                    <div key={i}>
                                        <span className="mx-1">{element[0]}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex justify-end md:justify-start md:mt-1 md:text-gray sm:justify-start sm:mt-5">
                        <p className="ml-1">{show?.followers} followers</p>
                    </div>
                    <div className="flex justify-end md:justify-start md:mt-1 sm:justify-start sm:mt-5">
                        <img className="rounded-full h-[70px] mr-1" src={show?.platforms?.svod?.logo} alt="chargement" />
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-between items-center text-lg leading-7 mb-4 mt-4 sm:justify-end">
                <div className="ml-4 sm:hidden">
                    <h2>Épisodes</h2>
                </div>
                <div className="mr-4">
                    <select name="saisons" className="bg-black border px-4 py-2 p-1" onChange={handleChange}>
                        {
                            seasons?.map((x, i) => (
                                <option key={i} value={x.number}>Saisons {x.number}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <hr className="ml-4 mr-4" />
            <div className="ml-4 mr-4">
                <>
                    {
                        imgEpisodes?.map((episode, i) => (
                            <div key={i} className="card h-[300px] flex justify-around items-center sm:h-[150px]">
                                {
                                    <>
                                        {
                                            seen = 0,
                                            seenEpisodes?.map(x => {
                                                (seen += x.status === "vu" && episode.id === x.id ? 1 : 0)
                                            })
                                        }
                                    </>
                                }
                                <div className="flex items-center">
                                    {
                                        seen > 0 ?
                                            <Link to={`/details/${episode.id}`} state={{ state: "vu" }}>
                                                <img src={episode.url} alt="chargement" className="w-[300px] h-[200px] md:w-[250px] md:h-[150px] md:object-cover sm:w-[250px] sm:h-[100px]" />
                                            </Link>
                                            :
                                            <Link to={`/details/${episode.id}`} state={{ state: "null" }}>
                                                <img src={episode.url} alt="chargement" className="w-[300px] h-[200px] md:w-[250px] md:h-[150px] md:object-cover sm:w-[250px] sm:h-[100px]" />
                                            </Link>
                                    }
                                    <div className="flex w-[600px] h-[200px] flex-col px-4 md:w-[400px] md:h-[150px] sm:w-[300px] sm:flex sm:justify-center">
                                        <span>{episode.code} - {episode.title}&ensp;
                                            <span className="text-gray">
                                                {episode?.date?.substr(8, 2) + "/" + episode?.date?.substr(5, 2) + "/" + episode?.date?.substr(0, 4)}
                                            </span>
                                        </span>
                                        <p id="scroll" className="overflow-scroll  sm:hidden">{episode.description}</p>
                                    </div>
                                </div>
                                {
                                    seen > 0 ?
                                        <button onClick={e => { unWatched(episode.id) }}>
                                            <svg className="text-green" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5l1.5 1.5M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-.25.65-.56 1.26-.92 1.85a5.77 5.77 0 0 0-1.9-.73l.64-1.12a9.821 9.821 0 0 0-17.64 0A9.821 9.821 0 0 0 12 17.5l1.21-.07c-.14.5-.21 1.03-.21 1.57v.46l-1 .04c-5 0-9.27-3.11-11-7.5c1.73-4.39 6-7.5 11-7.5Z"></path></svg>
                                        </button>

                                        :
                                        <button onClick={e => { episodeWatched(episode.id) }}>
                                            <svg width="2.5em" height="2.5em" className="hover:text-gray" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5c.36 0 .72 0 1.08-.05a6.09 6.09 0 0 1-.08-.95c0-.36.04-.72.1-1.08c-.36.04-.73.08-1.1.08c-3.76 0-7.17-2.14-8.82-5.5a9.821 9.821 0 0 1 17.64 0c-.12.24-.26.45-.39.68c.66.16 1.29.43 1.86.82c.27-.5.51-1 .71-1.5c-1.73-4.39-6-7.5-11-7.5M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m6 5.5v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2Z"></path></svg>
                                        </button>
                                }
                            </div>
                        ))
                    }
                </>
            </div>
            <Footer />
        </>
    )
}

export default InfoSerie