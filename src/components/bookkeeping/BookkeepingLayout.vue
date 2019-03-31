<template>
  <div>
    레이아웃 위치
    <router-view></router-view>
  </div>
</template>
<script>
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  name: "BookkeepingLayout",
  mixins: [bookkeepingMixin],
  data() {
    return {};
  }
};
</script>
