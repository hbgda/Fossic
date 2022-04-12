import * as fs from "fs"
import { SongProvider } from "$lib/scripts/SongProvider"

/**@type {import('./index').RequestHandler} */

export async function get() {

    let songItems = SongProvider.getSongData()

    return {
        body: {
            songItems
        }
    }
}