<script lang="ts">
    export let title: string = "Title"
    export let itemHeight: string = "200px"
    export let maxRows: string = ""
    export let id: string = ""

    export let defaultStr: string = ""

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
            <p>{defaultStr}</p>
        </slot>
    </ul>
</div>

<style>
    .item-list > .title {
        font-size: x-large;
    }
    .item-list {
        margin: 15px;
        width: calc(100% - 45px);
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
        padding: 0;
        max-height: calc(100vh - 215px);
        text-align: center;
        margin: auto;
    }
    .item-list > .list > :global(*) {    
        display: inline-flex !important; 
        margin-bottom: 10px;
        margin-right: 10px;
    }
</style>