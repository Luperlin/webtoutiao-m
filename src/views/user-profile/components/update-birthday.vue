<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancle="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
import dayjs from "dayjs";
export default {
  name: "updateBirthday",
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      minDate: new Date(1950, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value),
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
      const currentDate = dayjs(this.currentDate).format("YYYY-MM-DD");
      await updateUserProfile({
        birthday: currentDate,
      });
      this.$emit("input", currentDate);
      this.$emit("close");
      this.$toast.success("更新成功");
    },
  },
};
</script>

<style scoped lang="less">
</style>