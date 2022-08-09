<template>
<div class="formkit-container">
    <FormKit
      type="form"
      v-model="formData"
      id="registration-example"
      submit-label="Registrieren"
      @submit="handleSubmit"
      :actions="false"
      #default="{ value }"
    >
      <h1>Rechnung Speichern</h1>
      <hr />
      <FormKit
        type="text"
        name="billname"
        label="Rechnungsname"
        placeholder="rechnung_mayer"
      />
      <FormKit
        type="file"
        name="billpdf"
        label="PDF Rechnung hochladen"
      />
      <!-- <input type="file" name="upload" accept="application/pdf" /> -->
      <FormKit type="submit" label="Rechnung Speichern" />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
const formData = ref({});
const user = await useStrapiUser().value;
const { create } = useStrapi4();

const BillObj = {
  billname: "",
  billpdf: "",
};

const handleSubmit = async () => {
    BillObj.billname = formData.value.billname
    BillObj.billpdf = formData.value.billpdf
  try {
    await create("bills", { bill: {rechnungsname: BillObj.billname, pdf: BillObj.billpdf}, user: user.id });
    console.log(BillObj)
  } catch (error) {
    console.log(error);     
  }
};
</script>