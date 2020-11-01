<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/dash">Dashboard</router-link> |
    <router-link to="/routes">Routes</router-link> |
    <router-link to="/bank">Bank</router-link>
    <br />
    <span v-if="cycle">
      Week: {{cycle}} |
      Next Update Near {{nextCycleTime.toString()}}
    </span>
  </div>
  <router-view />
</template>

<script>
// @ is an alias to /src

export default {
  name: 'App',
  components: {
  },
  data (){
    return {
      // later the website gives you this.  Right now add these to .env.local
      playerid: process.env.VUE_APP_PLAYER_ID, 
      token: process.env.VUE_APP_TOKEN,
      cycle: null,
      fraction: null,
      cycleDurationEstimation: null,
      timeLeft: null,
      nextCycleTime: null
    }
  },
  watch: {
  },
  mounted() {
    // document.cookie = `PLAY_SESSION=${this.token}`;
    const ws = new WebSocket(`ws://${location.host}/wsWithActor`);
    ws.onopen = () => {
      if (ws.readyState === 1) {ws.send(this.playerid)}
    }
    ws.onmessage = (data) => {
      let rdata = JSON.parse(data.data);
      // console.log(rdata);
      if (rdata.messageType == "cycleInfo"){
        this.cycle = rdata.cycle;
        this.fraction = rdata.fraction;
        this.cycleDurationEstimation = rdata.cycleDurationEstimation;
        this.timeLeft = ((rdata.cycleDurationEstimation * (1 - rdata.fraction)))
        this.nextCycleTime = new Date(Date.now() + this.timeLeft)
      }
    }
  }
} 
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
