
import { updateCommands } from "../register-commands.js"

const syncCommands = async () => {
    updateCommands().then(() => {
        console.log("Updated the commands!")
    }).catch((err) => console.log(err))
}

export { syncCommands }