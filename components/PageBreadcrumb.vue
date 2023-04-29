<template>
  <Breadcrumb :home="home" :model="items" aria-label="home" />
</template>

<script lang="ts" setup>
import { ref } from "vue";
interface ILink {
  label: string;
  to: string;
  icon?: string;
}
defineProps({
  items: {
    type: Array as PropType<ILink[]>,
    default: () => [],
  },
});
const home = ref({
  icon: "pi pi-home",
  to: "/",
});
</script>
