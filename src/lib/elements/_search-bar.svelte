<script>
    export let placeholder = "Search..."
    export let width = "200px"
    export let _class = ""

    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()

    
    function inputChange(event) {
        dispatch("search", {
            query: event.originalTarget.value
        })
    }


</script>

<div>
    <input class={_class} type="text" on:input={inputChange} {placeholder} style="width: {width};"/>
</div>

<style>
    div {
        width: fit-content;
        display: inline-block;
    }
    input {
        height: 40px;
        background-color: rgba(0, 0, 0, 0.2);
        border-color: transparent;
        /*border-bottom-color: rgba(51, 51, 152, 0.8);*/
        padding-left: 10px;
        min-width: 200px;
        outline: none;
        font-size: large;
        border-radius: 0 15px 0 15px;
    }
</style>