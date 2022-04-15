<script lang="ts">
    export let songItems = []
    export let settings = {}

    $: songs = [...songItems]

    $: songElements = []

    let queue = []

    import SearchBar from "$lib/elements/_search-bar.svelte";
    import ItemList from "$lib/elements/_item-list.svelte";
    import SongItem from "$lib/elements/_song-item.svelte";
    import FossicPlayer from "$lib/elements/FossicPlayer/_fossic-player.svelte";
    import Modal from "$lib/elements/_modal.svelte";
    import SongUploader from "$lib/elements/_song-uploader.svelte";
    import OptionsDisplay from "$lib/elements/_options-display.svelte"
    import { onMount } from "svelte/internal";

    let shouldShowModal: boolean = false

    function query(event){
        console.log(event.detail.query)
        let search = event.detail.query
        songs = [...songItems.filter(s => {
            return (s["title"].toLowerCase().includes(search.toLowerCase()) 
                    || s["author"].toLowerCase().includes(search.toLowerCase()))
        })]
    }

    let sList = undefined
    let player: FossicPlayer = undefined

    onMount(() => {
        console.log(sList)
    })

    function songClicked(song, i) {
        queue = [...queue, songElements[i]]
        if(queue.length == 1) {
            player.setSong(song["title"], song["author"], song["image"], song["src"])
        }
    }

</script>

<div class="content">
    <OptionsDisplay bind:settings>

    </OptionsDisplay>
    {#if shouldShowModal}
        <Modal title="Upload" on:close={() => shouldShowModal = false}>
            <SongUploader on:finished={(data) => songItems = [data.detail, ...songItems]}/>
        </Modal>
    {/if}
    <SearchBar _class="has-shadow" on:search={query} width="40ch"></SearchBar>
    <button class="upload-btn" on:click={() => shouldShowModal = true}>
        Upload 
    </button>

    <div class="content-display">
        <ItemList bind:this={sList} id="song-list" title="Your Songs">
            {#each songs as song, i}
                <SongItem bind:this={songElements[i]} on:clicked={(e) => songClicked(song, i)} title={song["title"]} author={song["author"]} thumbnail={song["image"]} src={song["src"]}></SongItem>
            {/each}
        </ItemList>
    </div>


    <FossicPlayer bind:settings queue={queue} bind:this={player}></FossicPlayer>
</div>


<style>
    .content {
        padding-top: 10px;
        padding-left: 10px;
    }
    .upload-btn {
        margin-left: 10px;
        display: inline-block;
        background-color: rgb(67, 67, 166);
        outline: none;
        border:none;
        height: 35px;
        width: 70px;
        border-radius: 0 15px 0 15px;
    }
    .upload-btn:hover {
        background-color: rgba(67, 67, 166, 0.75);
        cursor: pointer;
    }

    .upload-prompt {
        margin-top: 10px;
        margin-left: 25px;
    }

    .upload-prompt > [type=submit] {
        margin-top: 5px;
        background-color: rgb(67, 67, 166);
        outline: none;
        border:none;
        height: 20px;
        width: 70px;
        border-radius: 0 15px 0 15px;
    }
    .content-display {
        display: flex;
        flex-direction: row;
        height: fit-content;
    }
    .playlists {
        width: 100%;
        height: calc(100vh - 245px);
        background-color: transparent;
        margin: 25px;
    }
    .playlists > div {
        width: 100%;
        height: 50px;
        background-color: #3c3c3c;
        margin-bottom: 5px;
        padding-left: 10px;
        padding-right: 10px;
    }
    .playlists > p1 {
        width: 100%;
        text-align: center;
    } 
    .playlists > div > .title {
        float: left;
    }
    .playlists> div > .song-count {
        float: right;
    }
</style>