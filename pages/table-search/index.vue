<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Таблица с поиском</h2>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const breadcrumb = reactive([{ label: "Таблица с поиском", to: "/table-search" }]);
</script>

<style lang="scss">
@import "table-search";
</style>
