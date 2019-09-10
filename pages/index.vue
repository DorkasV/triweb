<template>
  <div id="app">
    <b-container>
      <b-card-group deck>
        <b-card no-body
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 cardClass"
        >
          <router-link :to="{name: 'athletes'}" tag="li">
            <b-card-body>
              Athletes
            </b-card-body>
          </router-link>
        </b-card>
        <b-card no-body
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 cardClass"
        >
          <router-link :to="{name: 'events'}" tag="li">
            <b-card-body>
              Events
            </b-card-body>
          </router-link>
        </b-card>
        <b-card no-body
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 cardClass"
        >
          <router-link :to="{name: 'results'}" tag="li">
            <b-card-body>
              Results
            </b-card-body>
          </router-link>
        </b-card>
        <b-card no-body
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2 cardClass"
        >
          <router-link :to="{name: 'teams'}" tag="li">
            <b-card-body>
              Teams
            </b-card-body>
          </router-link>
        </b-card>
      </b-card-group>
    </b-container>
    <!-- <b-container fluid> -->
      <router-view></router-view>
    <!-- </b-container> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
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

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.cardClass {
  cursor: pointer;
}
</style>
