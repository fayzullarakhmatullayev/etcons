<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Date Time Picker</h2>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const breadcrumb = reactive([{ label: "Date Time Picker", to: "/date-time-picker" }]);
</script>

<style lang="scss">
@import "date-time-picker";
</style>
