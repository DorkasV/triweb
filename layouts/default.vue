<template>
  <div>
    <navbar/>
    <div class="container-fluid">
      <nuxt />
    </div>
    <v-footer/>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>
