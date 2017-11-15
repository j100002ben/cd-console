<template>
  <span class="mdl-layout-title">
    <router-link v-if="!!link && link.lastPage !== true" class="mdl-button mdl-js-button" v-bind="link" v-html="link.html"></router-link>
    <button v-else-if="!!link && link.lastPage === true" @click="lastPage" class="mdl-button mdl-js-button" v-bind="link" v-html="link.html"></button>
    {{ title }}
  </span>
</template>

<script>
export default {
  name: 'PageTitle',
  props: ['title', 'link'],
  methods: {
    lastPage () {
      this.$router.go(-1)
    }
  }
}
</script>
