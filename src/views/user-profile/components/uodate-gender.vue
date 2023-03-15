<template>
  <div class="update-gender">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  name: "updateGender",
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      localGender: this.value,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      const localGender = this.localGender;
      await updateUserProfile({
        gender: localGender,
      });
      this.$emit("input", localGender);
      this.$emit("close");
      this.$toast.success("更新成功");
    },
    onPickerChange(picker, value, index) {
      this.localGender = index;
      console.log(picker, value);
    },
  },
};
</script>

<style scoped lang="less">
</style>