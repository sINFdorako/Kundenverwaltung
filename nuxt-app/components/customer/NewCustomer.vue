<template>
  <div class="formkit-container">
    <FormKit
      v-if="!complete"
      type="form"
      v-model="form"
      submit-label="Kunden Anlegen"
      @submit="onSubmit"
    >
      <h1>Neuen Kunden Anlegen</h1>
      <br />
      <h2>Kundenname</h2>
      <hr />
      <div class="form-grid">
        <FormKit
          type="text"
          name="prename"
          label="Vorname"
          placeholder="Vorname"
        />
        <FormKit
          type="text"
          name="surname"
          label="Nachname"
          placeholder="Nachname"
        />
      </div>
      <h2>Kundenadresse</h2>
      <hr />
      <div class="form-grid">
        <FormKit
          type="text"
          name="street"
          label="Straße"
          placeholder="Straße"
        />
        <FormKit
          type="number"
          name="postcode"
          label="Postleitzahl"
          placeholder="Postleitzahl"
        />
      </div>
      <FormKit type="text" name="city" label="Ort" placeholder="Ort" />
    </FormKit>
    <div v-else>
      <div class="success-container">
        <img
          class="check-solid-icon"
          src="../../assets/icons/check-solid.svg"
          alt="check-solid"
        />
        <h2>Der Kunde wurde erfolgreich angelegt.</h2>
      </div>
      <nuxt-link to="/">Zurück zur Übersicht</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
//generate random customer number
const form = ref({});
const strapiClient = useStrapiClient();
let complete = ref(false);

let customer = {
  data: {
    vorname: "",
    nachname: "",
    strasse: "",
    postleitzahl: "",
    wohnort: "",
  },
};

async function onSubmit() {
  try {
    customer.data.vorname = form.value.prename;
    customer.data.nachname = form.value.surname;
    customer.data.strasse = form.value.street;
    customer.data.postleitzahl = form.value.postcode;
    customer.data.wohnort = form.value.city;
    await strapiClient("/customers", { method: "POST", body: customer });
    complete.value = true;
  } catch (e) {
    console.log(e);
  }
}
</script>
