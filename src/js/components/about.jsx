import { useState, useEffect, Fragment } from "react";

// images or icons
import imageDark from '../../../images/image-about-dark.jpg'
import imageLight from '../../../images/image-about-light.jpg'

export default function () {
    const [text, setText] = useState({header: 'loading...', paragraph: 'loading...'})

    useEffect(() => {
        fetch('/api/room-homepage')
            .then(res => res.json())
            .then(jsonRes => {
                setText({
                    header: jsonRes.about.headerText,
                    paragraph: jsonRes.about.text
                })
            })
    }, [])

    return (
        <Fragment>
            <div className="image-about-container-light">
                <img src={imageDark} alt="dark furniture" />
            </div>
            <div className="about-container">
                <h2>{text.header}</h2>
                <p>{text.paragraph}</p>
            </div>
            <div className="image-about-container-dark">
                <img src={imageLight} alt="light furniture" />
            </div>
        </Fragment>
    )
}