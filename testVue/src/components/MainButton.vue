<script>
export default {

}
</script>

<template>
    <button class="mainButton" @click="$emit('button-click')">
        <slot></slot>
    </button>
</template>

<style>
    .mainButton { position: relative; z-index: 2;background: gray;display: inline-block;overflow: hidden;padding: 14px 40px;cursor: pointer;transition: all 0.6s cubic-bezier(0.77, 0, 0.175, 1);text-align: center;white-space: nowrap;letter-spacing: 1px;text-transform: uppercase;color: #ffffff;border: 1px solid #ffffff;box-shadow: none;font-size: 15px;line-height: 1.2;backdrop-filter: blur(5px); }
</style>