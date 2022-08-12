<template>
  <div class="formkit-container">
    <FormKit
      type="form"
      v-model="form"
      submit-label="Rechnung Anlegen"
      @submit="onSubmit"
    >
      <h1>Neue Rechnung Anlegen</h1>
      <hr />
      <div class="form-grid">
        <FormKit
          type="select"
          name="flavor"
          label="Kunden Auswählen"
          validation="required"
          :options="{
            bbq: 'Wolfram',
            pickle: 'Petra',
          }"
        />
        <FormKit type="text" name="rechnungsbetrag" label="Rechnungsbetrag" />
      </div>
      <div class="form-grid">
        <FormKit
          type="select"
          name="flavor"
          label="Abrechnungszeitraum Auswählen"
          validation="required"
          :options="{
            bbq: 'Einamlig',
            pickle: 'Monatlich',
            last: 'Jährlich',
          }"
        />
        <FormKit type="date" name="rechnungsdatum" label="Rechnungsdatum" />
      </div>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
//generate random bill number

const form = ref({});
const strapiClient = useStrapiClient();

let bill = {
  data: {
    rechnungsname: "",
  },
};

async function onSubmit() {
  try {
    bill.data.rechnungsname = form.value.billname;
    await strapiClient("/bills", { method: "POST", body: bill });
  } catch (e) {
    console.log(e);
  }
}
</script>
