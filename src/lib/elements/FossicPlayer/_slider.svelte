<script lang="ts">
    export let min: string = "0"
    export let max: string = "100"
    export let value: string = "50"
    export let _slider_val: string = "0"

    
    $: prog_style = `width: ${(parseInt(value)/parseInt(max))*100}%`
    $: thumb_style = `left: calc(${((parseInt(value)/parseInt(max))*100) || 0}% - 20px)`

    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    function sliderChange(event) {
        value = event.target.value
        dispatch("changed", value)
    }
</script>

<div>
    <input on:input={sliderChange} type="range" bind:value={_slider_val} {max} {min}>
    <div class="range-track">

    </div>
    <div class="range-progress" style={prog_style}>

    </div>
    <div class="range-thumb" style={thumb_style}>

    </div>
</div>

<style>
    div {

    }
    div > input {
        width: 100%;
        position: absolute;
        left: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        top: -7.5px;
        
    }
    div > .range-track {
        position: absolute;
        left: 0;
        background-color: rgba(100, 100, 100, 0.8);
        width: 100%;
        height: 5px;
    }
    div > .range-progress {
        height: 5px;
        background-color: rgb(67, 67, 166);
        position: absolute;
        left: 0;
        margin: 0;
    }
    div > .range-thumb {
        position: absolute;
        height: 15px;
        width: 15px;
        top: -6.5px;
        background-color: rgb(67, 67, 166);
        z-index: 0;
        border-radius: 45px;
        border-color: rgb(67, 67, 166);
        border-width: 2px;
        border-style: solid;
        margin-right: 15px;
        margin-left: 15px;
    }
    
</style>