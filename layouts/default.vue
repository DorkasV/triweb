<template>
  <div>
    <navbar/>
    <div class="container-fluid">
      <nuxt />
    </div>
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
