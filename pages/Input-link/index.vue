<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Поле Link</h2>
    <div class="web-link">
      <label v-if="!isTitle"
        ><p>URL</p>
        <InputText
          v-model="url"
          type="text"
          class="web-link__input"
          placeholder="https://"
          @blur="inputBlurHandler('url')"
        />
      </label>
      <label v-else="isTitle">
        <p>Title</p>
        <InputText
          v-model="title"
          type="text"
          class="web-link__input"
          placeholder="Title"
          @blur="inputBlurHandler('title')"
        />
      </label>
      <ul class="web-link__list" v-if="links.length > 0">
        <li v-for="link in links">
          <a class="link__url" :key="link.id" :href="link.url" target="_blank">{{ link.title }}</a>
          <Button @click="updateLink(link)" icon="pi pi-pencil"></Button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";

interface ILink {
  url: string;
  title: string;
  id: number;
}
type LinkType = "url" | "title";

const url = ref("https://");
const title = ref("");
const isTitle = ref(false);
const breadcrumb = reactive([{ label: "Поле Link", to: "/input-link" }]);

const links = ref<ILink[]>([]);

const inputBlurHandler = (type: LinkType): void => {
  if (type === "url") {
    if (url.value) {
      isTitle.value = true;
    }
  } else {
    if (title.value) {
      links.value.push({
        url: url.value,
        id: Date.now(),
        title: title.value,
      });
      title.value = "";
      url.value = "https://";
      isTitle.value = false;
    }
  }
};

const updateLink = (link: ILink): void => {
  isTitle.value = false;
  if (link) {
    url.value = link.url;
    title.value = link.title;
    links.value = links.value.filter((l) => l.id !== link.id);
  }
};
</script>

<style lang="scss">
@import "input-link";
</style>
