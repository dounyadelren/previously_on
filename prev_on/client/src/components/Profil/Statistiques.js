import React, { useState, useEffect } from "react";

const Statistiques = () => {

    let user = JSON.parse(sessionStorage.getItem('User'))
    let id = user.member.id

    const [imgBadges, setImgBadges] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [myInfo, setMyInfo] = useState()

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
        const fetchData = async () => {
            setIsLoading(true);
            const res = await fetch(`https://api.betaseries.com/members/infos?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}`)
            const json = await res.json();
            setMyInfo(json.member)
            setIsLoading(false);
        }
        fetchData();

        let array = []
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

    }, [id])


    return (
        <>
            {
                isLoading === true ?
                    <div className="flex justify-center mt-20">
                        <svg width="6rem" height="6rem" viewBox="0 0 1024 1024" className="animate-spin"><path fill="#E50914" d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
                    </div>
                    :
                    <section className="flex justify-center md:flex-col md:items-center sm:flex-col sm:items-center">
                        <div className="flex flex-col p-5 md:items-center sm:items-center">
                            <div className="flex items-center">
                                <span id="numbers">{myInfo?.stats?.badges}</span>
                                <span className="text-xl"> &nbsp; badges </span>
                            </div>
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
                                <div className="flex p-2 flex-row items-center text-center mb-3">
                                    <p>{getDataHR(myInfo?.stats?.time_on_tv)}</p>
                                </div>
                                <div className="flex w-[300px] mx-auto items-center mb-2">
                                    <div className="flex w-[150px] flex-col items-center">
                                        <p id="numbers">{myInfo?.stats?.friends}</p>
                                        <p className="text-center">{myInfo?.stats.friends > 1 ? 'amis' : 'ami'}</p>
                                    </div>
                                    <div className="flex w-[150px] flex-col items-center">
                                        <p id="numbers">{myInfo?.xp}</p>
                                        <p className="text-center">XP</p>
                                    </div>
                                </div>
                                <div className="flex w-[300px] mx-auto items-center">
                                    <div className="flex w-[150px] flex-col items-center">
                                        <p id="numbers">{myInfo?.stats?.shows}</p>
                                        <p className="text-center">séries</p>
                                    </div>
                                    <div className="flex w-[150px] flex-col items-center">
                                        <p id="numbers">{myInfo?.stats?.episodes}</p>
                                        <p className="text-center">épisodes vus</p>
                                    </div>
                                    <div className="flex w-[150px] flex-col items-center">
                                        <p id="numbers">{myInfo?.stats?.seasons}</p>
                                        <p className="text-center">saisons</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>


            }
        </>
    )
}

export default Statistiques