<template>
  <div>
    가계부를 생성하시겠습니까?
    <b-button variant="primary" class="my-1" @click="createBookkeeping()">생성</b-button>
  </div>
</template>
<script>
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  name: "BookkeepingCreate",
  mixins: [bookkeepingMixin],
  data() {
    return {};
  },
  watch: {
    myBookkeeping: function() {
      if (Object.entries(this.myBookkeeping).length > 0) {
        this.moveMyBookkeepingAsset();
      }
    }
  },
  methods: {
    createBookkeeping() {
      var _this = this;
      this.$http.post("/api/bookkeeping").then(function(response) {
        _this.setMyBookkeeping(response.data);
      });
    }
  },
  mounted: function() {
    console.log("test", this);
  }
};
</script>
