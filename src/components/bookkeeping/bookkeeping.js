import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.myBookkeeping,
      assetTypes: state => state.bookkeeping.assetTypes,
      loginInfo: state => state.loginInfo.loginInfo
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
    moveMyBookkeepingAsset: function () {
      this.$router.push("/bookkeeping/" + this.myBookkeeping.id + "/asset");
    },
    formState(errorResponse, field) {
      var state = null
      if (errorResponse == null) {
        return state;
      }
      var errors = errorResponse.data.errors
      if (errors.length == 0) {
        return state
      }
      errors.forEach(function (error) {
        if (error.field === field) {
          state = false
        }
      });
      return state ? true : state
    },
    formInvalidFeedback: function (errorResponse, field) {
      var message = ""
      if (errorResponse == null) {
        return message;
      }
      var errors = errorResponse.data.errors
      if (errors.length == 0) {
        return message
      }
      errors.forEach(function (error) {
        if (error.field == field) {
          message = error.defaultMessage
        }
      });
      return message
    }
  },
  created: function () {
    if (!this.loginInfo.login) {
      this.$router.push("/error/login");
      return;
    }

    if (this.myBookkeeping.constructor === Object && Object.entries(this.myBookkeeping).length === 0) {
      this.getMyBookkeeping();
    }
    if (this.assetTypes.length == 0) {
      this.getAssetTypes();
    }
  }
};
