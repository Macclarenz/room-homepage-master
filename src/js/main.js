import server from "./server";
import app from './components/app'

const init = async () => {
    return new Promise(res => {server(), res(true)})
                .then(resed => resed && app())
}

init()
