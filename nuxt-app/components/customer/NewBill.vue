<template>
  <div class="formkit-container">
    <FormKit
      type="form"
      v-model="form"
      submit-label="Rechnung Anlegen"
      @submit="onSubmit"
      v-if="!completed"
    >
      <h1>Neue Rechnung Anlegen</h1>
      <hr />
      <div class="form-grid">
        <div>
          <label for="customer">Kunden Auswählen</label>
          <select v-model="kundenname" name="kundenname">
            <option v-for="customerName in customersNames">
              <span v-if="customerName.vorname && customerName.nachname">
                {{ customerName.vorname }} {{ customerName.nachname }}
              </span>
            </option>
          </select>
        </div>
        <FormKit
          type="number"
          name="rechnungsbetrag"
          label="Rechnungsbetrag in €"
        />
      </div>
      <div class="form-grid">
        <FormKit
          type="select"
          name="abrechnungszeitraum"
          label="Abrechnungszeitraum Auswählen"
          validation="required"
          :options="['Einmalig', 'Monatlich', 'Jährlich']"
        />
        <FormKit type="date" name="rechnungsdatum" label="Rechnungsdatum" />
      </div>
      <FormKit
        type="textarea"
        rows="5"
        name="rechnungsleistung"
        label="Rechnungsleistung"
      />
    </FormKit>
    <div v-else>
      <div class="success-container">
        <img
          class="check-solid-icon"
          src="../../assets/icons/check-solid.svg"
          alt="check-solid"
        />
        <h2>Die Rechnung wurde erfolgreich erstellt.</h2>
      </div>
      <nuxt-link to="/">Zurück zur Übersicht</nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">  
const strapiClient = useStrapiClient();
const kundenname = ref();
let completed = ref(false);
const form = ref({});
let customersNames = ref([]);
const getCustomers = async () => {
  let customersResponse = {};
  let sortedCustomersNames = [{}];

  await strapiClient("/customers", { method: "GET" })
    .then((response) => response)
    .then((data) => (customersResponse = data));

  for (let i = 0; i < customersResponse.data.length; i++) {
    sortedCustomersNames.push(customersResponse.data[i].attributes);
  }
  customersNames.value = sortedCustomersNames;
};

async function onSubmit() {
  let bill = {
    data: {
      kundenname: "",
      rechnungsbetrag: "",
      abrechnungszeitraum: "",
      rechnungsdatum: "",
      rechnungsleistung: "",
    },
  };
  try {
    bill.data.kundenname = kundenname.value;
    bill.data.rechnungsbetrag = form.value.rechnungsbetrag;
    bill.data.abrechnungszeitraum = form.value.abrechnungszeitraum;
    bill.data.rechnungsdatum = form.value.rechnungsdatum;
    bill.data.rechnungsleistung = form.value.rechnungsleistung;
    await strapiClient("/bills", { method: "POST", body: bill });
    completed.value = true;
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  getCustomers();
});
</script>
