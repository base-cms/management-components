<template>
  <div class="bmc-schedule-tab">
    <create-schedules :content-id="contentId" :dateSchedulingEnabled="dateSchedulingEnabled"/>
    <list-schedules :content-id="contentId" :dateSchedulingEnabled="dateSchedulingEnabled"/>
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
    dateSchedulingEnabled: {
      type: Boolean,
      default: true,
    },
  },

  /**
   *
   */
  components: { CreateSchedules, ListSchedules },
};
</script>
