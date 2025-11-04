<template>
  <li>
    <h2>{{ fullName }}</h2>
    <p>Hourly Rate: ${{ hourlyRate }}/hour</p>
    <div>
      <!-- key="area" vì mỗi area là duy nhất -->
      <span v-for="area in areas" :key="area">{{ area }}</span>
    </div>

    <div class="action">
      <!-- nhằm mục đích: tạo liên kết đến trang liên hệ và chi tiết của huấn luyện viên thông qua props -->
      <router-link :to="coachContactLink">Contact</router-link>
      <router-link :to="coachDetailLink">View Detail</router-link>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
    areas: {
      type: Array,
      required: true,
    },
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      return `/coaches/${this.id}/contact`;
    },
    coachDetailLink() {
      return `/coaches/${this.id}`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
