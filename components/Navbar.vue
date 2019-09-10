<template>
  <b-navbar toggleable="md">
    <b-navbar-toggle target="nav_collapse"/>
    <b-navbar-brand :to="{ name: 'index' }">Tristats</b-navbar-brand>
    <b-collapse id="nav_collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          v-for="i in items"
          :key="i.name"
          :to="{ name: i.name }">{{ i.title }}</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { name: 'athletes', title: 'Athletes' },
        { name: 'events', title: 'Events' },
        { name: 'results', title: 'Results' },
        { name: 'teams', title: 'Teams' },
      ]
    }
  }
}
</script>
