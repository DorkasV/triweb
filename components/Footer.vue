<template>
  <div>
    <b-img 
      center src="../assets/images/tri_footer.jpg"
      fluid alt="Footer"
      style="height:100px;"
    ></b-img>
    <footer id="sticky-footer" class="py-0 bg-dark text-white-50">
      <div class="container text-center">
        <small>Tristats &copy; Ikigai Team</small>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#sticky-footer {
  position: fixed;
  height: 20px;
  bottom: 0;
  width: 100%;
}
</style>
