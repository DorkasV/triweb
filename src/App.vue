<template>
  <div id="app">
    <router-link :to="{name: 'Athletes'}" tag="li">
      <a>
        <i class="fa fa-users" />
        <span>Athletes</span>
        <span class="pull-right-container" />
      </a>
    </router-link>
    <router-link :to="{name: 'Events'}" tag="li">
      <a>
        <i class="fa fa-users" />
        <span>Events</span>
        <span class="pull-right-container" />
      </a>
    </router-link>
    <router-link :to="{name: 'Results'}" tag="li">
      <a>
        <i class="fa fa-users" />
        <span>Results</span>
        <span class="pull-right-container" />
      </a>
    </router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
