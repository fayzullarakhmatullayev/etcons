<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Сброс значений в Select</h2>
    <div class="reset-select">
      <MultiSelect
        v-model="selectedItems"
        :options="items"
        optionLabel="label"
        optionValue="value"
        :virtualScrollerOptions="{ itemSize: 44 }"
        placeholder="Выберите элемент"
        :showToggleAll="false"
      />
      <Button v-if="selectedItems.length > 0" icon="pi pi-times" @click="clearHandler" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const breadcrumb = reactive([{ label: "Сброс значений в Select", to: "/reset-select" }]);

const selectedItems = ref([]);
const items = ref(Array.from({ length: 50 }, (_, i) => ({ label: `элемент #${i}`, value: i })));

const clearHandler = (): void => {
  selectedItems.value = [];
};
</script>

<style lang="scss">
@import "reset-select";
</style>
