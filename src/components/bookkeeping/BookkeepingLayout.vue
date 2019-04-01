<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col col lg="2">
          <b-nav pills vertical>
            <b-nav-item active>가계부</b-nav-item>
            <b-nav-item>통계</b-nav-item>
            <b-nav-item>자산</b-nav-item>
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
  }
};
</script>
