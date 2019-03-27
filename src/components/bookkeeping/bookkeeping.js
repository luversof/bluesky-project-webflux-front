import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.myBookkeeping,
      assetTypes: state => state.bookkeeping.assetTypes
    })
  },
  methods: {
    ...mapMutations(["setMyBookkeeping", "setAssetTypes", "initBlogArticleStateInfo"]),
    getMyBookkeeping: function () {
      var _this = this;
      return this.$http
        .get("/api/bookkeeping/search/myBookkeeping")
        .then(function (response) {
          _this.setMyBookkeeping(response.data);
        });
    },
    getAssetTypes: function () {
      var _this = this;
      return this.$http
        .get("/api/bookkeeping/assetTypes")
        .then(function (response) {
          _this.setAssetTypes(response.data);
        })
    },
    moveMyBookkeepingList: function () {
      this.$router.push("/bookkeeping/" + this.myBookkeeping.id + "/list");
    }
  },
  created: function () {
    if (this.myBookkeeping.constructor === Object && Object.entries(this.myBookkeeping).length === 0) {
      this.getMyBookkeeping();
    }
    if (this.assetTypes.length == 0) {
      this.getAssetTypes();
    }
  }
};
