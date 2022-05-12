<script lang="ts">
    import { playlists } from "$lib/user_data/stores";
    import ItemList from "../_item-list.svelte";
    import SongItem from "../_song-item.svelte";
    import PlaylistItem from "./_playlist-item.svelte";   

    export let songs = []
    let selected = 0
</script>

<div class="playlist-view">
    <div class="content">
        <ul class="list">
            <PlaylistItem>
            </PlaylistItem>
        </ul>
        <ItemList title="">
            {#each songs as song, i (song)}
                    <SongItem title={song["title"]} author={song["author"]} thumbnail={song["image"]} src={song["src"]} id={song["id"] || song["hash"]}></SongItem>
            {/each}
        </ItemList>
    </div>
</div>

<style>
    .playlist-view {
        height: 70%;
    }
    .playlist-view > .content {
        display: flex;
        flex-direction: row;
    }

    .playlist-view > .content > .list {
        width: 30%;
        overflow-y: scroll;
        scrollbar-width: thin;
        height: 100%;
        padding: 5px;
        max-height: calc(100vh - 215px);
        text-align: center;
        padding-right: 10px;
    }

    .playlist-view > .content > .list > :global(*) {
        display: inline-block !important;
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>