<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import type SongItem from "../_song-item.svelte";    
    
    export let songItem: SongItem = undefined
    export let title: string = ""
    export let author: string = ""
    export let thumbnail: string = ""
    export let active: boolean = false

    $: if(songItem != undefined) {
        let songData = songItem.getInfo()
        title = songData.title
        author = songData.author
        thumbnail = songData.thumbnail
    }
    export let idx: number = -1

    let div: HTMLDivElement = undefined

    const dispatch = createEventDispatcher()

    function clicked() {
        dispatch("clicked", idx)
    }

    export function setActive(active: boolean) {
        if(active) {
            div.classList.add("active")
        }
        else {
            div.classList.remove("active")
        }
    }

</script>

<div bind:this={div} class="item {active ? "active" : ""}" on:click={() => clicked()}>
    <div class="overlay"></div>
    <img src={thumbnail} alt="">
    <div class="info">
        <p class="title">{title}</p>
        <p class="author">{author}</p>
    </div>
</div>

<style>
    div.item {
        display: flex;
        flex-direction: row;
        height: 80px;
        transition: all 0.25s;
        position: relative;
        z-index: 2;
    }
    @keyframes itemShow {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    .overlay {
        width: 100%;
        position: absolute;
        height: 100%;
        top: 0;
        background-color: rgba(100, 100, 100, 0.5);
        background-image: url("play.png");
        background-size: 35px;
        background-repeat: no-repeat;
        background-position: 25px;
        z-index: 2;
        opacity: 0;
        transition: all 0.25s;
    }
    .overlay:hover {
        opacity: 1;
        cursor: pointer;
        transition: all 0.25s;
    }
    img {
        height: 65px;
        width: 65px;
        margin: 7.5px;
        position: relative;
    }
    div > div.info {
        display: flex;
        flex-direction: column;
        margin: 10px;
        margin-left: 5px;
    }
    p {
        font-size: large;
        margin: 3px;
        margin-bottom: 5px;
    }
    .title {
        margin-top: 7.5px;
    }
    .author {
        font-size: small;
        opacity: 0.7;
    }
    .active {
        background-image: linear-gradient(to right, rgb(67, 67, 166), 70%, transparent); /*, rgb(67, 67, 166));*/
    }
</style>