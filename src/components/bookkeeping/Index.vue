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
      this.moveMyBookkeepingAsset();
    }
  },
  mounted: function() {
    if (Object.entries(this.myBookkeeping).length > 0) {
      this.moveMyBookkeepingAsset();
    }
  }
};
</script>
