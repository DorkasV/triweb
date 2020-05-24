<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col md="4" offset-md="4">
          <b-card
            title="Duomenų įvedimas"
            img-src="https://picsum.photos/600/300/?image=1077"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
          >
            <b-card-text>
              Užregistruok savo triatlono rezultatą!
            </b-card-text>
            <b-button href="https://docs.google.com/forms/d/e/1FAIpQLSdPT_lRe9ElweK_j6TO2gxTY1Rcgb2FWtl6_JFH2hqED127zw/viewform?fbzx=5557622822347829040&fbclid=IwAR2cz3KAU--imuSHBgMzNtIXDw2PT9MP50MVTFyQsyXN_RQUkoPZEPwiNb8" variant="primary">Registracija</b-button>
            <b-button href="http://shorturl.at/avLQ3" variant="info">Taisyklės</b-button>
          </b-card>
        </b-col>
      </b-row>
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
