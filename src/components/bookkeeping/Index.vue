<template>
  <div></div>
</template>
<script>
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  name: "BookkeepingIndex",
  mixins: [bookkeepingMixin],
  data() {
    return {};
  },
  watch: {
    myBlog: function() {
      //this.moveMyBookkeepingList();
    }
  },
  mounted: function() {
    if (this.myBookkeeping === null) {
      this.getMyBookkeeping();
    } else {
      //this.moveMyBookkeepingList();
    }
  }
};
</script>
