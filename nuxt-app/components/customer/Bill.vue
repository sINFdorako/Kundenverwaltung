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
        <div>
          <label for="customer">Kunden Auswählen</label>
          <select name="customer">
            <option v-for="customerName in customersNames">
              <span v-if="customerName.vorname && customerName.nachname">
                {{ customerName.vorname }} {{ customerName.nachname }}
              </span
              >
            </option>
          </select>
        </div>
        <FormKit type="text" name="rechnungsbetrag" label="Rechnungsbetrag in €" />
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
const strapiClient = useStrapiClient();
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
  console.log(customersNames.value);
};

async function onSubmit() {
  let bill = {
    data: {
      rechnungsname: "",
    },
  };
  try {
    bill.data.rechnungsname = form.value.billname;
    await strapiClient("/bills", { method: "POST", body: bill });
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  getCustomers();
});
</script>
