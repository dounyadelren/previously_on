import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";



const News = () => {

    const [news, setNews] = useState()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        const fetchNews = async () => {
            setIsLoading(true);
            const res = await fetch(`https://api.betaseries.com/news/last?client_id=${process.env.REACT_APP_CLIENT_ID}&tailored=true&number=9`)
            const json = await res.json();
            console.log(json.news)
            setNews(json.news)
            setIsLoading(false);
        }
        fetchNews()

    }, [])

    function handleClick(url) {
        window.location.href = url;
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 10
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 735 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 734, min: 320 },
            items: 1
        }
    }

    return (
        <>
            <Nav />
            <div className="h-36 sm:h-0"></div>
            <section className="w-[800px] mx-auto sm:w-full">
                {
                    isLoading === true ?
                        <div className="flex justify-center mt-20">
                            <svg width="6rem" height="6rem" viewBox="0 0 1024 1024" className="animate-spin"><path fill="#E50914" d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512c0-19.9 16.1-36 36-36s36 16.1 36 36c0 59.4 11.6 117 34.6 171.3c22.2 52.4 53.9 99.5 94.3 139.9c40.4 40.4 87.5 72.2 139.9 94.3C395 940.4 452.6 952 512 952c59.4 0 117-11.6 171.3-34.6c52.4-22.2 99.5-53.9 139.9-94.3c40.4-40.4 72.2-87.5 94.3-139.9C940.4 629 952 571.4 952 512c0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 0 0-94.3-139.9a437.71 437.71 0 0 0-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.2C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7c26.7 63.1 40.2 130.2 40.2 199.3s-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7c-63.1 26.8-130.2 40.3-199.3 40.3z"></path></svg>
                        </div>
                        :
                        <>
                            <div className='sm:hidden md:hidden'>
                                <Carousel responsive={responsive} autoplay={false} infinite={false} slidesToSlide={1} removeArrowOnDeviceType={["tablet", "mobile"]}>
                                    {
                                        news?.map((element, i) => (
                                            <div key={i} className="m-4">
                                                <button onClick={(e) => handleClick(element.url)}>
                                                    <h1 className="text-xl">{element.title}</h1>
                                                    <img src={element.picture_url} alt={element.title} />
                                                </button>
                                            </div>
                                        ))
                                    }
                                </Carousel>
                            </div>
                            <div className='lg:hidden'>
                                {
                                    news?.map((element, i) => (
                                        <div key={i} className="m-4">
                                            <button onClick={(e) => handleClick(element.url)}>
                                                <h1 className="text-xl sm:text-sm">{element.title}</h1>
                                                <img src={element.picture_url} alt={element.title} />
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                }
            </section>
            <Footer />
        </>
    )
}

export default News