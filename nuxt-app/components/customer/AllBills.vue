<template>
  <div>
    <h1>Rechnungskartei</h1>
    <div class="billcard-wrapper">
      <div v-for="bill in bills" class="billcard-container">
        <div class="billcard-header">
          <div>
            <h3>{{ bill.rechnungsdatum }}</h3>
            <h2>{{ bill.kundenname }}</h2>
          </div>
          <h3 id="rechnungsbetrag">{{ bill.rechnungsbetrag }}€</h3>
        </div>
        <hr />
        <div class="billcard-body">
          <p>{{ bill.rechnungsleistung }}</p>
        </div>
        <div class="billcard-button-wrapper">
          <button class="billcard-button">Rechnung anzeigen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//rechnungs kacheln mit name betrag und datum
const strapiClient = useStrapiClient();
let bills = ref({});

const getBillData = async () => {
  let billsDataResponse = {};
  let sortedBillData = [{}];
  try {
    await strapiClient("/bills", { method: "GET" })
      .then((response) => response)
      .then((data) => (billsDataResponse = data));
  } catch (error) {
    console.log(error);
  }

  for (let i = 0; i < billsDataResponse.data.length; i++) {
    sortedBillData.push(billsDataResponse.data[i].attributes);
  }
  bills.value = sortedBillData;
};

onMounted(() => {
  getBillData();
});
</script>

<style scoped>
h1 {
  margin-left: 1em;
}
</style>
