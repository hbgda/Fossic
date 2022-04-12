<script lang="ts">
    import Slider from "./_slider.svelte"

    export let src: string = ""
    export let img: string = ""
    export let title: string = ""
    export let author: string = ""


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
    <audio autoplay bind:ended bind:duration bind:currentTime bind:paused bind:this={audio} {src}></audio>
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
        <button class="previous">

        </button>
        <button class="playback-toggle {!paused ? 'playing': 'paused'}" on:click={togglePlayback} >

        </button>
        <button class="next">

        </button>
    </div>

    <div class="right-section">
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
        overflow-x: visible;
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
        height: 100%;
        position: absolute;
        right: 0;
        bottom: 0;
        width: 33%;
    }
    .fossic-player > .right-section > .time {    
        margin-right: 15px;
        position: absolute;
        top: 25%;
        right: 0;
        transform: translateY(-25%);
    }

</style>