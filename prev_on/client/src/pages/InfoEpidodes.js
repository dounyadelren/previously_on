import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { useLocation } from "react-router";
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.800)',
        borderRadius: "30px",
        width: '35%',
        height: '20%',
    },
    overlay: {
        background: "rgba(0, 0, 0, 0.8)"
    }
};

Modal.setAppElement('#root');

const InfoEpisodes = () => {

    let location = useLocation();
    let { id } = useParams();
    let stars = <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path fill="yellow" d="M14.43 10L12 2l-2.43 8H2l6.18 4.41L5.83 22L12 17.31L18.18 22l-2.35-7.59L22 10z"></path>
    </svg>;

    const token = sessionStorage.getItem('Token')
    const [episode, setEpisode] = useState()
    const [comments, setComments] = useState()
    const [pages, setPages] = useState(5)
    const [value, setValue] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [accept, setAccept] = useState(false)
    const [send, setSend] = useState(0)

    useEffect(() => {
        let a = []
        fetch(`https://api.betaseries.com/episodes/display?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}`)
            .then(res => res.json())
            .then(data => {
                fetch(`https://api.betaseries.com/pictures/episodes?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&width=650&height=450`)
                    .then(res => {
                        const obj = {
                            url: res.url,
                            code: data.episode.code,
                            title: data.episode.title,
                            season: data.episode.season,
                            comments: data.episode.comments,
                            date: data.episode.date,
                            description: data.episode.description,
                            note: data.episode.note,
                            id_episode: data.episode.id,
                            show: data.episode.show.title
                        }
                        a.push(obj);
                        setEpisode([...a])
                    })
            })

        fetch(`https://api.betaseries.com/comments/comments?client_id=${process.env.REACT_APP_CLIENT_ID}&type=episode&id=${id}&order=desc&nbpp=${pages}`)
            .then(res => res.json())
            .then(data => setComments(data.comments))
    }, [pages, send])

    const Next = () => {
        setPages(pages + 5)
    }

    const episodeWatched = (id) => {
        fetch(`https://api.betaseries.com/episodes/watched?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&bulk=true&token=${token}`, {
            method: "POST"
        })
    }

    const unWatched = (id) => {
        fetch(`https://api.betaseries.com/episodes/watched?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${id}&token=${token}`, {
            method: "DELETE"
        })
    }

    const handleDropdownChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const PostComment = (e) => {
        e.preventDefault();
        fetch(`https://api.betaseries.com/comments/comment?client_id=${process.env.REACT_APP_CLIENT_ID}&type=episode&id=${id}&text=${value}&token=${token}`, {
            method: "POST"
        })
        setSend(send + 1)
        document.getElementById('sendComment').setAttribute("disabled", "")
    }

    function openModal() {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    }

    function closeModalAndAccept() {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
        setAccept(true)
    }

    function closeModal() {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
        setAccept(false)
    }

    return (
        <>
            <Nav />
            <div className="h-20"></div>
            {
                episode?.map((x, i) => (
                    <div key={i} className="w-[90%] flex justify-center mx-auto">
                        <img className="object-cover" src={x?.url} alt="chargement" />
                        <div className="ml-10">
                            <div>
                                <div className="flex">
                                    <h1 className="text-4xl">{x?.title}</h1>
                                    {
                                        location?.state?.state === "vu" ?
                                            <button className="ml-5" onClick={e => { unWatched(episode.id) }}>
                                                <svg className="text-green" width="2.5em" height="2.5em" viewBox="0 0 24 24"><path fill="currentColor" d="m23.5 17l-5 5l-3.5-3.5l1.5-1.5l2 2l3.5-3.5l1.5 1.5M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-.25.65-.56 1.26-.92 1.85a5.77 5.77 0 0 0-1.9-.73l.64-1.12a9.821 9.821 0 0 0-17.64 0A9.821 9.821 0 0 0 12 17.5l1.21-.07c-.14.5-.21 1.03-.21 1.57v.46l-1 .04c-5 0-9.27-3.11-11-7.5c1.73-4.39 6-7.5 11-7.5Z"></path></svg>
                                            </button>

                                            :
                                            <button className="ml-5" onClick={e => { episodeWatched(episode.id) }}>
                                                <svg width="2.5em" height="2.5em" className="hover:text-gray" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5c.36 0 .72 0 1.08-.05a6.09 6.09 0 0 1-.08-.95c0-.36.04-.72.1-1.08c-.36.04-.73.08-1.1.08c-3.76 0-7.17-2.14-8.82-5.5a9.821 9.821 0 0 1 17.64 0c-.12.24-.26.45-.39.68c.66.16 1.29.43 1.86.82c.27-.5.51-1 .71-1.5c-1.73-4.39-6-7.5-11-7.5M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m6 5.5v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2Z"></path></svg>
                                            </button>
                                    }
                                </div>
                                <div className="flex items-center mt-2">
                                    <div className="mr-4 text-gray">
                                        {
                                            x?.note?.mean !== null ?
                                                <div className="flex items-center flex-wrap">
                                                    <span className="flex items-center">{Math.round(x?.note?.mean * 100) / 100}/5 {stars}</span>
                                                    {1.5 < x?.note?.mean && <span>{stars}</span>}
                                                    {2.5 < x?.note?.mean && <span>{stars}</span>}
                                                    {3.5 < x?.note?.mean && <span>{stars}</span>}
                                                    {4.5 < x?.note?.mean && <span>{stars} </span>}
                                                </div>
                                                :
                                                <p>Aucun avis</p>
                                        }
                                    </div>
                                    <p className="mr-4 text-gray">Saison {x?.season} </p>
                                </div>
                                <p className="mt-2">{x?.description}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
            <hr className="mt-10" />
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                contentLabel="Modal eventAddOk"
            >
                <div className="flex justify-center">
                    <p className="text-red">Spoiler alert, certains commentaires peuvent contenir du spoil. Voulez-vous continuer ?</p>
                </div>
                <div className="flex justify-center mt-5">
                    <button onClick={closeModal} className="bg-EO border border-red px-4 py-2 p-1 text-white rounded ml-2 hover:bg-gray">Aled</button>
                    <button onClick={closeModalAndAccept} className="bg-EO border border-green px-4 py-2 p-1 text-white rounded ml-2 hover:bg-gray">Let's go</button>
                </div>
            </Modal>
            <div className="mt-4">
                {
                    accept !== true ?
                        <div className="flex justify-center mt-10 mb-10">
                            <button onClick={openModal} className="bg-EO border border-red px-4 py-2 p-1 text-white rounded ml-2 hover:bg-gray">Voir les commentaires</button>
                        </div>
                        :
                        <>
                            <form onSubmit={PostComment} className="flex justify-center">
                                <div className="flex">
                                    <input type="text" className="bg-EO text-white text-start border rounded leading-tight w-full focus:outline-none focus:shadow-outline" onChange={handleDropdownChange} />
                                    <button id="sendComment" type="sumbit" className="bg-EO border px-4 py-2 p-1 text-white rounded ml-2 hover:bg-gray">Poster</button>
                                </div>
                            </form>
                            {
                                comments?.map((c, i) => (
                                    <div key={i} className="border-b border-gray pb-3 ml-5 mt-5 mr-5 mb-5">
                                        <p className="text-xs text-gray ml-3">{c.date?.substr(8, 2) + "/" + c?.date?.substr(5, 2) + "/" + c?.date?.substr(0, 4)}</p>
                                        <div className="flex items-center">
                                            {
                                                c.avatar ?
                                                    <img src={c.avatar} className="border border-white border-2 rounded-full h-[50px] object-cover mt-1 ml-1 mb-1 mr-5" alt="chargement" />
                                                    :
                                                    <svg className="rounded-full h-[80px] mt-1 ml-1 mb-1 mr-5" viewBox="0 0 48 48"><g fill="currentColor">
                                                        <path fillRule="evenodd" d="M24 42c9.941 0 18-8.059 18-18S33.941 6 24 6S6 14.059 6 24s8.059 18 18 18Zm0 2c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" clipRule="evenodd"></path>
                                                        <path d="M12 35.63c0-1.033.772-1.906 1.8-2.02c7.715-.854 12.72-.777 20.418.019a1.99 1.99 0 0 1 1.108 3.472c-9.085 7.919-14.277 7.81-22.686.008c-.41-.38-.64-.92-.64-1.478Z"></path>
                                                        <path fillRule="evenodd" d="M34.115 34.623c-7.637-.79-12.57-.864-20.206-.019A1.028 1.028 0 0 0 13 35.631c0 .286.119.557.32.745c4.168 3.866 7.326 5.613 10.413 5.624c3.098.011 6.426-1.722 10.936-5.652a.99.99 0 0 0-.554-1.724ZM13.69 32.616c7.796-.863 12.874-.785 20.632.018a2.99 2.99 0 0 1 1.662 5.221c-4.575 3.988-8.385 6.16-12.257 6.145c-3.883-.014-7.525-2.223-11.766-6.158A3.018 3.018 0 0 1 11 35.63a3.028 3.028 0 0 1 2.69-3.015Z" clipRule="evenodd"></path><path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0Z"></path>
                                                        <path fillRule="evenodd" d="M24 26a6 6 0 1 0 0-12a6 6 0 0 0 0 12Zm0 2a8 8 0 1 0 0-16a8 8 0 0 0 0 16Z" clipRule="evenodd"></path></g>
                                                    </svg>
                                            }
                                            <p className="mr-5">{c.login} :</p>
                                            <p>{c.text}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="flex justify-center mb-5">
                                <button onClick={Next} className="mr-5">
                                    <svg className="text-red" height="40px" viewBox="0 0 24 24"><path fill="currentColor" d="M16.59 8.59L12 13.17L7.41 8.59L6 10l6 6l6-6l-1.41-1.41z"></path></svg>
                                </button>
                            </div>
                        </>
                }
            </div>
            <Footer />
        </>
    )
}

export default InfoEpisodes