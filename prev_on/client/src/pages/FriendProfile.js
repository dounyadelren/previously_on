import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Default from "../assets/images/default-ban.jpeg"

const FriendProfile = () => {

    let { id } = useParams()

    const [friend, setFriend] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [imgBadges, setImgBadges] = useState([])
    const [friendShow, setFriendShow] = useState()
    const [friendMovie, setFriendMovie] = useState()

    function getDataHR(newMinutes) {
        let minutes;
        let days;
        let months;
        let years;
        let weeks;
        let hours;
        let MINS_PER_YEAR = 24 * 365 * 60
        let MINS_PER_MONTH = 24 * 30 * 60
        let MINS_PER_WEEK = 24 * 7 * 60
        let MINS_PER_DAY = 24 * 60
        let MINS_PER_HOUR = 60
        minutes = newMinutes;
        years = Math.floor(minutes / MINS_PER_YEAR)
        minutes = minutes - years * MINS_PER_YEAR
        months = Math.floor(minutes / MINS_PER_MONTH)
        minutes = minutes - months * MINS_PER_MONTH
        weeks = Math.floor(minutes / MINS_PER_WEEK)
        minutes = minutes - weeks * MINS_PER_WEEK
        days = Math.floor(minutes / MINS_PER_DAY)
        minutes = minutes - days * MINS_PER_DAY
        hours = Math.floor(minutes / MINS_PER_HOUR)
        minutes = minutes - days * MINS_PER_HOUR
        return years + " année(s) " + months + " mois " + weeks + "semaine(s) " + days + " jour(s) " + hours + " heure(s)"
    }

    useEffect(() => {
        let array = []
        const fetchData = async () => {
            setIsLoading(true);
            const res = await fetch(`https://api.betaseries.com/members/infos?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}`)
            const json = await res.json();
            setFriend(json.member)
            setIsLoading(false);
        }
        fetchData();

        fetch(`https://api.betaseries.com/members/badges?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}`)
            .then(res => res.json())
            .then(data => {
                data.badges.forEach(b => {
                    fetch(`https://api.betaseries.com/pictures/badges?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${b.id}`)
                        .then(data => {
                            const infoBadge = {
                                idBadge: b.id,
                                name: b.name,
                                code: b.code,
                                url: data.url
                            }
                            array.push(infoBadge)
                            setImgBadges([...array])
                        })
                        .catch(e => console.log(e))
                })
            })

        fetch(`https://api.betaseries.com/shows/favorites?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}`)
            .then(res => res.json())
            .then(data => {
                setFriendShow(data.shows)
            })
        fetch(`https://api.betaseries.com/movies/favorites?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}`)
            .then(res => res.json())
            .then(data => {
                setFriendMovie(data.movies)
            })
    }, [id])

    return (
        <div>
            <Nav />
            {
                isLoading === true ?
                    <div className="flex justify-center mt-20">
                        <svg width="6rem" height="6rem" viewBox="0 0 1024 1024" className="animate-spin"><path fill="#E50914" d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
                    </div>
                    :
                    <div className="flex flex-col justify-center">
                        {
                            <>
                                {friend?.profile_banner ? <img src={friend?.profile_banner} alt="chargement" /> : <img className="h-[220px] w-full object-cover" src={Default} alt="chargement" />}
                                <div id="infoProfile" className="mx-auto">
                                    {
                                        friend?.avatar ?
                                            <img className="h-28" src={friend?.avatar} alt="avatar" />
                                            :
                                            <svg width="6.5em" height="6.5em" viewBox="0 0 48 48"><g fill="currentColor">
                                                <path fillRule="evenodd" d="M24 42c9.941 0 18-8.059 18-18S33.941 6 24 6S6 14.059 6 24s8.059 18 18 18Zm0 2c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" clipRule="evenodd"></path>
                                                <path d="M12 35.63c0-1.033.772-1.906 1.8-2.02c7.715-.854 12.72-.777 20.418.019a1.99 1.99 0 0 1 1.108 3.472c-9.085 7.919-14.277 7.81-22.686.008c-.41-.38-.64-.92-.64-1.478Z"></path>
                                                <path fillRule="evenodd" d="M34.115 34.623c-7.637-.79-12.57-.864-20.206-.019A1.028 1.028 0 0 0 13 35.631c0 .286.119.557.32.745c4.168 3.866 7.326 5.613 10.413 5.624c3.098.011 6.426-1.722 10.936-5.652a.99.99 0 0 0-.554-1.724ZM13.69 32.616c7.796-.863 12.874-.785 20.632.018a2.99 2.99 0 0 1 1.662 5.221c-4.575 3.988-8.385 6.16-12.257 6.145c-3.883-.014-7.525-2.223-11.766-6.158A3.018 3.018 0 0 1 11 35.63a3.028 3.028 0 0 1 2.69-3.015Z" clipRule="evenodd"></path><path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z"></path>
                                                <path fillRule="evenodd" d="M24 26a6 6 0 1 0 0-12a6 6 0 0 0 0 12Zm0 2a8 8 0 1 0 0-16a8 8 0 0 0 0 16Z" clipRule="evenodd"></path></g>
                                            </svg>
                                    }
                                    <div className="text-center">
                                        <p>{friend?.login}</p>
                                        <p>{friend?.xp} XP - {friend?.stats?.friends} {friend?.stats?.friends > 1 ? "amis" : "ami"}</p>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
            }
            <div className="h-10"></div>
            <section className="flex justify-center">
                <div className="flex flex-col p-5">
                    <p className="text-xl">{friend?.stats?.badges} badges</p>
                    <div className="flex flex-wrap w-[300px]">
                        {
                            imgBadges?.map((b, i) => (
                                <>
                                    <img src={b?.url} alt={b?.code} className="h-[60px] w-[60px] rounded-full" />
                                </>
                            ))
                        }
                    </div>
                </div>
                <section className="p-5 leading-8">
                    <div className="bg-EO flex flex-col justify-around p-5 rounded">
                        <div className="flex w-[300px] mx-auto items-center">
                            <div className="flex w-[150px] flex-col items-center">
                                <p id="numbers">{friend?.stats?.shows}</p>
                                <p className="text-center">séries</p>
                            </div>
                            <div className="flex w-[150px] flex-col items-center">
                                <p id="numbers">{friend?.stats?.episodes}</p>
                                <p className="text-center">épisodes vu</p>
                            </div>
                        </div>
                        <div className="flex p-2 flex-row items-center">
                            <p>{getDataHR(friend?.stats?.time_on_tv)}</p>
                        </div>
                    </div>
                </section>
            </section>
            <div className="flex justify-center flex-col items-start w-[800px] p-5 mx-auto">
                <p>Ses séries préférées:</p>
                <div className="flex overflow-scroll flex-wrap h-[350px]">
                    {
                        friendShow?.map((show, i) => (
                            <Link to={{ pathname: `/serie/${show?.id}` }}>
                                {show?.images?.poster ? <img src={show?.images?.poster} className="h-[300px] p-2  m-2" alt={show?.title} /> : <div className="h-[300px] m-2 bg-EO"></div>}
                            </Link>

                        ))
                    }
                </div>
            </div>
            <div className="flex justify-center flex-col items-start w-[800px] p-5 mx-auto">
                <p>Ses films préférés:</p>
                <div className="flex overflow-scroll flex-wrap h-[350px]">
                    {
                        friendMovie?.map((movie, i) => (
                            <Link to={{ pathname: `/movie/${movie?.id}` }}>
                                {movie?.poster ? <img src={movie?.poster} className="h-[300px] p-2  m-2" alt={movie?.title} /> : <div className="h-[300px] m-2 bg-EO"></div>}
                            </Link>

                        ))
                    }
                </div>
            </div>
            <div className="h-24"></div>
            <Footer />
        </div>
    )
}

export default FriendProfile