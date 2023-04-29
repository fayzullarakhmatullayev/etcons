<template>
  <div class="container">
    <div class="home">
      <h2 class="title">тестовое задание</h2>
      <div class="links">
        <Button label="Primary"><NuxtLink to="/input-link">Поле Link</NuxtLink></Button>
        <Button label="Primary"
          ><NuxtLink to="/date-time-picker">Date Time Picker</NuxtLink></Button
        >
        <Button label="Primary"
          ><NuxtLink to="/reset-select">Сброс значений в Select</NuxtLink></Button
        >
        <Button label="Primary"
          ><NuxtLink to="/multi-text">Многострочный текст в ячейке</NuxtLink></Button
        >
        <Button label="Primary"><NuxtLink to="/table-search">Таблица с поиском</NuxtLink></Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    button {
      max-width: 400px;
      width: 100%;
      a {
        width: 100%;
        display: block;
        text-align: center;
        font-size: 20px;
        color: #fff;
        text-transform: uppercase;
        text-decoration: none;
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>
