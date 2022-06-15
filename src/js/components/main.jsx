import { useState, useEffect, Fragment } from "react";

// images and icons
import logo from '../../../images/logo.svg'
import arrow from '../../../images/icon-arrow.svg'
import leftArrow from '../../../images/icon-angle-left.svg'
import rightArrow from '../../../images/icon-angle-right.svg'

// desktop
import desktop_images_hero_1 from '../../../images/desktop-image-hero-1.jpg'
import desktop_images_hero_2 from '../../../images/desktop-image-hero-2.jpg'
import desktop_images_hero_3 from '../../../images/desktop-image-hero-3.jpg'
// mobile
import mobile_images_hero_1 from '../../../images/mobile-image-hero-1.jpg'
import mobile_images_hero_2 from '../../../images/mobile-image-hero-2.jpg'
import mobile_images_hero_3 from '../../../images/mobile-image-hero-3.jpg'

export default function () {
    return (
        <main className="main-container">
            <Header />
        </main>
    )
}

function Header() {
    const navText = ['home', 'shop', 'about', 'contact']
    const navEl = navText.map((el, i) => <a href={el} key={i}>{el}</a>)
    const heroImages = [
        { desktop: desktop_images_hero_1, mobile: mobile_images_hero_1 },
        { desktop: desktop_images_hero_2, mobile: mobile_images_hero_2 },
        { desktop: desktop_images_hero_3, mobile: mobile_images_hero_3 }
    ]

    const [count, setCount] = useState(0)
    const [length, setLength] = useState(0)

    // hero image background
    useEffect(() => {
        const headerContainer = document.querySelector('.header-container')
        const setHeroImage = heroImages[count]

        if (window.innerWidth >= 768) headerContainer.style.backgroundImage = `url(${setHeroImage.desktop})`
        else headerContainer.style.backgroundImage = `url(${setHeroImage.mobile})`
    }, [count])

    const handleResize = ({ target }) => {
        const headerContainer = document.querySelector('.header-container')
        const setHeroImage = heroImages[count]

        if (target.innerWidth >= 768) return headerContainer.style.backgroundImage = `url(${setHeroImage.desktop})`
        else return headerContainer.style.backgroundImage = `url(${setHeroImage.mobile})`
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [count])

    // text
    const [text, setText] = useState({ header: 'loading...', paragraph: 'loading...' })

    useEffect(() => {
        const arrowButtons = document.querySelectorAll('.left-arrow-btn img, .right-arrow-btn img')
        arrowButtons.forEach(el => el.style.pointerEvents = 'none')

        fetch('/api/room-homepage')
            .then(res => res.json())
            .then(jsonRes => {
                const headerText = jsonRes.body[count].headerText
                const paragraphText = jsonRes.body[count].text
                setText({ header: headerText, paragraph: paragraphText })
                setLength(jsonRes.body.length)
            }).then()
    }, [count])

    const handleClick = ({ target }) => {
        if (target.name === 'next') return setCount(prevCount => prevCount === length - 1 ? prevCount = 0 : prevCount + 1)
        else return setCount(prevCount => prevCount === 0 ? prevCount = length - 1 : prevCount - 1) 
    }

    return (
        <Fragment>
            <header className="header-container" >
                <a href="home"><img src={logo} alt="brand logo" /></a>
                <nav>{navEl}</nav>
            </header>
            <main className="main-container">
                <h1>{text.header}</h1>
                <p>{text.paragraph}</p>
                <a href="#">shop now <img src={arrow} alt="arrow link" /></a>
                <div className="arrow-container">
                    <button className="left-arrow-btn" name="prev" onClick={handleClick}><img src={leftArrow} alt="left arrow icon" /></button>
                    <button className="right-arrow-btn" name="next" onClick={handleClick}><img src={rightArrow} alt="right arrow icon" /></button>
                </div>
            </main>
        </Fragment>
    )
}
