<template>
    <div class="pageloader" :class="active ? 'is-active': ''"><span>Loading</span></div>
</template>

<script>
    export default {
        props: ['active']
    }
</script>

<style lang="scss" scoped>
    $pageloader-opacity: 1 !default;

    // keyframes mixin
    @mixin keyframes($name) {
        @-webkit-keyframes #{$name} {
            @content;
        }

        @-moz-keyframes #{$name} {
            @content;
        }

        @-o-keyframes #{$name} {
            @content;
        }

        @keyframes #{$name} {
            @content;
        }
    }

    .pageloader {
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0;
        padding-top: 2em;
        background: #00d1b2;
        background: rgba(#00d1b2, $pageloader-opacity);
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 5rem;
        z-index: 999998;
        transition: transform .35s ease-out,
        -webkit-transform .35s ease-out;
        will-change: transform;
        -webkit-transform: translateY(-100%);
        transform: translateY(-100%);

        &.is-active {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }

        &::after {
            position: absolute;
            top: 50%;
            left: 50%;
            display: block;
            border-radius: 100%;
            content: '';
            z-index: 9999;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            width: 0;
            height: 0;
            box-sizing: border-box;
            border: 0 solid #fff;
            -webkit-animation: loader-figure 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
            animation: loader-figure 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .title {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            margin: 2em 0 0 0;
            font-size: 0.875em;
            letter-spacing: 0.1em;
            line-height: 1.5em;
            color: #fff;
            white-space: nowrap;
        }

        @include keyframes(loader-figure) {
            0% {
                height: 0;
                width: 0;
                background-color: #fff;
            }

            29% {
                background-color: #fff;
            }

            30% {
                height: 2em;
                width: 2em;
                background-color: transparent;
                border-width: 1em;
                opacity: 1;
            }

            100% {
                height: 2em;
                width: 2em;
                border-width: 0;
                opacity: 0;
                background-color: transparent;
            }
        }
    }
</style>
