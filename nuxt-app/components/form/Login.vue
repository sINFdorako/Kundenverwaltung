<template>
  <div class="formkit-container">
    <FormKit
      type="form"
      v-model="formData"
      id="registration-example"
      submit-label="Registrieren"
      @submit="onSubmit"
      :actions="false"
      #default="{ value }"
    >
      <h1>Einloggen</h1>
      <hr />
      <FormKit
        type="text"
        name="email"
        label="Deine E-Mail"
        placeholder="jane@example.com"
        validation="required|email"
      />
      <FormKit
        type="password"
        name="password"
        label="Passwort"
        placeholder="Your password"
      />
      <FormKit type="submit" label="Einloggen" />
      <br>
      <p>
        <span><nuxt-link style="text-decoration: none;" to="/register">Registrieren</nuxt-link></span>
      </p>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
const { login } = useStrapiAuth();
const router = useRouter();

const formData = ref({});
const onSubmit = async () => {
  try {
    await login({
      identifier: formData.value.email,
      password: formData.value.password,
    });
    router.push("/");
  } catch (e) {}
};
</script>
