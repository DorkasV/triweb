<template>
  <div>
    <!-- <label for="entries_dpd">Show entries:</label> -->
    <select id="entries_dpd" select="" class="form-control" v-model="data">
      <option v-for="option in options" :key="option" :value="option">
        {{option}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: this.value,
    }
  },
  props: {
    value: {
      type: Number
    },
    options: {
      type: Array,
      default: () => ([10, 20, 50, 100])
    }
  },
  watch: {
    data(value) {
      this.$emit('input', value)
      this.$nextTick(() => {
        this.$emit('change')
      })
    }
  }
}
    //EXAMPLE
    // <v-show-entries v-model="perPage" @change="updateTable" style="margin-bottom: 10px;"></v-show-entries>
</script>
