<template>
  <div class="bmc-schedule-tab">
    <create-schedules :content-id="contentId" :disableDateScheduling="disableDateScheduling"/>
    <list-schedules :content-id="contentId" :disableDateScheduling="disableDateScheduling"/>
  </div>
</template>

<script>
import ListSchedules from './list.vue';
import CreateSchedules from './create.vue';

export default {
  /**
   *
   */
  props: {
    contentId: {
      type: Number,
      required: true,
    },
    disableDateScheduling: {
      type: Boolean,
      default: false,
    },
  },

  /**
   *
   */
  components: { CreateSchedules, ListSchedules },
};
</script>
