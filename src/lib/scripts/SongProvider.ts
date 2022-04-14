import * as fs from "fs"

export class SongProvider {
    static getSongData() {
        return fs.readdirSync("./data/songs/").map(f => {
            const raw = fs.readFileSync("./data/songs/" + f)
            let json = JSON.parse(raw)
            json["src"] = `/songs/${f}.${json["srcType"]}`
            return json
        })
    }
}