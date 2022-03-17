import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Friends from "../components/Profil/Friends";
import Notifications from "../components/Profil/Notifications";
import Block from "../components/Profil/FriendsBlock";
import Statistiques from "../components/Profil/Statistiques";
import "../assets/css/profile.css"
import Footer from "../components/Footer";
import Default from "../assets/images/default-ban.jpeg"

const Profil = () => {

    const token = sessionStorage.getItem("Token");
    const [user, setUser] = useState();
    const [showStats, setShowStats] = useState(true);
    const [showNotifs, setShowNotifs] = useState(false)
    const [showFriends, setShowFriends] = useState(false)
    const [showBlock, setShowBlock] = useState(false)

    useEffect(() => {
        fetch(`https://api.betaseries.com/members/infos?client_id=${process.env.REACT_APP_CLIENT_ID}&token=${token}`)
            .then(res => res.json())
            .then(data => {
                setUser(data)
                sessionStorage.setItem("User", JSON.stringify(data));
            })
    }, [token])

    const Redirect = () => {
        sessionStorage.clear();
        window.location.href = 'http://localhost:3000/'
    }

    const onClickStats = () => {
        setShowStats(true)
        setShowNotifs(false)
        setShowFriends(false)
        setShowBlock(false)
        document.getElementById('stats').classList.add("active")
        document.getElementById('notifs').classList.remove("active")
        document.getElementById('friends').classList.remove("active")
        document.getElementById('block').classList.remove("active")
    }

    const onClickNotifs = () => {
        setShowStats(false)
        setShowNotifs(true)
        setShowFriends(false)
        setShowBlock(false)
        document.getElementById('notifs').classList.add("active")
        document.getElementById('stats').classList.remove("active")
        document.getElementById('friends').classList.remove("active")
        document.getElementById('block').classList.remove("active")

    }

    const onClickFriends = () => {
        setShowStats(false)
        setShowNotifs(false)
        setShowFriends(true)
        setShowBlock(false)
        document.getElementById('friends').classList.add("active")
        document.getElementById('stats').classList.remove("active")
        document.getElementById('block').classList.remove("active")
        document.getElementById('notifs').classList.remove("active")
    }

    const onClickBlock = () => {
        setShowStats(false)
        setShowNotifs(false)
        setShowFriends(false)
        setShowBlock(true)
        document.getElementById('block').classList.add("active")
        document.getElementById('stats').classList.remove("active")
        document.getElementById('notifs').classList.remove("active")
        document.getElementById('friends').classList.remove("active")
    }

    return (
        <>
            <Nav />
            <div className="flex flex-col justify-center">
                {
                    user?.member?.profile_banner ? <img src={user?.member?.profile_banner} alt="chargement" /> : <img className="h-[220px] w-full object-cover" src={Default} alt="chargement" />
                }
                <div id="infoProfile" className="mx-auto">
                    {
                        user?.member?.avatar ?
                            <img className="h-28" src={user?.member?.avatar} alt="avatar" />
                            :
                            <svg width="6.5em" height="6.5em" viewBox="0 0 48 48"><g fill="currentColor">
                                <path fillRule="evenodd" d="M24 42c9.941 0 18-8.059 18-18S33.941 6 24 6S6 14.059 6 24s8.059 18 18 18Zm0 2c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" clipRule="evenodd"></path>
                                <path d="M12 35.63c0-1.033.772-1.906 1.8-2.02c7.715-.854 12.72-.777 20.418.019a1.99 1.99 0 0 1 1.108 3.472c-9.085 7.919-14.277 7.81-22.686.008c-.41-.38-.64-.92-.64-1.478Z"></path>
                                <path fillRule="evenodd" d="M34.115 34.623c-7.637-.79-12.57-.864-20.206-.019A1.028 1.028 0 0 0 13 35.631c0 .286.119.557.32.745c4.168 3.866 7.326 5.613 10.413 5.624c3.098.011 6.426-1.722 10.936-5.652a.99.99 0 0 0-.554-1.724ZM13.69 32.616c7.796-.863 12.874-.785 20.632.018a2.99 2.99 0 0 1 1.662 5.221c-4.575 3.988-8.385 6.16-12.257 6.145c-3.883-.014-7.525-2.223-11.766-6.158A3.018 3.018 0 0 1 11 35.63a3.028 3.028 0 0 1 2.69-3.015Z" clipRule="evenodd"></path><path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z"></path>
                                <path fillRule="evenodd" d="M24 26a6 6 0 1 0 0-12a6 6 0 0 0 0 12Zm0 2a8 8 0 1 0 0-16a8 8 0 0 0 0 16Z" clipRule="evenodd"></path></g>
                            </svg>

                    }
                    <div className="text-center">
                        <p>{user?.member?.login}</p>
                    </div>
                </div>
            </div>
            <div className="h-5"></div>
            <section className="flex justify-center content-center md:flex-col sm:flex-col">
                <div className="px-12 h-[300px] md:mx-auto md:text-center md:h-[150px] sm:text-center sm:h-[100px]">
                    <ul className="leading-9 md:flex md:flex-row sm:flex sm:flex-row">
                        <li id="stats" className="active mb-3 text-xl md:text-lg md:m-1 sm:text-lg sm:m-1">
                            <button onClick={onClickStats}>Statistiques</button>
                        </li >
                        <li id="notifs" className="mb-3 text-xl md:text-lg md:m-1 sm:text-lg sm:m-1">
                            <button onClick={onClickNotifs}>Notifications</button>
                        </li>
                        <li id="friends" className="mb-3 text-xl md:text-lg md:m-1 sm:text-lg sm:m-1">
                            <button onClick={onClickFriends}>Amis</button>
                        </li>
                        <li id="block" className="mb-3 text-xl md:text-lg md:m-1 sm:text-lg sm:m-1">
                            <button onClick={onClickBlock}>Bloqués</button>
                        </li>
                    </ul>
                    <div className="col-end-7 col-span-2 mr-5 mt-3 sm:flex sm:justify-center">
                        {
                            window.screen.width <= 734 ?
                                <svg className="ml-5" width="1.5em" height="1.5em" viewBox="0 0 20 20"><path fill="currentColor" d="M10.24 0c3.145 0 6.057 1.395 7.988 3.744a.644.644 0 0 1-.103.92a.68.68 0 0 1-.942-.1a8.961 8.961 0 0 0-6.944-3.256c-4.915 0-8.9 3.892-8.9 8.692c0 4.8 3.985 8.692 8.9 8.692a8.962 8.962 0 0 0 7.016-3.343a.68.68 0 0 1 .94-.113a.644.644 0 0 1 .115.918C16.382 18.564 13.431 20 10.24 20C4.583 20 0 15.523 0 10S4.584 0 10.24 0Zm6.858 7.16l2.706 2.707c.262.261.267.68.012.936l-2.644 2.643a.662.662 0 0 1-.936-.01a.662.662 0 0 1-.011-.937l1.547-1.547H7.462a.662.662 0 0 1-.67-.654c0-.362.3-.655.67-.655h10.269l-1.558-1.558a.662.662 0 0 1-.011-.936a.662.662 0 0 1 .936.011Z"></path></svg>
                                :
                                <button className="bg-EO border px-4 py-2 p-1 text-white rounded hover:bg-gray md:px-2 md:py-1 sm:px-2 sm:py-1" onClick={Redirect}>Logout</button>
                        }
                    </div>
                </div>
                <div className="grow mr-52 md:mr-0 sm:mr-0">
                    {
                        showStats === true ?
                            <Statistiques />
                            :
                            <>
                                {
                                    showNotifs === true ?
                                        <Notifications />
                                        :
                                        <>
                                            {
                                                showFriends === true ?
                                                    <Friends />
                                                    :
                                                    <>
                                                        {
                                                            showBlock === true ?
                                                                <Block />
                                                                :
                                                                null
                                                        }
                                                    </>
                                            }
                                        </>
                                }
                            </>
                    }
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Profil