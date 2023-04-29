<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Date Time Picker</h2>
    <Calendar id="calendar-timeonly" v-model="time" showIcon timeOnly />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
const breadcrumb = reactive([{ label: "Date Time Picker", to: "/date-time-picker" }]);

const time = ref(new Date());
</script>

<style lang="scss">
@import "date-time-picker";
</style>
