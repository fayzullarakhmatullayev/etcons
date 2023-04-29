<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Сброс значений в Select</h2>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const breadcrumb = reactive([{ label: "Сброс значений в Select", to: "/reset-select" }]);
</script>

<style lang="scss">
@import "reset-select";
</style>
