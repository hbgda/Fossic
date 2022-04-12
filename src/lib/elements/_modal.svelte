<script lang="ts">
    export let title: string = "modal"
    export let _class: string = "has-shadow"


    import { createEventDispatcher, onDestroy } from 'svelte';

    const dispatch = createEventDispatcher();
    function close(){
        dispatch("close")
    }

</script>

<div class="modal-background">
    <div class="modal {_class}">
        <p class="modal-title">{title}</p>
        <div class="modal-content">
            <slot>
                <p style="width: 100%; text-align: center">No content.</p>
            </slot>
        </div>
        <button on:click={close} class="close-modal">
            Close
        </button>
    </div>
</div>

<style>
    .modal-background {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(20, 20, 20, 0.5);
        z-index: 2;
    }
    .modal {
        height: 500px;
        width: 400px;
        background-color: rgba(60, 60, 60, 1);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0 15px 0 15px;
    }
    .modal-title {
        margin: auto;
        width: 90%;
        text-align: center;
        margin-top: 10px;
        font-size: large;
        border-bottom-color: gray;
        border-bottom-width: 3px;
        border-bottom-style: solid;
        padding-bottom: 10px;
    }
    .close-modal {
        position: absolute;
        background-color: rgb(67, 67, 166);
        outline: none;
        border:none;
        height: 35px;
        width: 70px;
        border-radius: 0 15px 0 15px;
        bottom: 10px;   
        left: 50%;
        transform: translateX(-50%);
    }
    .close-modal:hover {
        background-color: rgba(67, 67, 166, 0.75);
        cursor: pointer;
    }
    .modal-content > :global(*) {
        width: 90%;
        margin: auto;
        margin-top: 10px;
    }
</style>