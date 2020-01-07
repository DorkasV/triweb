<template>
  <b-navbar toggleable="md" type="light" variant="light">
    <b-navbar-toggle target="nav_collapse"/>
    <b-navbar-brand :to="{ name: 'index' }">
      <b-img fluid src="../assets/images/tri_logo.jpg" alt="Logo" style="height:50px;"></b-img>
    </b-navbar-brand>
    <b-collapse id="nav_collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item
          v-for="i in items"
          :key="i.name"
          :to="{ name: i.name }"><font-awesome-icon :icon="i.icon" /> {{ i.title }}</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { name: 'athletes', title: 'Athletes', icon: 'address-card' },
        { name: 'events', title: 'Events', icon: 'calendar-alt' },
        { name: 'results', title: 'Results', icon: 'clipboard-list' },
        { name: 'teams', title: 'Teams', icon: 'users' },
        { name: 'results', title: 'Best Results', icon: 'trophy' }
      ]
    }
  }
}
</script>
