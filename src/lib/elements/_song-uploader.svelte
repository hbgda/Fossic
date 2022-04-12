<script lang="ts">
    let progress: string = "0"
    let status: string = "0%"
    let loaded_total: string = "Uploaded 0 / 0 bytes."
    let files
    let uploadForm
    let uploadResponse

    import { createEventDispatcher } from "svelte/internal";
    const dispatch = createEventDispatcher()

    function upload(event) {
        if(!files) return
        
        let file = files[0]
        console.log(file)

        console.log(uploadForm)

        let formdata = new FormData(uploadForm)
        let xhr = new XMLHttpRequest()
        xhr.upload.addEventListener("progress", (e) => {
            console.log(e.loaded)
            let percent = Math.round((e.loaded / e.total) * 100)
            progress = `${percent}`
            loaded_total = `Uploaded ${e.loaded} / ${e.total} bytes.`
            status = `${percent}%`
        })
        xhr.addEventListener("load", (e) => {
            let res = JSON.parse(e.target.response)
            console.log(res)
            progress = "100"
            uploadResponse = res
            dispatch("finished", res)
            
        })
        xhr.addEventListener("error", (e) => {
            status = "Upload Failed."
        })
        xhr.addEventListener("abort", (e) => {
            status = "Upload Aborted."
        })
        xhr.open("POST", "http://127.0.0.1:3001/upload")
        xhr.send(formdata)
    }
</script>

<div>
    <form bind:this={uploadForm} action="/upload" method="post" id="file-upload-form" enctype="multipart/form-data">
        <label for="song-upload">Choose a song:</label>
        <br>
        <input bind:files accept="audio/*" type="file" name="song-upload" id="song-upload">
    </form>
    <button on:click={upload}>
        Upload
    </button>
    <progress value={progress} max="100"></progress>
    <h3>{status}</h3>
    <p>{loaded_total}</p>
    {#if uploadResponse != undefined}
        <div class="preview">
            <img class="preview-img" src={uploadResponse.image} alt="">
            <p class="preview-title">{uploadResponse.title}</p>
            <p class="preview-author">{uploadResponse.author}</p>
        </div>
    {/if}
</div>

<style>
    div {
        width: 100%;
    }
    button {
        margin: auto;
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: rgb(67, 67, 166);
        outline: none;
        border:none;
        height: 20px;
        width: 70px;
        border-radius: 0 15px 0 15px;
        display: block;
    }
    progress {
        display: block;
        margin: auto;
        width: 90%;
        margin-bottom: 0;
    }
    h3 {
        display: inline-block;
        font-size: medium;
        margin: 0;
    }
    p {
        margin: 0;
        display: inline-block;
        text-align: right;
        width: 80%;
        margin-right: 0;
        float: right;
    }

    .preview {
        width: 100%;
        margin-top: 40px;
        text-align: center;
    }

    .preview-img {
        margin: auto;
        height: 100px;
    }

    .preview-title {
        width: 100%;
        float: none;
        text-align: center;
        display: block;
    }
    .preview-author {
        width: 100%;
        text-align: center;
        font-size: small;
        opacity: 70%;
        display: block;
        float: none;
    }
</style>