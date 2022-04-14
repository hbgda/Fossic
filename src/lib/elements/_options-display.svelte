<script lang="ts">
    export let showSettings = true

    export let settings = undefined

    if(typeof localStorage != "undefined") {
        let stored = localStorage.getItem("settings")
        if(stored != undefined) {
            settings = JSON.parse(stored)
        }
    }

    export let autoplay: boolean = settings["autoplay"] || false
    export let repeatQueue: boolean = settings["repeatQueue"] || false

    $: settings = {
        autoplay,
        repeatQueue
    }

    $: if(settings != undefined && typeof localStorage != "undefined") {
        localStorage.setItem("settings", JSON.stringify(settings))
    }

    $: showStr = showSettings ? "height: 0px" : "height: 200px"

</script>

<div>
    <button class="settings-btn {showSettings ? "open" : "close"}" on:click={() => showSettings = !showSettings}>

    </button>
    <div class="settings has-shadow" style={showStr}>
        <div class="container">
            <label for="auto-play">Auto-play</label>
            <input bind:checked={autoplay} type="checkbox" name="auto-play" id="auto-play">
       
            <label for="auto-play">Repeat Queue</label>
            <input bind:checked={repeatQueue} type="checkbox" name="repeat-queue" id="repeat-queue">
        </div>
    </div>
</div>

<style>
    .settings-btn {
        height: 35px;
        width: 35px;
        outline: none;
        border: none;
        background-size: 35px;
        background-color: transparent;
        background-image: url("/settings.png");
        position: absolute;
        top: 60px;
        right: 20px;
        transition: all .25;
    }
    .settings-btn:hover {
        cursor: pointer;
    }
    .open {
        transition: all 0.25s;
        rotate: 90deg;
    }
    .close {
        transition: all 0.25s;
        rotate: -90deg;
    }

    .settings {
        position: absolute;
        background-color: #3c3c3c;
        top: 100px;
        width: 300px;
        right: 20px;
        z-index: 1;
        transition: all 0.25s;
        overflow: clip;
    }
    .container {
        padding: 15px;
    }
</style>