import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Film from "../assets/images/Film.jpg"
import Serie from "../assets/images/serie.jpg"
import "../assets/css/list.css"

const List = () => {
    return (
        <>
            <Nav />
            <div className="h-[82vh] md:h-[50vh]">
                <div id="list_menu">
                    <Link to="/list/series" className="flex flex-col">
                        <img src={Serie} className="h-[300px] w-[300px] md:h-[150px] md:w-[150px] sm:h-[150px] sm:w-[150px] m-5 object-cover rounded hover:border hover:border-white" alt="film" />
                        <button>Séries</button>
                    </Link>
                    <Link to="/list/movies" className="flex flex-col">
                        <img src={Film} className="h-[300px] w-[300px] md:h-[150px] md:w-[150px] sm:h-[150px] sm:w-[150px] m-5 object-cover rounded hover:border hover:border-white" alt="film" />
                        <button>Films</button>
                    </Link>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default List