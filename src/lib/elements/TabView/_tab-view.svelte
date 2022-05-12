<script lang="ts">
    import { onMount } from "svelte";

    export let tabs: string[] = []
    export let selected: number = -1

    let content: HTMLDivElement = undefined

    let tabViews: Element[] = []

    export async function selectTab(index) {
        if(index == selected) return
        if(selected > -1) tabViews[selected].setAttribute("style", "")
        selected = index
        tabViews[selected].setAttribute("style", "display: block; z-index: 1;")
    }

    onMount(() => {
        for(let i = 0; i < content.children.length; i++) {
            tabViews.push(content.children.item(i))
        }
        selectTab(0)
    })  
</script>

<div class="tab-view">
    {#each tabs as tab, i}
        <button class="tab-nav {selected == i ? "active": ""}" on:click={() => selectTab(i)}>
            {tab}
        </button>
    {/each}
    <div class="tab-content" bind:this={content}>
        <slot>
            <p class="active">No content</p>
        </slot>
    </div>
</div>

<style>
    .tab-view {
        width: 100%;
        text-align: center;
        margin-top: 15px;
    }
    .tab-nav {
        background-color: transparent;
        border-color: transparent;
        border-bottom-color: #f8f8f8;
        font-size: large;
        opacity: .7;
        min-width: 115px;
        margin-right: 10px;
    }
    .tab-nav.active {
        opacity: 1;
        background-image: linear-gradient(to bottom, transparent, 60%, rgba(248, 248, 248, 0.4));
        background-repeat: no-repeat;
    }
    .tab-nav:hover {
        cursor: pointer;
        opacity: 1;
    }

    .tab-content {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    .tab-content > :global(*) {
        width: calc(100% - 65px) !important;
        transition: all .4s;
        position: absolute !important;
        z-index: -2;
        display: none;
        margin: 15px;
    }
</style>