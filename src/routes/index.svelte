<script lang="ts">
    export let songItems = []

    $: songs = [...songItems]

    $: songElements = []

    let favs = []
    $: favsElements = []

    let queue = []

    let selectedTab = -1

    import SearchBar from "$lib/elements/_search-bar.svelte";
    import ItemList from "$lib/elements/_item-list.svelte";
    import SongItem from "$lib/elements/_song-item.svelte";
    import FossicPlayer from "$lib/elements/FossicPlayer/_fossic-player.svelte";
    import Modal from "$lib/elements/_modal.svelte";
    import SongUploader from "$lib/elements/_song-uploader.svelte";
    import OptionsDisplay from "$lib/elements/_options-display.svelte"
    import TabView from "$lib/elements/TabView/_tab-view.svelte"
    import PlaylistView from "$lib/elements/PlaylistView/_playlist-view.svelte"

    import { favourites } from "$lib/user_data/stores";
    if(typeof localStorage != "undefined") {
       
        favourites.set(JSON.parse(localStorage.getItem("favourites")))
        favourites.subscribe(val => {
            localStorage.setItem("favourites", JSON.stringify(val))
            favs = songItems.filter(s => {
                return val.includes(s["hash"] || val.includes(s["id"]))
            })
        })
    }

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

    function favClicked(song, i) {
        queue = [...queue, favsElements[i]]
        if(queue.length == 1) {
            player.setSong(song["title"], song["author"], song["image"], song["src"])
        }
    }

</script>

<div class="content">
    <OptionsDisplay>

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

    <button id="play-all" on:click={() => {
        if(selectedTab == 0) {
            songElements.forEach(e => {
                e.clicked()
            })
        }
        else if (selectedTab == 1) {
            favsElements.forEach(e => {
                e.clicked()
            })
        }
    }}>Play All</button>
    <div class="content-display">
        <TabView tabs={["All", "Playlists", "Favourites"]} bind:selected={selectedTab}>
            <ItemList bind:this={sList} id="song-list" title="" defaultStr="No music available, upload something using the Upload button above.">
                {#each songs as song, i (song)}
                    <SongItem bind:this={songElements[i]} on:clicked={(e) => songClicked(song, i)} title={song["title"]} author={song["author"]} thumbnail={song["image"]} src={song["src"]} id={song["id"] || song["hash"]}></SongItem>
                {/each}
            </ItemList>
            <PlaylistView songs={songs}>
                
            </PlaylistView>
            <ItemList title="" defaultStr="You don't have any favourited songs, right click a song to add it to your favourites.">
                {#each favs as song, i (song)}
                    <SongItem bind:this={favsElements[i]} on:clicked={(e) => favClicked(song, i)} title={song["title"]} author={song["author"]} thumbnail={song["image"]} src={song["src"]} id={song["id"] || song["hash"]}></SongItem>
                {/each}
            </ItemList>
        </TabView>
    </div>


    <FossicPlayer queue={queue} bind:this={player}></FossicPlayer>
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

    #play-all {
        margin-left: 10px;
        background-color: rgb(67, 67, 166);
        outline: none;
        border:none;
        height: 35px;
        width: 70px;
        border-radius: 0 15px 0 15px;
    }
    #play-all:hover {
        background-color: rgba(67, 67, 166, 0.75);
        cursor: pointer;
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