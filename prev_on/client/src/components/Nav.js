import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../assets/css/Nav.css'
import AlertNotifs from "./AlertNotifs";

const Nav = () => {

    return (
        <div className="fixed z-10 w-full md:static sm:static">
            <nav className="grid grid-cols-6 bg-blackOp">
                <div className="flex col-start-1 col-end-4 ml-5 mt-4 items-center mb-4 md:mt-0 md:mb-0">
                    {
                        window.screen.width <= 734 ?
                            <Link to="/accueil"><h1 className="text-3xl text-red ml-1 mr-5 md:text-4xl text-center sm:mr-0" id="title_nav">P</h1></Link>
                            :
                            <Link to="/accueil"><h1 className="text-5xl text-red ml-1 mr-5 md:mr-0 md:ml-0 md:text-xl text-center" id="title_nav">Previously on</h1></Link>
                    }
                    <Link to="/accueil" className="item_nav md:text-s md:hidden sm:hidden">Accueil</Link>
                    <Link to="/movies" className="item_nav md:text-sm">Films</Link>
                    <Link to="/series" className="item_nav md:text-sm">Séries</Link>
                    <Link to="/list" className="item_nav md:text-sm">Liste</Link>
                    <Link to="/news" className="item_nav md:text-sm">Actualités</Link>
                </div>
                <div className="flex col-end-9 col-span-2 items-center mt-1 mr-5 mb-4">
                    <AlertNotifs />
                    <Link to="/profil" className="mt-3 ml-5 sm:ml-2">
                        <svg width="2em" height="2em" viewBox="0 0 24 24"><path fill="white" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3zm0 14.2a7.2 7.2 0 0 1-6-3.22c.03-1.99 4-3.08 6-3.08c1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 0 1-6 3.22z"></path>
                        </svg>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Nav;