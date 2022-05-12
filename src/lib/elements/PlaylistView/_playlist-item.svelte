<script lang="ts">
    export let songs = []

    let songsPopup: HTMLDivElement = undefined
</script>

<div class="playlist-item" on:click={() => {
    console.log(songsPopup)
    songsPopup.classList.toggle("active")
}}>
    <h>
        Test Playlist
    </h>
    <p1>
        10 Songs
    </p1>
    <div class="playlist-songs-popup" bind:this={songsPopup} >

    </div>
</div>

<style>
    .playlist-item {
        min-width: 120px;
        width: 90%;
        max-width: 300px;
        min-height: 30px;
        background-color: rgba(50, 50, 50, 1);
        padding: 10px;

        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.08);
    }
    .playlist-item:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        cursor: pointer;
        scale: 1.1;
    }
    .playlist-item > h {
        margin: auto;
        display: block;
        margin-bottom: 3px;
    }
    .playlist-item > p1 {
        padding: 2px;
        display: block;
        color: grey;
    }

    .playlist-songs-popup {
        position: absolute;
        z-index: 999;
        margin-bottom: 5px;
        border-color: rgba(50, 50, 50, 1);
        border-width: 5px;
        border-style: solid;
    }
</style>