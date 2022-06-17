import { useState, useEffect, Fragment } from "react";
import { animate_mainText } from "../animation";

// images and icons
import logo from '../../../images/logo.svg'
// import arrow from '../../../images/icon-arrow.svg'
import leftArrow from '../../../images/icon-angle-left.svg'
import rightArrow from '../../../images/icon-angle-right.svg'
import navHamburger from '../../../images/icon-hamburger.svg'
import navClose from '../../../images/icon-close.svg'

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
        <Header />
    )
}

function Header() {
    const navText = ['home', 'shop', 'about', 'contact']
    const navEl = navText.map((el, i) => <li key={i}><a href={`#${el}`}>{el}</a></li>)
    const heroImages = [
        { desktop: desktop_images_hero_1, mobile: mobile_images_hero_1 },
        { desktop: desktop_images_hero_2, mobile: mobile_images_hero_2 },
        { desktop: desktop_images_hero_3, mobile: mobile_images_hero_3 }
    ]

    const [count, setCount] = useState(0)
    const [data, setData] = useState(null)

    // fetching data
    useEffect(() => {
        let controller = new AbortController()
        const fetchingData = async () => {
            try {
                const response = await fetch('/api/room-homepage', { signal: controller.signal })
                if (response.ok) {
                    const jsonResponse = await response.json()
                    setData(jsonResponse)
                    controller = null
                }
            } catch (err) {
                console.error(err.message)
            }
        }

        fetchingData()
        return () => controller?.abort()
    }, [])

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
        const headerText = data?.body[count].headerText
        const paragraphText = data?.body[count].text
        setText({ header: headerText, paragraph: paragraphText })
    }, [count, data])

    const handleClick = ({ target }) => {
        const dataLength = data.body.length
        if (target.name === 'next') {
            animate_mainText(target.name)
            return setCount(prevCount => prevCount === dataLength - 1 ? prevCount = 0 : prevCount + 1)
        } else {
            animate_mainText(target.name)
            return setCount(prevCount => prevCount === 0 ? prevCount = dataLength - 1 : prevCount - 1)
        }
    }

    // nav hamburger
    useEffect(() => {
        if (window.innerWidth >= 768) return document.querySelector('.nav-hamburger-btn').setAttribute('hidden', '')
    }, [])

    const handleNavHamburger = ({ target }) => {
        const navHamburger = document.querySelector('.nav-hamburger-btn')
        if (target.innerWidth >= 768) return navHamburger.setAttribute('hidden', '')
        else return navHamburger.removeAttribute('hidden')
    }

    useEffect(() => {
        window.addEventListener('resize', handleNavHamburger)
        return () => window.removeEventListener('resize', handleNavHamburger)
    }, [])

    const handleClick_navClose = () => {
        const navEl = document.querySelectorAll('header nav, .nav-modal')
        navEl.forEach(el => el.removeAttribute('open'))
    }

    const handleClick_navOpen = () => {
        const navEl = document.querySelectorAll('header nav, .nav-modal')
        navEl.forEach(el => el.setAttribute('open', ''))
    }

    return (
        <Fragment>
            <header className="header-container" >
                <button className="nav-hamburger-btn" type="submit" onClick={handleClick_navOpen}><img src={navHamburger} alt="nav hamburger icon" /></button>
                <a href="#home" className="nav-logo-link"><img src={logo} alt="brand logo" /></a>
                <div className="nav-modal" onClick={handleClick_navClose}></div>
                <nav>
                    <button type="submit" className="nav-close-btn" onClick={handleClick_navClose}><img src={navClose} alt="x icon" /></button>
                    <ul className="nav-list">
                        {navEl}
                    </ul>
                </nav>
            </header>
            <main className="main-container">
                <h1>{text.header}</h1>
                <p>{text.paragraph}</p>
                <a href="#">shop now <svg width="40" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M34.05 0l5.481 5.527h.008v.008L40 6l-.461.465v.063l-.062-.001L34.049 12l-.662-.668 4.765-4.805H0v-1h38.206l-4.82-4.86L34.05 0z" fill="#000" fillRule="nonzero" /></svg>
                </a>
                <div className="arrow-container">
                    <button type="submit" className="left-arrow-btn" name="prev" onClick={handleClick}><img src={leftArrow} alt="left arrow icon" /></button>
                    <button type="submit" className="right-arrow-btn" name="next" onClick={handleClick}><img src={rightArrow} alt="right arrow icon" /></button>
                </div>
            </main>
        </Fragment>
    )
}
