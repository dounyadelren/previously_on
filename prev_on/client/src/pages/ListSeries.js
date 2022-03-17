import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import Seriesfav from "../components/ListSeries/FavSeries"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SeriesArchivees from '../components/ListSeries/SeriesArchivees';

const ListSeries = () => {

    const user = JSON.parse(sessionStorage.getItem("User"))
    const [showsNow, setshowsNow] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true);
            const res = await fetch(`https://api.betaseries.com/shows/member?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${user.member.id}&state=1`)
            const json = await res.json();
            setshowsNow(json.shows)
            setIsLoading(false);
        }
        fetchData();
    }, [user.member.id])

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 10
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5
        },
        tablet: {
            breakpoint: { max: 1024, min: 735 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 734, min: 320 },
            items: 3
        }
    }


    return (
        <>
            <Nav />
            <div className="h-28 md:h-0 sm:h-0"></div>
            <Seriesfav />
            <div id="moviesSeen" className="text-white mt-5">
                <h1 className="ml-5 mb-5">Vos séries</h1>
                {
                    isLoading === true ? (
                        <div className="flex justify-center mt-40">
                            <svg width="6rem" height="6rem" viewBox="0 0 1024 1024" className="animate-spin"><path fill="#E50914" d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
                        </div>
                    ) : (
                        <div>
                            <Carousel responsive={responsive} autoplay={false} infinite={false} slidesToSlide={1} draggable={true} removeArrowOnDeviceType={["tablet", "mobile"]}>
                                {
                                    showsNow?.map((x, i) => (
                                        <div key={i}>
                                            <Link to={{ pathname: `/serie/${x.id}` }} state={{ myStatus: 1, myShow: 0 }}>
                                                <div className="ml-5 mb-5 img_thumb" id="img_movies">
                                                    <img className="object-cover" src={x.images.poster} alt="chargement" />
                                                    <div id="title_movies" className="grid grid-cols-2">
                                                        <div className="ml-2">
                                                            <p className="text-md truncate">{x.title}</p>
                                                        </div>
                                                        <div className="mr-1 col-end-4 col-span-1 flex">
                                                            <svg width="1.5em" height="1.5em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 26a102 102 0 1 0 102 102A102.2 102.2 0 0 0 128 26Zm0 192a90 90 0 1 1 90-90a90.1 90.1 0 0 1-90 90Zm14-42a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6v-50h-2a6 6 0 0 1 0-12h8a6 6 0 0 1 6 6v50h2a6 6 0 0 1 6 6Zm-26-92a10 10 0 1 1 10 10a10 10 0 0 1-10-10Z"></path></svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                }
                            </Carousel>
                        </div>
                    )
                }
            </div>
            <SeriesArchivees />
            <Footer />
        </>
    )
}

export default ListSeries