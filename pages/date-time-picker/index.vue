<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Date Time Picker</h2>
    <div class="date-time-picker">
      <Calendar
        id="calendar-timeonly"
        v-model="time"
        @today-click="todayClick"
        showButtonBar
        showIcon
        timeOnly
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
const breadcrumb = reactive([{ label: "Date Time Picker", to: "/date-time-picker" }]);

const time = ref(new Date());
const todayClick = (): void => {
  time.value = new Date();
};
</script>

<style lang="scss">
@import "date-time-picker";
</style>
