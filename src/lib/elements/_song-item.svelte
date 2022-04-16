
<script lang="ts">
    export let title: string = "Test"
    export let author: string = "Test Author"
    export let thumbnail: string = ""
    export let src: string = ""
    export let id: string = ""
    
    import { favourites } from "$lib/user_data/stores";
    export let isFav: boolean = $favourites.includes(id)
    favourites.subscribe(val => {
        isFav = val.includes(id)
    })
    
    if (title.length > 45) {
        title = title.trim().substring(0, 45).split(" ").slice(0, -1).join(" ") + "…";
    }

    import { createEventDispatcher } from "svelte/internal";
    const dispatch = createEventDispatcher()

    export function clicked() {
        dispatch("clicked")
    }

    export function getInfo() {
        return {
            title, author, thumbnail, src, id
        }
    }

    export function rClicked(e) {
        e.preventDefault()
        if($favourites.includes(id)) {
            favourites.set($favourites.filter(s => s != id))
        }
        else {
            favourites.set([...$favourites, id])
        }
    }

</script>

<div class="song-item has-shadow {isFav ? "is-fav" : ""}" on:click={clicked} on:contextmenu={rClicked}>
    <img referrer-policy="no-referrer"src={thumbnail} alt="">
    <div class="info">
        <p class="song-title">{title}</p>
        <p class="song-author">{author}</p>
    </div>
</div>

<style>
    .song-item {
        height: fit-content;
        width: 200px;
        display: flex;
        flex-direction: column;
        position: relative;
        scale: 0.85;
        overflow: hidden;
    }
    .song-item.is-fav::before {
        content: "";
        background-image: url("star.png");
        background-repeat: no-repeat;
        background-position: 3.25px 30%;
        background-size: 25px;
        border-radius: 0 0 15px 0;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #3c3c3cff;
        width: 35px;
        height: 35px;
        line-height: 5;
        font-size: xx-large;
    }
    .song-item > img {
        height: 200px;
    }
    .song-item > .info {
        widows: 100%;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.4);
        height: 80px;
        position: relative;
    }
    .song-item > .info > .song-title {
        margin-top: 5px;
        font-size: large;
        margin-bottom: 0px;
        height: 41.5px;
        max-height: 41.5px;
        padding-left: 5px;
        padding-right: 5px;
    }
    .song-item > .info > .song-author {
        opacity: 70%;
        font-size: small;
        margin-top: 5px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0
    }
    
    .song-item:hover {
        cursor: pointer;
    }

    .song-item::after {
        content: "";
        background-image: url("/play.png");
        background-position: 65px;
        background-size: 75px;
        background-repeat: no-repeat;
        width: 200px;
        height: 200px;
        background-color: rgba(100, 100, 100, 0.2);
        position: absolute;
        top: 0;
        opacity: 0;
        transition: all 0.25s;
    }

    .song-item:hover::after {
        content: "";
        transition: all 0.25s;
        opacity: 1;
    }

    @keyframes songHover {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>