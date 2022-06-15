import { createServer } from "miragejs";

export default function () {
    createServer({
        routes() {
            this.get("/api/room-homepage", () => ({
                body: [
                    { 
                        id: 1, 
                        headerText: 'Discover innovative ways to decorate',
                        text: `We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.`,
                    }, {
                        id: 2,
                        headerText: 'Shop now',
                        text: `With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.`,
                    }, {
                        id: 3,
                        headerText: `Manufactured with the best materials`,
                        text: `Our modern furniture store provide a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.`,
                    }
                ],
                about: {
                    headerText: 'About our furniture',
                    text: `Our multifunctional collection blends design and function to suit your individual taste. Make each room unique, or pick a cohesive theme that best express your interests and what inspires you. Find the furniture pieces you need, from traditional to contemporary styles or anything in between. Product specialists are available to help you create your dream space.`,
                    images: {
                        light: '../../images/image-about-light.jpg',
                        dark: '../../images/image-about-dark.jpg'
                    }
                }
            }))
        },
    })
}