import { writable } from "svelte/store"

export const settings = writable({})
export const favourites = writable([])
export const playlists = writable([])