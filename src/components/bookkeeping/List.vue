<template>
  <div>
    <b-button @click="addAssetModal($event.target)">추가</b-button>
    <b-table striped hover :items="myBookkeeping.assetList" :fields="assetFields">
      <template slot="subMenu" slot-scope="row">
        <b-button @click="editAssetModal(row.item, row.index, $event.target)">수정</b-button>
        <b-button @click="deleteAsset(row.item, row.index, $event.target)">삭제</b-button>
      </template>
    </b-table>
    <b-modal id="assetModal" @ok="editAsset" :title="assetModalTitle">
      <b-form>
        <input type="hidden" name="id" :value="assetModalData.id">
        <b-form-group
          label-cols-sm="4"
          label="assetType"
          label-for="assetType"
          :state="assetModalAssetTypeState"
          :invalid-feedback="assetModalAssetTypeInvalidFeedback"
        >
          <b-form-select
            id="assetType"
            :options="assetTypes"
            required
            v-model="assetModalData.assetType"
            :state="assetModalAssetTypeState"
          />
        </b-form-group>
        <b-form-group
          label-cols-sm="4"
          label="name"
          label-for="name"
          :state="assetModalNameState"
          :invalid-feedback="assetModalNameInvalidFeedback"
        >
          <b-form-input id="name" v-model="assetModalData.name" :state="assetModalNameState"/>
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
      assetModalTitle: "",
      assetModalData: {},
      assetModalErrorResponse: null
    };
  },
  computed: {
    assetModalAssetTypeState() {
      return this.formState(this.assetModalErrorResponse, "assetType");
    },
    assetModalAssetTypeInvalidFeedback() {
      return this.formInvalidFeedback(
        this.assetModalErrorResponse,
        "assetType"
      );
    },
    assetModalNameState() {
      return this.formState(this.assetModalErrorResponse, "name");
    },
    assetModalNameInvalidFeedback() {
      return this.formInvalidFeedback(this.assetModalErrorResponse, "name");
    }
  },
  methods: {
    addAssetModal(target) {
      this.assetModalData = { amount: 0 };
      this.assetModalErrorResponse = null;
      this.assetModalTitle = "자산 추가"
      this.$root.$emit("bv::show::modal", "assetModal", target);
    },
    editAssetModal(item, index, target) {
      this.assetModalData = item;
      this.assetModalErrorResponse = null;
      this.assetModalTitle = "자산 수정"
      this.$root.$emit("bv::show::modal", "assetModal", target);
    },
    editAsset(event) {
      event.preventDefault();
      // 추가/수정 분기 처리
      var _this = this;
      if (this.assetModalData.id === undefined) {
        // 추가
        this.$http
          .post("/api/bookkeeping/asset", this.assetModalData)
          .then(function(response) {
            _this.setMyBookkeeping(response.data);
            _this.$root.$emit("bv::hide::modal", "assetModal", event.target);
          })
          .catch(function(error) {
            _this.assetModalErrorResponse = error.response;
          });
      } else {
        // 수정
        this.$http
          .put("/api/bookkeeping/asset", this.assetModalData)
          .then(function(response) {
            _this.setMyBookkeeping(response.data);
            _this.$root.$emit("bv::hide::modal", "assetModal", event.target);
          })
          .catch(function(error) {
            _this.assetModalErrorResponse = error.response;
          });
      }
      //alert(JSON.stringify(this.form));
    },
    deleteAsset(item) {
      if (!confirm("해당 자산을 삭제하시겠습니까?")) {
        return;
      }

      var _this = this;
      this.$http
        .delete("/api/bookkeeping/asset/" + item.id)
        .then(function(response) {
          _this.setMyBookkeeping(response.data);
        });
    }
  }
};
</script>
