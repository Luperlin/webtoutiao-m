<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from "@/api/search";
export default {
  name: "SearchResult",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false,
    };
  },
  computed: {},
  created() {},
  methods: {
    async onLoad() {
      try {
        //获取数据
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText,
        });

        // console.log(data);
        //数据添加到数组列表中
        const { results } = data.data;
        this.list.push(...results);
        //关闭loading
        this.loading = false;
        //判断是否还有数据
        if (results.length) {
          //有  获取下一页页码
          this.page++;
        } else {
          //无  将状态设置为finished
          this.finished = true;
        }
      } catch (err) {
        this.error = true;
        this.loading = false;
        this.$toast("获取数据失败");
      }
    },
  },
};
</script>

<style scoped lang="less"></style>
