<script lang="ts">
    export let showSettings = false

    import { settings } from "$lib/user_data/stores"

    if(typeof localStorage != "undefined") {
        settings.set(JSON.parse(localStorage.getItem("settings")))
        settings.subscribe(val => localStorage.setItem("settings", JSON.stringify(val)))
    }

    export let autoplay: boolean = $settings["autoplay"] || false
    export let repeatQueue: boolean = $settings["repeatQueue"] || false

    $: settings.set({
        autoplay, repeatQueue
    })

    $: showStr = showSettings ? "height: 100px" : "height: 0px"

</script>

<div>
    <button class="settings-btn {showSettings ? "open" : "close"}" on:click={() => showSettings = !showSettings}>

    </button>
    <div class="settings has-shadow" style={showStr} on:mouseleave={() => showSettings = false}>
        <div class="container">
            <label for="auto-play">Auto-play</label>
            <input bind:checked={autoplay} type="checkbox" name="auto-play" id="auto-play">
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
        top: 15px;
        right: 20px;
        transition: all 0.25;
    }
    .settings-btn:hover {
        cursor: pointer;
    }
    .close {
        transition: all 0.25s;
        rotate: 90deg;
    }
    .open {
        transition: all 0.25s;
        rotate: -90deg;
    }

    .settings {
        position: absolute;
        background-color: #3c3c3c;
        top: 50px;
        height: 0px;
        width: 300px;
        right: 20px;
        z-index: 4;
        transition: all 0.25s;
        overflow: clip;
    }
    .container {
        padding: 15px;
    }
</style>