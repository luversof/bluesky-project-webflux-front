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
    myBookkeeping: function() {
      this.moveMyBookkeepingList();
    }
  },
  mounted: function() {
    if (this.myBookkeeping !== null) {
      this.moveMyBookkeepingList();
    }
  }
};
</script>
