<template>
  <div class="search-container">
    <!-- 顶部搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>

    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></SearchSuggestion>

    <!-- 搜索历史记录 -->
    <SearchHistory
      v-else
      :search-histories="searchHistories"
      @clear-search-history="searchHistories = []"
      @clearhistory="clearHistory(index)"
      @search="onSearch"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
import { setItem, getItem } from "@/utils/stroage";
export default {
  name: "SearchIndex",
  props: {},
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  data() {
    return {
      searchText: "",
      isResultShow: false, //搜索结果的展示
      searchHistories: getItem("TOUTIAO_SEARCH_HISTORY") || [],
    };
  },
  computed: {},
  created() {},
  watch: {
    searchHistories(value) {
      setItem("TOUTIAO_SEARCH_HISTORY", value);
    },
  },
  methods: {
    onSearch(val) {
      //   console.log(val);
      //显示文本框内容
      this.searchText = val;
      //存储搜索历史记录
      const index = this.searchHistories.indexOf(val); //获取第一次在数组中的索引，有就返回，没有就返回-1
      if (index !== -1) {
        //删除重复的
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(val);
      //显示搜索结果页
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
    clearHistory(index) {
      this.searchHistories.splice(index, 1);
    },
  },
};
</script>

<style  scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>>
</style>