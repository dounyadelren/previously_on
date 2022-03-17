import React from 'react'

const Footer = () => {
    function handleClick(url) {
        window.location.href = "#";
    }
    return (
        <>
            <div className="h-[100px] md:hidden sm:h-[25vh]"></div>
            <footer className="text-center text-xs mb-2 text-gray w-full flex flex-col items-center bg-EO sm:mt-0">
                <button onClick={handleClick}>
                    <svg className="text-center m-3" width="5em" height="5em" viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2"><path strokeLinejoin="round" d="M12 4C13.6683 4 14.6122 4.39991 15 4.5C15.5255 4.07463 16.9375 3 18.5 3C18.8438 4 18.7863 5.21921 18.5 6C19.25 7 19.5 8 19.5 9.5C19.5 11.6875 19.017 13.0822 18 14C16.983 14.9178 15.8887 15.3749 14.5 15.5C15.1506 16.038 15 17.3743 15 18C15 18.7256 15 21 15 21" class="il-md-length-40 il-md-duration-3 il-md-delay-0"></path><path strokeLinejoin="round" d="M12 4C10.3317 4 9.38784 4.39991 9 4.5C8.47455 4.07463 7.0625 3 5.5 3C5.15625 4 5.21371 5.21921 5.5 6C4.75 7 4.5 8 4.5 9.5C4.5 11.6875 4.98301 13.0822 6 14C7.01699 14.9178 8.1113 15.3749 9.5 15.5C8.84944 16.038 9 17.3743 9 18C9 18.7256 9 21 9 21" class="il-md-length-40 il-md-duration-3 il-md-delay-0"></path><path d="M9 19C7.59375 19 6.15625 18.4375 5.3125 17.8125C4.46875 17.1875 4.21875 16.1562 3 15.5" class="il-md-length-15 il-md-duration-2 il-md-delay-3"></path></g></svg>
                </button>
                <span>
                    &copy;2022 Corentin, Dounya, All rights reserved.
                </span>
                <span>Ce site est un projet scolaire à but non-lucratif</span>
            </footer>
        </>
    )
}

export default Footer