<script lang="ts">
    import Slider from "../_slider.svelte"
    import type SongItem from "../_song-item.svelte"
    import PlayerQueue from "./_player-queue.svelte"

    export let src: string = ""
    export let img: string = ""
    export let title: string = ""
    export let author: string = ""
    export let queue: SongItem[] = []

    export let settings = {}

    export let nowPlaying: number = 0


    $: _src = src
    $: _img = img
    $: _title = title
    $: _author = author

    export let paused: boolean = true
    export let currentTime: number = 0
    export let duration: number = 0

    export let ended: boolean = false
    
    $: if (ended) {
        currentTime = 0
        let xhr = new XMLHttpRequest()
        xhr.open("POST", "http://127.0.0.1:3001/discord-rpc")
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify({
            type: "finished"
        }))
        if(settings["repeatQueue"] == true) {
            nowPlaying = -1
        }
        nextSong()
    }

    function indexChanged(num) {
        nowPlaying = num      
        let info = queue[num].getInfo()
        setSong(info["title"], info["author"], info["thumbnail"], info["src"])
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
            image: img,
            length: duration,
            type: "started"
        }))
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

    function convertTimestamp(ms) {
        let seconds = ms
        seconds = Math.floor(seconds % 3600); 

        let minutes = Math.floor(seconds / 60); 

        seconds = Math.floor(seconds % 60);

        let minutesStr = ("00" + minutes).slice(-2);
        let secondsStr = ("00" + seconds).slice(-2);

        return minutesStr + ":" + secondsStr
}


</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<div class="fossic-player has-shadow">
    <audio autoplay={settings["autoplay"]} bind:ended bind:duration bind:currentTime bind:paused bind:this={audio} {src}></audio>
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
        <button class="previous" on:click={() => prevSong()}>

        </button>
        <button class="playback-toggle {!paused ? 'playing': 'paused'}" on:click={togglePlayback} >

        </button>
        <button class="next" on:click={() => nextSong()}>

        </button>
    </div>

    <div class="right-section">
        <PlayerQueue on:itemChanged={(e) => indexChanged(e.detail)} songs={queue}>

        </PlayerQueue>
        <p class="time">
            {time_str}
        </p>
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

    .fossic-player > .right-section {
        height: 85%;
        position: absolute;
        right: 20px;
        bottom: 0;
        width: 33%;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
    }
    .fossic-player > .right-section > .time {    
        margin-right: 30px;
        transform: translateY(-25%);
    }

</style>