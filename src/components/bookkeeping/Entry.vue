<template>
  <div>
    <b-button @click="addEntryModal($event.target)" class="my-1">추가</b-button>
    <b-table :items="entryList"></b-table>
    <b-modal id="entryModal" @ok="editEntry" :title="entryModalTitle">
      <b-form>
        <input type="hidden" name="id" :value="entryModalData.id">
        <b-form-group
          label-cols-sm="4"
          label="assetId"
          label-for="assetId"
          :state="entryModalAssetIdState"
          :invalid-feedback="entryModalAssetIdInvalidFeedback"
        >
          <b-form-select
            v-if="Object.entries(myBookkeeping).length > 0"
            id="assetId"
            :options="assets"
            required
            v-model="entryModalData.assetId"
            :state="entryModalAssetIdState"
          />
        </b-form-group>
        <b-form-group label-cols-sm="4" label="entryDate" label-for="entryDate">
          <b-form-input id="entryDate" type="date" v-model="entryModalData.entryDate"/>
        </b-form-group>
        <b-form-group label-cols-sm="4" label="amount" label-for="amount">
          <b-form-input id="amount" v-model="entryModalData.amount"/>
        </b-form-group>
        <b-form-group label-cols-sm="4" label="memo" label-for="memo">
          <b-form-input id="memo" v-model="entryModalData.memo"/>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import bookkeepingMixin from "@/components/bookkeeping/bookkeeping.js";

export default {
  name: "BookkeepingEntry",
  mixins: [bookkeepingMixin],
  data() {
    return {
      entryList: [],
      entryModalTitle: "",
      entryModalData: {}
    };
  },
  watch: {},
  computed: {
    entryModalAssetIdState() {
      return this.formState(this.entryModalErrorResponse, "assetId");
    },
    entryModalAssetIdInvalidFeedback() {
      return this.formInvalidFeedback(this.assetModalErrorResponse, "assetId");
    },
    entryModalNameState() {
      return this.formState(this.assetModalErrorResponse, "name");
    },
    entryModalNameInvalidFeedback() {
      return this.formInvalidFeedback(this.assetModalErrorResponse, "name");
    },
    assets() {
      var assets = [];
      this.myBookkeeping.assetList.forEach(function(asset) {
        assets.push({ text: asset.name, value: asset.id });
      });
      return assets;
    }
  },
  methods: {
    getEntryList: function() {
      var _this = this;
      this.$http
        .get("/api/bookkeeping/entry/search/myEntryList")
        .then(function(response) {
          _this.entryList = response.data;
        });
    },
    addEntryModal(target) {
      this.entryModalData = { amount: 0, bookkeepingId: this.myBookkeeping.id };
      this.entryModalErrorResponse = null;
      this.entryModalTitle = "추가";
      this.$root.$emit("bv::show::modal", "entryModal", target);
    },
    editEntryModal(item, index, target) {
      this.entryModalData = item;
      this.entryModalErrorResponse = null;
      this.entryModalTitle = "수정";
      this.$root.$emit("bv::show::modal", "entryModal", target);
    },
    editEntry(event) {
      event.preventDefault();
      // 추가/수정 분기 처리
      var _this = this;
      if (this.entryModalData.id === undefined) {
        // 추가
        this.$http
          .post("/api/bookkeeping/entry", this.entryModalData)
          .then(function(response) {
            _this.setMyBookkeeping(response.data);
            _this.$root.$emit("bv::hide::modal", "entryModal", event.target);
          })
          .catch(function(error) {
            _this.entryModalErrorResponse = error.response;
          });
      } else {
        // 수정
        this.$http
          .put("/api/bookkeeping/entry", this.entryModalData)
          .then(function(response) {
            _this.setMyBookkeeping(response.data);
            _this.$root.$emit("bv::hide::modal", "entryModal", event.target);
          })
          .catch(function(error) {
            _this.entryModalErrorResponse = error.response;
          });
      }
    }
  },
  mounted: function() {
    this.getEntryList();
  }
};
</script>
