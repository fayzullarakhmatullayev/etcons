<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container"></div>
  <h2 class="title">Поле Link</h2>
  <div class="web-link">
    <InputText
      v-model="value"
      type="text"
      class="web-link__input"
      placeholder="https://"
      @blur="inputBlurHandler"
    />
    <ul class="web-link__list" v-if="links.length > 0">
      <li v-for="(link, idx) in links">
        <a
          class="link__url"
          :key="`${link}_${idx}`"
          :href="`https://${link.url}`"
          target="_blank"
          >{{ link.url }}</a
        >
        <Button @click="clickHandler(link)" icon="pi pi-pencil"></Button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

interface ILink {
  url: string;
  id: number;
  title: string;
}
const value = ref("");
const breadcrumb = reactive([{ label: "Поле Link", to: "/input-link" }]);

const links = ref<ILink[]>([]);

const inputBlurHandler = () => {
  if (value.value) {
    links.value.push({ url: value.value, id: Date.now(), title: value.value });
    value.value = "";
  }
};

const clickHandler = (link: ILink) => {
  console.log(link);
};
</script>

<style lang="scss">
@import "input-link";
</style>
