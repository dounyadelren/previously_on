import React, { useState, useEffect } from "react";

const Notifications = () => {

    const token = sessionStorage.getItem("Token");
    const [notifs, setNotifs] = useState();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await fetch(`https://api.betaseries.com/members/notifications?client_id=${process.env.REACT_APP_CLIENT_ID}&number=100&types=badge,film,friend,message,episode&all=true&auto_mark=true&sort=DESC&token=${token}`)
            const json = await res.json();
            setNotifs(json.notifications)
            setIsLoading(false);
        }
        fetchData();
    }, [token])

    const addFriend = (id) => {
        fetch(`https://api.betaseries.com/friends/friend?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
            method: "POST"
        })
    }

    return (
        <>
            <div className="flex justify-center">
                {
                    isLoading === true ? (
                        <div className="flex justify-center mt-20">
                            <svg width="6rem" height="6rem" viewBox="0 0 1024 1024" className="animate-spin"><path fill="#E50914" d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
                        </div>
                    ) : (
                        <div id="scroll" className="border border-gray rounded overflow-auto h-[400px] w-[500px] sm:h-full sm:w-[90%] sm:overflow-none">
                            {
                                notifs?.map((x, i) => (
                                    <div key={i} className="ml-4 mr-4 mt-5 mb-5 border-b border-gray">
                                        {
                                            x.type === "friend" ?
                                                <div className="flex mb-3">
                                                    <svg width="70px" height="70px" viewBox="0 0 32 32" ><path fill="currentColor" d="M25 10H7a3.003 3.003 0 0 0-3 3v6a2.002 2.002 0 0 0 2 2v7a2.002 2.002 0 0 0 2 2h4a2.002 2.002 0 0 0 2-2V16h-2v12H8v-9H6v-6a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v6h-2v9h-4V16h-2v12a2.002 2.002 0 0 0 2 2h4a2.002 2.002 0 0 0 2-2v-7a2.002 2.002 0 0 0 2-2v-6a3.003 3.003 0 0 0-3-3zM10 9a4 4 0 1 1 4-4a4.004 4.004 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.002 2.002 0 0 0-2-2zm12 6a4 4 0 1 1 4-4a4.004 4.004 0 0 1-4 4zm0-6a2 2 0 1 0 2 2a2.002 2.002 0 0 0-2-2z"></path></svg>
                                                    <div className="mt-4 mr-4 ml-4 mb-4">
                                                        <p>{x.text} <button onClick={addFriend(x.ref_id)} className="ml-2">
                                                            <svg className="hover:text-green" width="2em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.39 14.56C13.71 13.7 11.53 13 9 13s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 1 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66zM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm11-3V7c0-.55-.45-1-1-1s-1 .45-1 1v2h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-2z"></path></svg>
                                                        </button>
                                                        </p>

                                                    </div>
                                                </div>
                                                :
                                                <div className="flex mb-3">
                                                    <img src={x.payload.picture} className="h-[70px]" alt="badge" />
                                                    <p className="flex mt-4 mr-4 ml-4 mb-4">{x.text}</p>
                                                </div>

                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Notifications