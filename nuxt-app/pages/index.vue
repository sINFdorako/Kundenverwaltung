<template>
  <div class="main-page-container">
    <h1>Willkommen {{ user?.username }}</h1>
    <div>
      <nuxt-link> Meine Rechnungen</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/kunden">Meine Kunden</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useStrapiUser();
console.log(user);
</script>
