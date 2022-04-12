<nav>
    <a href="/">
        Home
    </a>
    <a href="/about">
        About
    </a>
    <a href="/contact">
        Contact
    </a>
</nav>

<head>
    <link rel="stylesheet" href="global.css">
</head>

<slot></slot>

<style>
    nav {
        position: absolute;
        width: 100%;
        left: 0%;
        top: 0%;
        height: fit-content;
        background-color: #3c3c3cde;
    }

    nav > a {
        text-align: center;
        height: 45px;
        min-width: 90px;
        display: inline-block;
        text-decoration: none;
        font-size: large;
        line-height: 45px;
    }
</style>