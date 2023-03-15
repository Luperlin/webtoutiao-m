<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggestions: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      //监视searchText
      //当searchText发生改变就会调用 handler 函数
      //handler函数名称固定的
      //   handler(value) {
      //     // console.log(value);
      //     this.loadSearchSuggestions(value);
      //   },
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value);
      }, 1000),
      immediate: true,
    },
  },
  created() {},
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestion(q);
        // console.log(data);
        this.suggestions = data.data.options;
      } catch (err) {
        this.$toast("数据获取失败");
      }
    },

    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`;
      const reg = new RegExp(this.searchText, "gi");
      return text.replace(reg, highlightStr);
      //   return text;
    },
  },
};
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
