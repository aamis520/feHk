<template lang="html">
  <div class="index-page">
    <mt-tab-container v-model="tabName">
      <mt-tab-container-item id="assets">
        <myAssets></myAssets>
      </mt-tab-container-item>
      <mt-tab-container-item id="otc">
        <myOtc></myOtc>
      </mt-tab-container-item>
      <mt-tab-container-item id="quotation">
        <myQuotation></myQuotation>
      </mt-tab-container-item>
      <mt-tab-container-item id="account">
        <myAccount></myAccount>
      </mt-tab-container-item>
    </mt-tab-container>
    <mt-tabbar v-model="tabName">
      <mt-tab-item id="assets">
        <img v-if="tabName == 'assets'" slot="icon" src="~@/assets/images/资产.png"/>
        <img v-else slot="icon" src="~@/assets/images/资产copy.png"/>
      </mt-tab-item>
      <mt-tab-item id="otc">
        <img v-if="tabName == 'otc'" slot="icon" src="~@/assets/images/otccopy 2.png"/>
        <img v-else slot="icon" src="~@/assets/images/otc.png"/>
      </mt-tab-item>
      <!-- <mt-tab-item id="quotation">
        <img v-if="tabName == 'quotation'" slot="icon" src="~@/assets/images/hangqing.png"/>
        <img v-else slot="icon" src="~@/assets/images/行情copy.png"/>
      </mt-tab-item> -->
      <mt-tab-item id="account">
        <img v-if="tabName == 'account'" slot="icon" src="~@/assets/images/账户.png"/>
        <img v-else slot="icon" src="~@/assets/images/账户copy 2.png"/>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import myAssets from "@/pages/assets/index";
import myOtc from "@/pages/otc/index";
import myQuotation from "@/pages/quotation/index";
import myAccount from "@/pages/account/index";
export default {
  components: {
    myAssets,
    myOtc,
    myQuotation,
    myAccount
  },
  data() {
    return {
      tabName: "assets"
    };
  },
  watch: {
    tabName(val) {
      if (val == "") {
        this.$router.push("/home/assets");
      } else {
        this.$router.push("/home/" + val);
      }
    }
  },
  computed: {},
  methods: {},
  created() {
    if (this.$router.currentRoute.params.name) {
      this.tabName = this.$router.currentRoute.params.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.mint-tabbar{
  background: #31313f;
}
.mint-tab-item{
  padding: 16px 0;
}
.mint-tabbar > .mint-tab-item.is-selected{
  background: #31313f;
}
.index-page {
  height: calc(100% - 67px);
  .mint-tab-container {
    height: 100%;
    .mint-tab-container-wrap {
      height: 100%;
    }
  }
}
</style>

