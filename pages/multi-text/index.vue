<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Многострочный текст в ячейке</h2>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const breadcrumb = reactive([{ label: "Многострочный текст в ячейке", to: "/multi-text" }]);
</script>

<style lang="scss">
@import "multi-text";
</style>
