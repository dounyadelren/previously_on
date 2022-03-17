import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const Friends = () => {


    const token = sessionStorage.getItem("Token");
    const [myFriends, setMyFriends] = useState();
    const [value, setValue] = useState();
    const [friendsFind, setFriendsFind] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const handleDropdownChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await fetch(`https://api.betaseries.com/friends/list?client_id=${process.env.REACT_APP_CLIENT_ID}&token=${token}`)
            const json = await res.json();
            setMyFriends(json.users)
            setIsLoading(false);
        }
        fetchData();
    }, [token])

    const addFriend = (id) => {
        fetch(`https://api.betaseries.com/friends/friend?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
            method: "POST"
        })
    }

    const Delete = (id) => {
        fetch(`https://api.betaseries.com/friends/friend?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
            method: "DELETE"
        })
    }

    const Block = (id) => {
        fetch(`https://api.betaseries.com/friends/block?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
            method: "POST"
        })
    }

    const searchFriends = (e) => {
        e.preventDefault();
        const fetchData = async () => {
            setIsLoading(true);
            const res = await fetch(`https://api.betaseries.com/friends/find?client_id=${process.env.REACT_APP_CLIENT_ID}&type=emails&emails=${value}&token=${token}`)
            const json = await res.json();
            setFriendsFind(json.users)
            setIsLoading(false);
        }
        fetchData();
    }

    return (
        <>
            <div className="grid grid-cols-2 justify-items-center md:flex md:flex-col md:items-center sm:flex sm:flex-col sm:items-center">
                <div>
                    <form action="" onSubmit={searchFriends} className="ml-3 sm:flex sm:flex sm:flex-col sm:mt-5">
                        <input type="email" name="searchFriends" className="bg-EO text-white border rounded leading-tight px-4 py-2 focus:outline-none focus:shadow-outline sm:ml-2 sm:mr-2" onChange={handleDropdownChange} />
                        <button type="submit" className="bg-EO border px-4 py-2 text-white rounded ml-2 hover:bg-gray sm:ml-2 sm:mr-2 sm:mt-2">chercher</button>
                    </form>
                    <div className="mt-5" id="resultSearch">
                        {
                            friendsFind?.map((x, i) => (
                                <div key={i} className="flex justify-center py-2">
                                    <p>{x.login}</p>
                                    <button onClick={(e) => { addFriend(x.id) }}>
                                        <svg className="hover:text-green ml-5" width="2.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M15.39 14.56C13.71 13.7 11.53 13 9 13s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 1 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66zM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm11-3V7c0-.55-.45-1-1-1s-1 .45-1 1v2h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-2z"></path></svg>
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    {
                        isLoading === true ?
                            <div className="flex justify-center mt-20">
                                <svg width="6rem" height="6rem" viewBox="0 0 1024 1024" className="animate-spin"><path fill="#E50914" d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
                            </div>
                            :
                            myFriends?.length > 0 ?
                                myFriends?.map((x, i) => (
                                    <div key={i} className="flex mb-2">
                                        <Link to={`/member/${x.id}`}><p className="text-xl hover:text-gray">{x.login}</p></Link>
                                        <button className="ml-2" onClick={(e) => { Delete(x.id) }}>
                                            <svg className="hover:text-yellow" width="2em" height="1.5em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4"><path d="M19 20a7 7 0 1 0 0-14a7 7 0 0 0 0 14Z"></path><path strokeLinecap="round" d="m33 31l8 8m-8 0l8-8m-14-3h-8.2c-4.48 0-6.72 0-8.432.872a8 8 0 0 0-3.496 3.496C6 34.08 6 36.32 6 40.8V42h21"></path></g></svg>
                                        </button>
                                        <button onClick={(e) => { Block(x.id) }}>
                                            <svg className="hover:text-red" width="2em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8c1.85 0 3.55.63 4.9 1.69L5.69 16.9A7.902 7.902 0 0 1 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1A7.902 7.902 0 0 1 20 12c0 4.42-3.58 8-8 8z"></path></svg>
                                        </button>
                                    </div>
                                ))
                                :
                                <p className="text-center sm:text-sm">Vous n'avez pas encore d'amis, n'hésitez pas à en ajouter.</p>
                    }
                </div>
            </div>
        </>
    )
}

export default Friends