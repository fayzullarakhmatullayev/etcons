<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Многострочный текст в ячейке</h2>
    <div class="multi-text">
      <DataTable :value="data">
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface IText {
  time: string;
  text: string;
}
import { reactive, ref } from "vue";
import { TableText } from "@/service/TableText";

const breadcrumb = reactive([{ label: "Многострочный текст в ячейке", to: "/multi-text" }]);
const data = ref<IText[]>([]);

const columns = [
  { field: "time", header: "Время" },
  { field: "text", header: "Текст" },
];

const prepareText = (): void => {
  const text = TableText.text.split("[");

  data.value = text
    .map((item: string) => {
      const time = `[${item.slice(0, 8)}]`;
      const text = item.slice(9).trim();
      return { time, text };
    })
    .filter((item: IText) => item.text !== "" || item.text !== "");
};

onMounted(prepareText);
</script>

<style lang="scss">
@import "multi-text";
</style>
