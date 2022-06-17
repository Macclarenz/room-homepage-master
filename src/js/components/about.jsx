import { useState, useEffect, Fragment } from "react";
import { animate_aboutText } from "../animation";

// images or icons
import imageDark from '../../../images/image-about-dark.jpg'
import imageLight from '../../../images/image-about-light.jpg'

export default function () {
    const [text, setText] = useState({ header: 'loading...', paragraph: 'loading...' })
    const [data, setData] = useState(null)

    useEffect(() => {
        let controller = new AbortController()
        const fetchingData = async () => {
            try {
                const response = await fetch('/api/room-homepage', { signal: controller.signal })
                if (response.ok) {
                    const jsonResponse = await response.json()
                    animate_aboutText()
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

    useEffect(() => {
        const headerText = data?.about.headerText
        const paragraphText = data?.about.text
        setText({ header: headerText, paragraph: paragraphText })
    }, [data])

    useEffect(() => {
        // animate_aboutImage()
    })

    return (

        <div className="about-container">
            <div className="image-about-container-dark">
                <img src={imageDark} alt="dark furniture" />
            </div>
            <div className="about-text-container">
                <h2>{text.header}</h2>
                <p>{text.paragraph}</p>
            </div>
            <div className="image-about-container-light">
                <img src={imageLight} alt="light furniture" />
            </div>
        </div>

    )
}