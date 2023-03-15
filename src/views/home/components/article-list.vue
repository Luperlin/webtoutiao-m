<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isreFreshLoading"
      :success-text="refreshSuccessText"
      :success-duration="2000"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        />
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>
  
<script>
import { getArticles } from "@/api/article";
import ArticleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isreFreshLoading: false, //刷新的loading状态
      refreshSuccessText: "刷新成功",
    };
  },
  components: {
    ArticleItem,
  },
  methods: {
    async onLoad() {
      try {
        //1.请求数据
        const { data } = await getArticles({
          // channel_id
          // timestamp
          // with_top
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          // with_top: 0, //置顶文章
        });
        const { results } = data.data;
        // console.log(results);
        //2.把请求结果数据放到list数组中
        // ...数组的展开操作符，他会把元素一个一个拿出来
        this.list.push(...results);
        //3.loading关闭后才能触发下一次加载
        this.loading = false;
        //4.判断数据是否加载完成
        if (results.length) {
          //更新获取下一页时间戳
          this.timestamp = data.data.pre_timestamp;
        } else {
          //没有数据，将finished设置为true
          this.finished = true;
        }
      } catch (err) {
        console.log(err);
        this.error = true;
        //请求失败了loading也需要关闭
        this.loading = false;
      }
    },
    async onRefresh() {
      // console.log("onRefresh");

      try {
        //请求获取数据
        //1.请求数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        //将数据追加到列表顶部
        const { results } = data.data;
        this.list.unshift(...results);
        //关闭下拉刷新的loading状态
        this.isreFreshLoading = false;
        //更新下拉刷新成功提示文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`;
      } catch (err) {
        // console.log(err);
        this.isreFreshLoading = false;
        this.refreshSuccessText = `刷新失败`;
      }
    },
  },
  created() {},
};
</script>
  
<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>