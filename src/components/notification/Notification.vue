<template>
  <div>
    test
    호출 해보자
    <button @click="getNotification">호출</button>

    <p v-for="message in messages" :key="message.idString">{{ message.message }}</p>
    <br>보낼 메세지
    <input type="text" name="message" v-model="message" @keyup.enter="sendNotification">
    <button @click="sendNotification">보내기</button>
  </div>
</template>
<script>
let msgServer
export default {
  name: 'notification',
  data () {
    return {
      messages: [],
      message: ''
    }
  },
  methods: {
    getNotification: function () {
      this.$sse('http://localhost:8080/notification/getMessage2', {
        format: 'json'
      }).then(sse => {
        msgServer = sse
        sse.subscribe('', data => {
          if (!this.isExist(data)) {
            this.messages.push(data)
          }
        })
      })
    },
    sendNotification: function () {
      this.$http.post('/notification', {
        message: this.message,
        userId: 'sendUserId'
      })
    },
    isExist: function (message) {
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
