<script lang="ts">
    import { createEventDispatcher } from "svelte/internal";
    import type SongItem from "../_song-item.svelte";
    import QueueItem from "./_queue-item.svelte";

    export let showQueue = false
    export let songs: SongItem[] = []



    const dispatch = createEventDispatcher()
    function itemClicked(idx) {
        dispatch("itemChanged", idx)
    }

    $: showStr = showQueue ? "" : "right: -600px"

</script>

<div>
    <button class="queue-btn" on:click={() => showQueue = !showQueue}>
    </button>
    <div class="queue has-shadow" style={showStr}>
        {#each songs as song, i}
            <QueueItem on:clicked={() => itemClicked(i)} songItem={song}></QueueItem>
        {/each}
    </div>
</div>

<style>
    div {
        height: 30px;
        width: fit-content;
        align-items: center;
    }
    .queue-btn {
        height: 30px;
        width: 30px;
        background-image: url("/queue-btn.png");
        background-color: transparent;
        background-size: 30px;
        background-repeat: no-repeat;
        border: none;
        outline: none;
        margin: auto;
    }
    .queue-btn:hover {
        cursor: pointer;
    }
    .queue {
        position: absolute;
        z-index: 1;
        bottom: 60px;
        right: -20px;
        height: 400px;
        width: 500px;
        max-height: 600px;
        background-color: #3c3c3c;
        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-width: thin;
        transition: all 0.25s;
        border-radius: 15px 0 0 15px;
        border-width: 5px;
        border-style: solid;
        border-color: #3c3c3c;
    }
</style>