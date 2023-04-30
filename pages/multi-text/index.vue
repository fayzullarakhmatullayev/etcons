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
import axios from "axios";
const breadcrumb = reactive([{ label: "Многострочный текст в ячейке", to: "/multi-text" }]);
const data = ref<IText[]>([]);

const columns = [
  { field: "time", header: "Время" },
  { field: "text", header: "Текст" },
];

const fetchText = async (): Promise<void> => {
  try {
    const response = await axios.get("text.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const text = response.data.text.split("[");

    data.value = text
      .map((item: string) => {
        const time = `[${item.slice(0, 8)}]`;
        const text = item.slice(9).trim();
        return { time, text };
      })
      .filter((item: IText) => item.text !== "" || item.text !== "");
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchText();
});
</script>

<style lang="scss">
@import "multi-text";
</style>
