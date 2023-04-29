<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Поле Link</h2>
    <div class="web-link">
      <InputText
        v-model="url"
        type="text"
        class="web-link__input"
        placeholder="https://"
        @blur="inputBlurHandler('url')"
        v-if="!isTitle"
      />
      <InputText
        v-model="title"
        type="text"
        class="web-link__input"
        placeholder="Title"
        @blur="inputBlurHandler('title')"
        v-else="isTitle"
      />
      <ul class="web-link__list" v-if="links.length > 0">
        <li v-for="(link, idx) in links">
          <a
            class="link__url"
            :key="`${link}_${idx}`"
            :href="`https://${link.url}`"
            target="_blank"
            >{{ link.title }}</a
          >
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
  id: number;
  title: string;
}
type LinkType = "url" | "title";

const url = ref("");
const title = ref();
const isTitle = ref(false);
const breadcrumb = reactive([{ label: "Поле Link", to: "/input-link" }]);

const links = ref<ILink[]>([]);

const inputBlurHandler = (type: LinkType) => {
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
      url.value = "";
      isTitle.value = false;
    }
  }
};

const updateLink = (link: ILink) => {
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
