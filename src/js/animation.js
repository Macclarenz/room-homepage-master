import gsap from "gsap"

export const animate_mainText = (direction) => {
    const parent = document.querySelector('.main-container')
    const children = parent.querySelectorAll('h1, p, a')
    const arrowButtons = parent.querySelectorAll('.arrow-container button')

    children.forEach(el => {
        el.classList.add(`animate-${direction}`)
        arrowButtons.forEach(btn => btn.setAttribute('disabled', true))
    })

    children.forEach(el => {
        el.addEventListener('animationend', () => {
            el.classList.remove(`animate-${direction}`)
            arrowButtons.forEach(btn => btn.removeAttribute('disabled'))
        })
    })

    children.forEach(el => {
        el.addEventListener('animationcancel', () => {
            el.classList.add('fade-away')
        })
    })
}

export const animate_aboutText = () => {
    const parent = document.querySelector('.about-text-container')
    const children = parent.querySelectorAll('h2, p')

    const tl = gsap.timeline()
    tl.from(children, {opacity: 0, y: 20, duration: .8, stagger: .2})

    return
}
