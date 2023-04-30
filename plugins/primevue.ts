import { defineNuxtPlugin } from "#app";
import locale from "~/locale";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import Breadcrumb from "primevue/breadcrumb";
import Calendar from "primevue/calendar";
import MultiSelect from "primevue/multiselect";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, {
    ripple: true,
    locale,
  });
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("InputMask", InputMask);
  nuxtApp.vueApp.component("Breadcrumb", Breadcrumb);
  nuxtApp.vueApp.component("Calendar", Calendar);
  nuxtApp.vueApp.component("MultiSelect", MultiSelect);
});
