<template>
  <div class="main-page-container">
    <h1>Willkommen {{ user?.username }}</h1>
    <div>
      Meine Rechnungen
    </div>
    <div>
      Meine Kunden
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useStrapiUser();
console.log(user);
</script>
