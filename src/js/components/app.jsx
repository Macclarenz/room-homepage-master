import {createRoot} from 'react-dom/client'
import Main from './main'
import About from './about'
import { Fragment } from 'react'

export default function() {
    const container = document.querySelector('.outer-container')
    const root = createRoot(container)

    return root.render(<Fragment><Main /><About /></Fragment>)
}