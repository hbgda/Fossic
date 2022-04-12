<script lang="ts">
    export let title: string = "Title"
    export let itemHeight: string = "200px"
    export let maxRows: string = ""
    export let id: string = ""

    let sVarString = `
        --item-height: ${itemHeight}; 
        --list-height: ${maxRows != "" ? `calc(var(--item-height) * ${maxRows})` : ""}
    `

    export function setItems(items: Element[]): void {

    }
    export function addItem(item: Element): void {

    }

</script>

<div class="item-list" {id} style={sVarString}>
    <h class="title">{title}</h>
    <ul class="list">
        <slot>
            <p>No music.</p>
        </slot>
    </ul>
    <div class="bottom-fade">

    </div>
</div>

<style>
    .item-list > .title {
        font-size: x-large;
        display: none;
    }
    .item-list {
        margin: 15px;
        max-width: 90vw;
        width: 90vw;
        min-width: 565px;
        position: relative;
        -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
        mask-image: linear-gradient(to bottom, black 90%, transparent 100%);
    }
    .item-list > .list {
        overflow-y: scroll;
        column-gap: 10px;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: max-content;
        grid-auto-flow: column;
        scrollbar-width: thin;
        height: 100%;
        max-height: calc(100vh - 245px);
    }
    .item-list > .list > :global(*) {    
        display: inline-flex !important; 
        margin-bottom: 10px;
        margin-right: 10px;
    }
    .item-list > .bottom-fade {
        width: 100%;
        height: 40px;
        background-color:transparent;
        position: absolute;
        bottom: 0px;
    }
</style>