<template>
  <div class="navigation-container">
    <nav>
      <ul>
        <li><nuxt-link to="/">Übersicht</nuxt-link></li>
        <li><nuxt-link to="/rechnung-anlegen">Rechnung Anlegen</nuxt-link></li>
        <li><nuxt-link to="/kunden-anlegen">Kunden Anlegen</nuxt-link></li>
        <div class="nav-items-right">
          <li><a @click.prevent="logOut">Ausloggen</a></li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
function logOut() {
  logout();
}

definePageMeta({
  middleware: "auth",
});
</script>
