import React, { useState, useEffect } from "react";

const Block = () => {

    const token = sessionStorage.getItem("Token")
    const [friendsBlock, setFriendsBlock] = useState();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await fetch(`https://api.betaseries.com/friends/list?client_id=${process.env.REACT_APP_CLIENT_ID}&token=${token}&blocked=true`)
            const json = await res.json();
            setFriendsBlock(json.users)
            setIsLoading(false);
        }
        fetchData();
    }, [token])

    const UnBlock = (id) => {
        fetch(`https://api.betaseries.com/friends/block?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
            method: "DELETE"
        })
    }

    return (
        <>
            {
                isLoading === true ?
                    <div className="flex justify-center mt-20">
                        <svg width="6rem" height="6rem" viewBox="0 0 1024 1024" className="animate-spin"><path fill="#E50914" d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
                    </div>
                    :
                    friendsBlock?.length > 0 ?
                        friendsBlock?.map((x, i) => (
                            <div key={i} className="flex justify-center">
                                <p className="text-xl">{x.login}</p>
                                <button className="ml-2" onClick={(e) => { UnBlock(x.id) }}>
                                    <svg className="hover:text-yellow" width="2em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M14 8c0-2.21-1.79-4-4-4S6 5.79 6 8s1.79 4 4 4s4-1.79 4-4zm3 2v2h6v-2h-6zM2 18v2h16v-2c0-2.66-5.33-4-8-4s-8 1.34-8 4z"></path></svg>
                                </button>
                            </div>
                        ))
                        :
                        <p className="text-center">Vous n'avez bloqué aucun membre.</p>
            }
        </>
    )
}

export default Block