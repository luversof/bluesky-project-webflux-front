import { mapState, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState({
      myBookkeeping: state => state.bookkeeping.myBookkeeping
    })
  },
  methods: {
    ...mapMutations(["setMyBookkeeping", "initBlogArticleStateInfo"]),
    getMyBookkeeping: function() {
      var _this = this;
      return this.$http
        .get("/api/bookkeeping/search/myBookkeeping")
        .then(function(response) {
          _this.setMyBookkeeping(response.data);
        });
    },
    moveMyBookkeepingList: function() {
      console.log("!!!", this.myBookkeeping)
      this.$router.push("/bookkeeping/" + this.myBookkeeping.id + "/list");
    }
  },
  created: function() {
    if (this.myBookkeeping === null) {
      this.getMyBookkeeping();
    }
  }
};
