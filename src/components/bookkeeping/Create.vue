<template>
  <div>
    가계부를 생성하시겠습니까?
    <b-button variant="primary" >생성</b-button>
  </div>
</template>
<script>
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  name: "BookkeepingCreate",
  mixins: [bookkeepingMixin],
  data() {
    return {};
  }
  
};
</script>
