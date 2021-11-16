<template lang="pug">
  .notfound__container
    .notfound__wrap
      img.notfound__img(src="https://i.ibb.co/44YyrkC/yoda.png" alt="картинка с магистром Йодой")
      span.notfound__message Страница не найдена 404
    .notfound__desc
      h1.notfound__title Страницу не эту желаешь увидеть ты!
      p.notfound__text
        |Адрес неверный похоже введен. Ниже на кнопку нажми и на&nbsp;
        span.notfound__span светлую сторону
        |&nbsp;страницу главную вернись
      button-hover(tag="button" type="button" variant="white" :to="{name: 'Login'}")  Вернуться на главную страницу

</template>

<script>
export default {
  name: "NotFound"
}
</script>

<style scoped>

</style>
