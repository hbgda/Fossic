<script lang="ts">
    import { createEventDispatcher } from "svelte/internal";
    import type SongItem from "../_song-item.svelte";
    import QueueItem from "./_queue-item.svelte";

    let queueItems: QueueItem[] = []
    let current: QueueItem = undefined

    export let showQueue = false
    export let songs: SongItem[] = []



    const dispatch = createEventDispatcher()
    function itemClicked(idx) {
        if(current == queueItems[idx]) return
        dispatch("itemChanged", idx)
    }

    export function setActiveItem(idx) {
        console.log(idx)
        if(current == undefined) {
            current = queueItems[0]
        }
        current.setActive(false)
        current = queueItems[idx]
        current.setActive(true)
    }

    $: showStr = showQueue ? "" : "right: -600px"

</script>

<div>
    <button class="queue-btn" on:click={() => showQueue = !showQueue}>
    </button>
    <div class="queue has-shadow" style={showStr} on:mouseleave={() => showQueue = false}>
        {#each songs as song, i (`${song.getInfo()["hash"] || song.getInfo()["id"]} ${i}`)}
            <QueueItem active={i == 0 ? true : false} bind:this={queueItems[i]} on:clicked={() => itemClicked(i)} songItem={song}></QueueItem>
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
        background-position: 0;
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