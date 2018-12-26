<template>
  <div>
    test
    호출 해보자
    <button @click="getNotification">호출</button>

    <p v-for="message in messages" :key="message.idString">{{ message.message }}</p>
  </div>
</template>
<script>
let msgServer
export default {
  name: 'notification',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    getNotification: function () {
      this.$sse('http://localhost:8080/notification/getMessage', {
        format: 'json'
      }).then(sse => {
        msgServer = sse
        console.log('sse: ', sse)
        sse.subscribe('', data => {
          console.log('data : ', data)
          if (!this.isExist(data)) {
            this.messages.push(data)
          }
        })
      })
    },
    isExist: function (message) {
      console.log('data messages : ', this.messages)
      for (var key in this.messages) {
        if (this.messages[key].idString === message.idString) {
          return true
        }
      }
      return false
    }
  },
  mounted () {
    // this.$http.get('/notification/getMessage').then(function (response) {
    //   console.log(response)
    // })
    // this.$http({
    //   url: '/notification/getMessage',
    //   method: 'get',
    //   responseType: 'stream'
    // }).then(function (response) {
    //   console.log(response)
    // })
    // console.log(this.$http)
    // this.$http('/user/12345')
  },
  beforeDestroy () {
    // Make sure to close the connection with the events server
    // when the component is destroyed, or we'll have ghost connections!
    msgServer.close()
  }
}
</script>

<style>
</style>
