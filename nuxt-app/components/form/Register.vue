<template>
  <div class="formkit-container">
    <FormKit
      type="form"
      v-model="formData"
      id="registration-example"
      :form-class="submitted ? 'hide' : 'show'"
      submit-label="Registrieren"
      @submit="onSubmit"
      :actions="false"
      #default="{ value }"
    >
      <h1>Registrieren</h1>
      <hr />
      <div class="form-grid">
        <FormKit
          type="text"
          name="name"
          label="Dein Name"
          placeholder="Jane Doe"
          validation="required"
        />
        <FormKit
          type="text"
          name="email"
          label="Deine E-Mail"
          placeholder="jane@example.com"
          validation="required|email"
        />
      </div>
      <div class="form-grid double">
        <FormKit
          type="password"
          name="password"
          label="Passwort"
          validation="required|length:6|matches:/[^a-zA-Z]/"
          :validation-messages="{
            matches: 'Please include at least one symbol',
          }"
          placeholder="Your password"
        />
        <FormKit
          type="password"
          name="password_confirm"
          label="Passwort Bestätigen"
          placeholder="Confirm password"
          validation="required|confirm"
        />
      </div>
      <FormKit type="submit" label="Registrieren" />
      <br>
      <p>
        <span><nuxt-link style="text-decoration: none;" to="/login">Einloggen</nuxt-link></span>
      </p>
    </FormKit>
    <div v-if="submitted">
      <h2>Submission successful!</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const submitted = ref(false);
const { register } = useStrapiAuth();
const router = useRouter();
const formData = ref({});

const onSubmit = async () => {
  try {
    await register({
      username: formData.value.name,
      email: formData.value.email,
      password: formData.value.password,
    });
    router.push("/index");
  } catch (e) {
    console.log(e);
  }
};
</script>
