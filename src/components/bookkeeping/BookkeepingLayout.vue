<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col col lg="2">
          <b-nav pills vertical v-if="$route.params.bookkeepingId">
            <b-nav-item :to="{ name: 'bookkeepingEntry', params: { bookkeepingId: $route.params.bookkeepingId }}" :active="$route.name == 'bookkeepingEntry'">가계부</b-nav-item>
            <b-nav-item :to="{ name: 'bookkeepingStatistics', params: { bookkeepingId: $route.params.bookkeepingId }}" :active="$route.name == 'bookkeepingStatistics'">통계</b-nav-item>
            <b-nav-item :to="{ name: 'bookkeepingAsset', params: { bookkeepingId: $route.params.bookkeepingId }}" :active="$route.name == 'bookkeepingAsset'">자산</b-nav-item>
            <b-nav-item disabled>설정</b-nav-item>
          </b-nav>
        </b-col>
        <b-col>
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  name: "BookkeepingLayout",
  mixins: [bookkeepingMixin],
  data() {
    return {};
  },
  mounted: function() {
    // console.log(this.$route)
  }
};
</script>
