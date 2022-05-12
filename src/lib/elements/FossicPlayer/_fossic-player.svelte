<script lang="ts">

    import { settings } from "$lib/user_data/stores";

    import Slider from "./_slider.svelte"
    import type SongItem from "../_song-item.svelte"
    import PlayerQueue from "./_player-queue.svelte"

    export let src: string = ""
    export let img: string = ""
    export let title: string = ""
    export let author: string = ""
    export let queue: SongItem[] = []


    export let nowPlaying: number = 0
    

    export let paused: boolean = true
    export let currentTime: number = 0
    export let duration: number = 0


    let playerQueue: PlayerQueue = undefined
    
    function songFinished() {
        currentTime = 0
        let xhr = new XMLHttpRequest()
        xhr.open("POST", "http://127.0.0.1:3001/discord-rpc")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify({
            type: "finished"
        }))
        if($settings["repeatQueue"] == true && nowPlaying >= queue.length - 1) {
            nowPlaying = -1
        }
        nextSong()
    }

    function indexChanged(num) {
        nowPlaying = num      
        let info = queue[num].getInfo()
        setSong(info["title"], info["author"], info["thumbnail"], info["src"])
        playerQueue.setActiveItem(num)

    }

    export function nextSong() {
        if(nowPlaying < queue.length-1)
            nowPlaying++
        indexChanged(nowPlaying)    
    }
        

    export function prevSong(){
        if (nowPlaying > 0)
            nowPlaying--
        indexChanged(nowPlaying)
    }

    export function setSong(ntitle, nauthor, nimage, nsrc) {
        title = ntitle
        author = nauthor
        img = nimage
        src = nsrc
        let xhr = new XMLHttpRequest()
        xhr.open("POST", "http://127.0.0.1:3001/discord-rpc")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify({
            title, 
            author, 
            type: "started"
        }))
        audio.currentTime = 0
        audio.play()
    }

    $: max = `${duration}`
    $: value = `${currentTime}`

    $: time_str = `${convertTimestamp(value)} / ${convertTimestamp(max)}`

    export let audio = undefined

    function togglePlayback() {
        if(!paused) {
            audio.pause()
        }
        else {
            audio.play()
        }
        paused = !paused
    }

    function sliderChanged(val) {
        currentTime = val.detail
    }

    function convertTimestamp(s) {
        let seconds = s
        seconds = Math.floor(seconds % 3600); 

        let minutes = Math.floor(seconds / 60); 

        seconds = Math.floor(seconds % 60);

        let minutesStr = ("00" + minutes).slice(-2);
        let secondsStr = ("00" + seconds).slice(-2);

        return minutesStr + ":" + secondsStr
    }

    export function shuffleQueue() {
        let tmp = queue[nowPlaying]
        queue.splice(nowPlaying, 1)
        queue = [tmp, ...queue.sort(a => .5 - Math.random())]
        nowPlaying = 0
        playerQueue.setActiveItem(0)
    }

    let showVol = false

    function volChanged(e) {
        let vol = e.target.value / 100
        audio.volume = vol
    }


</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="fossic-player has-shadow">
    <audio autoplay={$settings["autoplay"]} on:ended={songFinished} bind:duration bind:currentTime bind:paused bind:this={audio} {src}></audio>
    <div class="progress-bar-container">
        <Slider on:changed={sliderChanged} bind:max bind:value></Slider>
    </div>

    <div class="left-section">
        <img class="has-shadow" src={img} alt="">
        <div class="info">
            <p class="title">{title}</p>
            <p class="author">{author}</p>
        </div>
    </div>

    <div class="middle-section">
    <button class="shuffle secondary" on:click={shuffleQueue}>

        </button>
        <button class="previous" on:click={() => prevSong()}>

        </button>
        <button class="playback-toggle {!paused ? 'playing': 'paused'}" on:click={togglePlayback} >

        </button>
        <button class="next" on:click={() => nextSong()}>

        </button>
        <button class="repeat secondary {$settings["repeatQueue"] ? "enabled" : ""}" on:click={() => {
            $settings["repeatQueue"] = !$settings["repeatQueue"]
            settings.set($settings)
        }}>

        </button>
    </div>

    <div class="right-section">
        <PlayerQueue bind:this={playerQueue} on:itemChanged={(e) => indexChanged(e.detail)} songs={queue}>

        </PlayerQueue>
        <p class="time">
            {time_str}
        </p>
        <div class="volume-control">
            <button class="volume-btn" on:click={() => showVol = !showVol}>
            </button>
            <div class="has-shadow" style={showVol ? "width: fit-content" : "width: 0px"} on:mouseleave={() => showVol = false}>
                <div>
                    <input on:input={volChanged} type="range" name="" id="" max="100" value="100" on:blur={() => showVol = false}>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .fossic-player {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;
        background-color: #3c3c3cff;
        min-width: 565px;
        overflow-x: clip;
        overflow-y: visible;
    }

    .fossic-player > .progress-bar-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        margin: 0;
    }

    .fossic-player > .left-section {
        display: flex;
        flex-direction: row;
    }
    .fossic-player > .left-section > img {
        height: 50px;
        display: block;
        margin-top: 10px;
        margin-left: 10px;
    }
    .fossic-player > .left-section > .info {
        display: flex;
        flex-direction: column;
        padding-top: 10px;
        margin-left: 10px;
    }
    .fossic-player > .left-section > .info > p {
        margin: 3px;
    }
    .fossic-player > .left-section > .info > .author {
        opacity: 70%;
    }

    .fossic-player > .middle-section {
        height: 70px; 
        width: 33%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        justify-content: center;
        text-align: center;
        margin-top: 10px;
    }
    .fossic-player > .middle-section > button {
        height: 30px;
        width: 30px;
        background-color: transparent;
        background-size: 30px;
        background-repeat: no-repeat;
        outline: none;
        border: none;
    }
    .fossic-player > .middle-section > button:hover {
        cursor: pointer;
    }
    .fossic-player > .middle-section > .playback-toggle {
        height: 50px;
        width: 50px;
        background-size: 50px;
        background-position: 1px;

    }
    .fossic-player > .middle-section > .playback-toggle.paused {
        background-image: url("/play.png");
    }
    .fossic-player > .middle-section > .playback-toggle.playing {
        background-image: url("/pause.png");
    }   
    .fossic-player > .middle-section > .previous {
        transform: scaleX(-1);
        background-image: url("/skipbtn.png");
    }
    .fossic-player > .middle-section > .next {
        background-image: url("/skipbtn.png");
    }
    .fossic-player > .middle-section > .secondary {
        height: 20px;
        background-size: 20px;
        width: 20px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .fossic-player > .middle-section > .shuffle {
        background-image: url("/shuffle.png");
    }
    .fossic-player > .middle-section > .repeat {
        opacity: .3;
        background-image: url("/repeat.png");
    }
    .fossic-player > .middle-section > .repeat.enabled {
        opacity: 1;
    }

    .fossic-player > .right-section {
        height: 85%;
        position: absolute;
        right: 20px;
        bottom: 2px;
        width: 33%;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }
    .fossic-player > .right-section > .time {    
        margin-right: 30px;
    }
    .fossic-player > .right-section > * > .volume-btn {
        background-image: url("/volume.png");
        background-size: 25px;
        border: none;
        background-position: 0;
        background-repeat: no-repeat;
        background-color: transparent;
        height: 30px;
        width: 30px;
        margin-right: 10px;
    }
    .fossic-player > .right-section > * > .volume-btn:hover {
        cursor: pointer;
    }

    .fossic-player > .right-section > .volume-control > div {
        width: fit-content;
        height: fit-content;
        background-color: #3c3c3c;
        rotate: -90deg;
        position: absolute;
        bottom: 120px;
        right: 95px;
        z-index: 1;
        overflow: hidden;
        border-radius: 15px;
    }
    .fossic-player > .right-section > .volume-control > div > div {
        padding: 10px;
    }

</style>