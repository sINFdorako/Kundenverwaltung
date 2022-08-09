<template>
    <div>
        <LayoutNavbar v-if="user"/>
        <slot />
    </div>
</template>

<script setup lang="ts">
 const user = useStrapiUser()
</script>