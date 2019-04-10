<template>
  <div>
    <b-button class="my-1" @click="addEntryModal($event.target)">추가</b-button>
    <b-table hover fixed :items="entryList" :fields="entryFields">
      <template slot="subMenu" slot-scope="row">
        <b-button class="mr-1" @click="editEntryModal(row.item, row.index, $event.target)">수정</b-button>
        <b-button @click="deleteEntry(row.item, row.index, $event.target)">삭제</b-button>
      </template>
    </b-table>
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
          <b-form-input id="entryDate" type="date" v-model="entryModalData.entryDateData"/>
        </b-form-group>
        <b-form-group label-cols-sm="4" label="amount" label-for="amount">
          <b-form-input id="amount" type="number" v-model="entryModalData.amount"/>
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
      entryFields: {
        entryDate: { label: "사용일", sortable: true },
        assetId: { label: "임시표시", sortable: true },
        amount: { label: "금액", sortable: true },
        memo: { label: "메모", sortable: true },
        subMenu: { label: "관리" }
      },
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
      this.entryModalData.entryDate =
        this.entryModalData.entryDateData + "T00:00";
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
    },
    deleteEntry(item) {
      if (!confirm("삭제 하시겠습니까?")) {
        return;
      }
      var _this = this;
      this.$http
        .delete("/api/bookkeeping/entry/" + item.id)
        .then(function(response) {
          _this.entryList.remove(item);
        });
    }
  },
  mounted: function() {
    this.getEntryList();
  }
};
</script>
