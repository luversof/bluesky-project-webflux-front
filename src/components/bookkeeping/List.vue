<template>
  <div>
    ㅁㄴㄻㄴㅇㄹ {{myBookkeeping}}, {{assetTypes}}
    <b-button @click="addAssetModal($event.target)">추가</b-button>
    <b-table striped hover :items="myBookkeeping.assetList" :fields="assetFields">
      <template slot="subMenu" slot-scope="row">
        <b-button @click="editAssetModal(row.item, row.index, $event.target)">수정</b-button>
      </template>
    </b-table>
    <b-modal id="assetModal" @ok="editAsset">
      {{assetModalData}}
      <b-form>
        <input type="hidden" name="id" :value="assetModalData.id" />
        <b-form-group label-cols-sm="4" label="assetType" label-for="assetType">
          <b-form-select id="assetType" :options="assetTypes" required v-model="assetModalData.assetType" />
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
    addAssetModal(button) {
      this.assetModalData = { amount: 0 };
      this.$root.$emit("bv::show::modal", "assetModal", button);
    },
    editAssetModal(item, index, button) {
      this.assetModalData = item;
      this.$root.$emit("bv::show::modal", "assetModal", button);
    },
    editAsset(event) {
      alert(JSON.stringify(this.form));
    }
  }
};
</script>
