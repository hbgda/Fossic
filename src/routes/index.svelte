<script lang="ts">
    export let songItems = []
    console.log(songItems)

    $: songs = [...songItems]

    import SearchBar from "$lib/elements/_search-bar.svelte";
    import ItemList from "$lib/elements/_item-list.svelte";
    import SongItem from "$lib/elements/_song-item.svelte";
    import FossicPlayer from "$lib/elements/_fossic-player.svelte";
    import Modal from "$lib/elements/_modal.svelte";
    import SongUploader from "$lib/elements/_song-uploader.svelte";
    import { dataset_dev, onMount } from "svelte/internal";

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

    function songClicked(title, author, image, src) {
        player.setSong(title, author, image, src)
    }

</script>

<div class="content">
    {#if shouldShowModal}
        <Modal title="Upload" on:close={() => shouldShowModal = false}>
            <SongUploader on:finished={(data) => songItems = [data.detail, ...songItems]}/>
        </Modal>
    {/if}
    <SearchBar _class="has-shadow" on:search={query} width="40ch"></SearchBar>
    <button class="upload-btn" on:click={() => shouldShowModal = true}>
        Upload 
    </button>

    <ItemList bind:this={sList} id="song-list" title="Your Songs">
        {#each songs as song}
            <SongItem on:clicked={() => songClicked(song["title"], song["author"], `${song["image"]}`, `/songs/${song["hash"]}.${song["srcType"]}`)} title={song["title"]} author={song["author"]} thumbnail={song["image"]}></SongItem>
        {/each}
    </ItemList>

    <FossicPlayer bind:this={player}></FossicPlayer>
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
</style>