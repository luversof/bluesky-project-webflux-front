<template>
  <div>
    <b-button @click="addEntryModal($event.target)" class="my-1">추가</b-button>
    <b-table :items="entryList"></b-table>
    <b-modal id="entryModal" @ok="editEntry" :title="entryModalTitle">
      <b-form>
        <input type="hidden" name="id" :value="entryModalData.id">
        <b-form-group
          label-cols-sm="4"
          label="assetType"
          label-for="assetType"
          :state="entryModalAssetTypeState"
          :invalid-feedback="entryModalAssetTypeInvalidFeedback"
        >
          <b-form-select
            id="assetType"
            :options="assetTypes"
            required
            v-model="entryModalData.assetType"
            :state="entryModalAssetTypeState"
          />
        </b-form-group>
        <b-form-group
          label-cols-sm="4"
          label="name"
          label-for="name"
          :state="entryModalNameState"
          :invalid-feedback="entryModalNameInvalidFeedback"
        >
          <b-form-input id="name" v-model="entryModalData.name" :state="entryModalNameState"/>
        </b-form-group>
        <b-form-group label-cols-sm="4" label="amount" label-for="amount">
          <b-form-input id="amount" v-model="entryModalData.amount"/>
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
    entryModalAssetTypeState() {
      return this.formState(this.entryModalErrorResponse, "assetType");
    },
    assetModalAssetTypeInvalidFeedback() {
      return this.formInvalidFeedback(
        this.assetModalErrorResponse,
        "assetType"
      );
    },
    entryModalNameState() {
      return this.formState(this.assetModalErrorResponse, "name");
    },
    entryModalNameInvalidFeedback() {
      return this.formInvalidFeedback(this.assetModalErrorResponse, "name");
    }
  },
  methods: {
    getEntryList: function() {
      var _this = this;
      this.$http
        .get("/api/bookkeeping/entry/search/myEntryList")
        .then(function(response) {
          console.log(response.data);
          _this.entryList = response.data;
        });
    },
    addEntryModal(target) {
      this.entryModalData = { amount: 0 };
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
