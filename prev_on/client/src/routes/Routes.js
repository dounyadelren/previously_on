import React from "react";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from '../pages/Home';
import Accueil from "../pages/Accueil";
import Profil from "../pages/Profil";
import InfoMovie from "../pages/InfoMovie";
import InfoSerie from "../pages/InfoSerie";
import Movies from "../pages/Movies";
import SearchSeries from "../pages/SearchSeries"
import List from "../pages/List";
import ListMovies from "../pages/ListMovies";
import ListSeries from "../pages/ListSeries"
import InfoEpisodes from "../pages/InfoEpidodes";
import FriendProfile from "../pages/FriendProfile"
import News from "../pages/News";

const Path = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/profil" element={<Profil />} />
                <Route path="/accueil" element={<Accueil />} />
                <Route path="/accueil/:code" element={<Accueil />} />
                <Route path="/movie/:id" element={<InfoMovie />} />
                <Route path="/serie/:id" element={<InfoSerie />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/series" element={<SearchSeries />} />
                <Route path="/list" element={<List />} />
                <Route path="/list/movies" element={<ListMovies />} />
                <Route path="/list/series" element={<ListSeries />} />
                <Route path="/details/:id" element={<InfoEpisodes />} />
                <Route path="/member/:id" element={<FriendProfile />} />
                <Route path="/news" element={<News />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Path