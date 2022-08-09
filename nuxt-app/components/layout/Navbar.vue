<template>
  <div class="navigation-container">
    <nav>
      <ul>
        <li><nuxt-link to="/">Start</nuxt-link></li>
        <li><nuxt-link to="/rechnungen">Rechnungen</nuxt-link></li>
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
