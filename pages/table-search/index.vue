<template>
  <PageBreadcrumb :items="breadcrumb" />
  <div class="container">
    <h2 class="title">Таблица с поиском</h2>
    <div class="card">
      <DataTable :value="products" tableStyle="min-width: 50rem">
        <template #header>
          <div class="table-header">
            <div class="table-header__left">
              <Button icon="pi pi-sliders-v" class="btn-menu" @click="isMenuOpen = !isMenuOpen" />
              <ul v-if="isMenuOpen" class="menu">
                <li
                  v-for="(col, idx) in searchedCols"
                  :key="`${col}-${idx}`"
                  :class="{ active: index === idx }"
                  @click="handleMenuClick(col, idx)"
                >
                  {{ col }}
                </li>
              </ul>
              <form @submit.prevent.enter="searchHandler" class="flex w-full gap-1">
                <InputText type="search" v-model="search" placeholder="Поиск..." />

                <Button type="submit" label="Search" severity="primary" />
              </form>
            </div>
            <div class="table-header__right">
              <MultiSelect
                :modelValue="selectedCol"
                :options="cols"
                optionLabel="header"
                @update:modelValue="onToggle"
              />
            </div>
          </div>
        </template>
        <Column
          v-for="(col, idx) in selectedCol"
          :field="col.field"
          :header="col.header"
          :key="`${col.field}-${idx}`"
        >
          <template #body="slotProps" v-if="col.field === 'image'">
            <img
              :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
              :alt="slotProps.data.image"
              class="w-6rem shadow-2 border-round"
            />
          </template>
          <template #body="slotProps" v-if="col.field === 'price'">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
          <template #body="slotProps" v-if="col.field === 'reviews'">
            <div class="flex items-center gap-1">
              <span
                v-for="(_, i) in 5"
                :key="i"
                :class="i >= slotProps.data.rating ? 'pi-star' : 'pi-star-fill'"
                class="pi text-primary"
              ></span>
            </div>
          </template>
          <template #body="slotProps" v-if="col.field === 'status'">
            <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data)" />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, watch } from "vue";
import { ProductService } from "@/service/ProductService";

interface IProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  quantity: number;
  inventoryStatus: string;
  rating: number;
}

interface ICol {
  header: string;
  field: string;
}

type IFieldToSearch = "name" | "price" | "category" | "rating" | "inventoryStatus";

const products = ref<IProduct[]>();
const isMenuOpen = ref(false);
const index = ref(0);
const fieldToSearch = ref<IFieldToSearch>("name");
const search = ref("");

const cols = ref<ICol[]>([
  { header: "Name", field: "name" },
  { header: "Image", field: "image" },
  { header: "Price", field: "price" },
  { header: "Category", field: "category" },
  { header: "Reviews", field: "reviews" },
  { header: "Status", field: "status" },
]);

const searchedCols = ref<IFieldToSearch[]>([
  "name",
  "price",
  "category",
  "rating",
  "inventoryStatus",
]);

const selectedCol = ref<ICol[]>(cols.value);

const onToggle = (val: any) => {
  selectedCol.value = cols.value.filter((col: ICol) => val.includes(col));
};

const handleMenuClick = (field: IFieldToSearch, idx: number) => {
  index.value = idx;
  isMenuOpen.value = false;
  fieldToSearch.value = field;
};

const searchHandler = () => {
  if (search.value) {
    products.value = products.value?.filter((product: IProduct) =>
      product[fieldToSearch.value].toString().toLowerCase().includes(search.value.toLowerCase())
    );
  } else {
    renderProducts();
  }
};

watch(
  () => search.value,
  (val) => {
    if (!val) {
      renderProducts();
    }
  }
);

const formatCurrency = (value: number) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const getSeverity = (product: IProduct): string => {
  switch (product.inventoryStatus) {
    case "INSTOCK":
      return "success";

    case "LOWSTOCK":
      return "warning";

    case "OUTOFSTOCK":
      return "danger";

    default:
      return "";
  }
};

const renderProducts = async (): Promise<void> => {
  products.value = await ProductService.getProductsMini();
};

const clickOutside = (): void => {
  document.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLElement;

    if (!target.closest(".menu") && !target.closest(".btn-menu")) {
      isMenuOpen.value = false;
    }
  });
};

const breadcrumb = reactive([{ label: "Таблица с поиском", to: "/table-search" }]);

onMounted(async () => {
  await renderProducts();
  clickOutside();
});
</script>

<style lang="scss">
@import "table-search";
</style>
