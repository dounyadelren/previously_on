import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Nav from "../components/Nav";
import Strange from "../assets/images/strange-bann.jpeg"
import Soon from "../components/Soon";
import Series from "../components/Series";
import Footer from "../components/Footer"
import HoverVideoPlayer from "react-hover-video-player"
import Video from "../assets/videos/hover_strange.mp4"
import Carousel from "react-multi-carousel";
import Tudum from "../assets/videos/intro.mp3"
import "react-multi-carousel/lib/styles.css";

const Accueil = () => {

    let { code } = useParams();
    const [imgMovies, setImgMovies] = useState([]);

    useEffect(() => {

        let audio = new Audio(Tudum);
        audio.play();

        if (code !== undefined) {
            sessionStorage.setItem('Token', code)
            fetch(`https://api.betaseries.com/members/infos?client_id=${process.env.REACT_APP_CLIENT_ID}&token=${code}`)
                .then(res => res.json())
                .then(data => {
                    sessionStorage.setItem("User", JSON.stringify(data))
                })
        }

        let array = []
        fetch(`https://api.betaseries.com/movies/list?client_id=${process.env.REACT_APP_CLIENT_ID}&start=0&order=popularity`)
            .then(res => res.json())
            .then(data => {
                data.movies.forEach(v => {
                    fetch(`https://api.betaseries.com/pictures/movies?client_id=${process.env.REACT_APP_CLIENT_ID}&id=${v.id}`)
                        .then(data => {
                            const info = {
                                id: v.id,
                                url: data.url,
                                title: v.title
                            }
                            array.push(info);
                            setImgMovies([...array])
                        })
                        .catch(e => console.log(e))
                })
            })
    }, [code])

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
            <div id="body_accueil">
                <div>
                    <HoverVideoPlayer
                        videoSrc={Video}
                        style={{
                            width: '100%',
                            height: '90%',
                            display: "flex",
                            justifyContent: "center",
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                        pausedOverlay={
                            <img
                                src={Strange}
                                alt="strange"
                                style={{
                                    width: '100%',
                                    height: '95%',
                                    objectFit: 'cover'
                                }}
                            />
                        }
                        loadingOverlay={
                            <div className="loading-overlay">
                                <div className="loading-spinner" />
                            </div>
                        }
                    />
                </div>
            </div>
            <>
                <h1 className="ml-5 mb-5">Populaires</h1>
                <div className="">
                    <Carousel responsive={responsive} autoplay={false} infinite={false} slidesToSlide={1} draggable={true} removeArrowOnDeviceType={["tablet", "mobile"]}>
                        {
                            imgMovies?.map((res, i) => (
                                <div key={i}>
                                    <Link to={{ pathname: `/movie/${res.id}` }} >
                                        <div className="ml-5 mb-5 img_thumb" id="img_movies">
                                            {
                                                res.url ?
                                                    <img src={res.url} className="object-cover" alt="chargement" />
                                                    :
                                                    <div className="bg-black ml-5 mb-5 w-[500] h-[750]"></div>
                                            }
                                            <div id="title_movies" className="grid grid-cols-2">
                                                <div className="ml-2">
                                                    <p className="text-lg truncate">{res.title}</p>
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
                    </Carousel>
                </div>
            </>
            <Soon />
            <Series />
            <Footer />
        </>
    )
}

export default Accueil;