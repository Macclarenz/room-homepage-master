// library
import { createRoot } from 'react-dom/client'
import { Fragment } from 'react'

// components
import Main from './main'
import About from './about'

// style (scss)
import '../../sass/style.scss'

export default function () {
    const container = document.querySelector('.outer-container')
    const root = createRoot(container)

    return root.render(
        <Fragment>
            <Main />
            <About />
        </Fragment>
    )

}