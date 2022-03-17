import React, { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import LoveFetch from "../components/FetchMovies/LoveFetch";
import HorrorFetch from "../components/FetchMovies/HorrorFecth";
import ActionFetch from "../components/FetchMovies/ActionFetch";
import AnimationFetch from "../components/FetchMovies/AnimationFetch";
import Footer from "../components/Footer"

function Movies() {

    const [value, setValue] = useState('');
    const [valueGenre, setValueGenre] = useState('');
    const [moviesSearch, setMoviesSearch] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const handleDropdownChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setValueGenre(e.target.value)
    }

    const search = (e) => {
        e.preventDefault();
        if (valueGenre === "") {
            const fetchData = async () => {
                setIsLoading(true);
                const res = await fetch(`https://api.betaseries.com/search/movies?client_id=${process.env.REACT_APP_CLIENT_ID}&text=${value}&limit=50&offset=0`)
                const json = await res.json();
                setMoviesSearch(json.movies)
                setIsLoading(false);
            }
            fetchData();
        } else if (value === "") {
            const fetchData = async () => {
                setIsLoading(true);
                const res = await fetch(`https://api.betaseries.com/search/movies?client_id=${process.env.REACT_APP_CLIENT_ID}&limit=50&offset=0&genres=${valueGenre}`)
                const json = await res.json();
                setMoviesSearch(json.movies)
                setIsLoading(false);
            }
            fetchData();
        } else {
            const fetchData = async () => {
                setIsLoading(true);
                const res = await fetch(`https://api.betaseries.com/search/movies?client_id=${process.env.REACT_APP_CLIENT_ID}&text=${value}&limit=50&offset=0&genres=${valueGenre}`)
                const json = await res.json();
                setMoviesSearch(json.movies)
                setIsLoading(false);
            }
            fetchData();
        }

        if (value !== "" || valueGenre !== "") {
            document.getElementById('movies_category').classList.add('hidden');
            document.getElementById('movies_search').classList.remove('hidden');
        } else {
            document.getElementById('movies_search').classList.add('hidden');
            document.getElementById('movies_category').classList.remove('hidden');
        }
    }

    return (
        <>
            <div className="z-10 fixed w-full md:static sm:static">
                <Nav />
                <div className='h-20 md:h-10 sm:h-0'></div>
                <section className="bg-blackOp pb-5">
                    <form action="" onSubmit={search}>
                        <div className="flex sm:grid">
                            <div className="ml-5 flex-1 sm:ml-2">
                                <select name="genre" className="bg-EO text-white border text-center px-4 py-2 p-1 rounded focus:outline-none focus:shadow-outline md:px-2 md:py-1" onChange={handleChange}>
                                    <option value="">Catégorie</option>
                                    <option value="Romance">Romance</option>
                                    <option value="Action">Action</option>
                                    <option value="Horreur">Horreur</option>
                                    <option value="Animation">Animation</option>
                                    <option value="Crime">Crime</option>
                                    <option value="Comédie">Comédie</option>
                                    <option value="Drame">Drame</option>
                                    <option value="Aventure">Aventure</option>
                                    <option value="Fantastique">Fantastique</option>
                                    <option value="Science-Fiction">Science-Fiction</option>
                                    <option value="Documentaire">Documentaire</option>
                                    <option value="Western">Western</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Familial">Familial</option>
                                    <option value="Mystère">Mystère</option>
                                    <option value="Histoire">Histoire</option>
                                    <option value="Guerre">Guerre</option>
                                    <option value="Musique">Musique</option>
                                    <option value="Téléfilm">Téléfilm</option>
                                </select>
                            </div>
                            <div className="grow sm:flex sm:flex sm:flex-col sm:mt-5">
                                <input type="search" className="bg-EO text-white border rounded leading-tight px-4 py-2 p-1 focus:outline-none focus:shadow-outline sm:ml-2 sm:mr-2 md:px-2 md:py-1 " onChange={handleDropdownChange} />
                                <button type="submit" className="bg-EO border px-4 py-2 p-1 text-white rounded ml-2 hover:bg-gray sm:ml-2 sm:mr-2 sm:mt-2 md:px-2 md:py-1 ">Chercher</button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
            <div className="h-36 md:h-0 sm:h-0"></div>
            <div id="movies_category" className="mt-5">
                <LoveFetch />
                <HorrorFetch />
                <ActionFetch />
                <AnimationFetch />
            </div>
            <div id="movies_search" className="text-white hidden mt-5">
                <h1 className="ml-5 mb-5">Votre recherche</h1>
                {
                    isLoading === true ? (
                        <div className="flex justify-center mt-40">
                            <svg width="6rem" height="6rem" viewBox="0 0 1024 1024" className="animate-spin"><path fill="#E50914" d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
                        </div>
                    ) : (
                        <div className="grid grid-cols-5 sm:grid-cols-3">
                            {

                                moviesSearch?.map((x, i) => (
                                    <div key={i}>
                                        <Link to={{ pathname: `/movie/${x.id}` }} >
                                            <div className="ml-5 mb-5 img_thumb sm:ml-2 sm:mr-2" id="img_movies">
                                                {
                                                    x.poster ?
                                                        <img className="object-cover" src={x.poster} alt="chargement" />
                                                        :
                                                        <div className="bg-black ml-5 mb-5 w-[500] h-[750]"></div>
                                                }
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
                    )
                }
            </div>
            <Footer />
        </>
    )
}

export default Movies