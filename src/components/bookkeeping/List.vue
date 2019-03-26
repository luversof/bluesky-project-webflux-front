<template>
  <div>
    ㅁㄴㄻㄴㅇㄹ {{myBookkeeping}}
    <b-table striped hover :items="myBookkeeping.assetList" :fields="assetFields">
      <template slot="subMenu" slot-scope="row">
        <b-button @click="editAssetModal(row.item, row.index, $event.target)">수정</b-button>
      </template>
    </b-table>
    <b-modal id="assetModal">
      {{assetModalData}}
      <b-form @submit.stop.prevent="editAsset">
        <b-form-group label-cols-sm="4" label="assetType" label-for="assetType">
          <b-form-input id="assetType" v-model="assetModalData.assetType"/>
        </b-form-group>
        <b-form-group label-cols-sm="4" label="name" label-for="name">
          <b-form-input id="name" v-model="assetModalData.name"/>
        </b-form-group>
        <b-form-group label-cols-sm="4" label="amount" label-for="amount">
          <b-form-input id="amount" v-model="assetModalData.amount"/>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  name: "BookkeepingList",
  mixins: [bookkeepingMixin],
  data() {
    return {
      assetFields: ["assetType", "name", "amount", "subMenu"],
      assetModalData: {}
    };
  },
  methods: {
    editAssetModal(item, index, button) {
      this.assetModalData = item;
      this.$root.$emit("bv::show::modal", "assetModal", button);
    },
    editAsset(event) {
      alert(JSON.stringify(this.form))
    }
  }
};
</script>
