<template>
  <div class="customer-container">
    <h1>Kundenkartei</h1>
    <table class="customer-table">
      <tr>
        <th>Vorname</th>
        <th>Nachname</th>
        <th>Straße</th>
        <th>Postleitzahl</th>
        <th>Ort</th>
      </tr>
      <tr v-for="customer in customers">
        <td v-if="customer.vorname">{{ customer.vorname }}</td>
        <td v-if="customer.nachname">{{ customer.nachname }}</td>
        <td v-if="customer.strasse">{{ customer.strasse }}</td>
        <td v-if="customer.postleitzahl">{{ customer.postleitzahl }}</td>
        <td v-if="customer.wohnort">{{ customer.wohnort }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
const strapiClient = useStrapiClient();
let customers = ref({});

const getCustomers = async () => {
  let customersResponse = {};
  let sortedCustomers = [{}];

  await strapiClient("/customers", { method: "GET" })
    .then((response) => response)
    .then((data) => (customersResponse = data));

  for (let i = 0; i < customersResponse.data.length; i++) {
    sortedCustomers.push(customersResponse.data[i].attributes);
  }
  customers.value = sortedCustomers;
};

onMounted(() => {
  getCustomers();
});
</script>

<style scoped>
h1 {
  margin-left: 1em;
}
</style>
