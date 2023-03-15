<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <CommentItem v-for="(item, index) in list" :key="index" :comment="item" />
  </van-list>
</template>

<script>
import { getComments } from "@/api/comment";
import { CommentItem } from "./comment-item.vue";
export default {
  name: "CommentList",
  components: {
    CommentItem,
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true,
    },
    lists: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      list: this.lists,
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.onLoad();
  },
  mounted() {},
  methods: {
    async onLoad() {
      try {
        const { data } = await getComments({
          //评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          type: "a",
          source: this.source,
          offset: this.offset,
          limit: this.limit,
        });
        // console.log(data);
        const { results } = data.data;
        this.list.push(...results);
        this.$emit("onload-success", data.data);
        this.loading = false;
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {}
    },
  },
};
</script>

<style scoped lang="less">
</style>