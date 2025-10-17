<template>
  <!-- Error dialog - hiển thị khi có lỗi input -->
  <base-dialog v-if="inputIsInvalid" @close="confirmError">
    <template #default>
      <p>At least one field is invalid.</p>
      <p>Please check your input and try again.</p>
    </template>

    <template #actions>
      <!-- Click để đóng dialog -->
      <base-button @click="confirmError">Okay</base-button>
    </template>

    <template #header>
      <h2>Invalid input</h2>
    </template>
  </base-dialog>

  <base-card>
    <!-- Prevent default form submission when call submitData method -->
    <form @submit.prevent="submitData">
      <div class="form-control">
        <label for="title">Title</label>
        <input id="title" type="text" name="title" ref="titleInput" />
      </div>

      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          ref="descriptionInput"
        ></textarea>
      </div>

      <div class="form-control">
        <label for="link">Link</label>
        <input id="link" type="url" name="link" ref="linkInput" />
      </div>

      <div class="form-actions">
        <base-button type="submit">Add Resource</base-button>
      </div>
    </form>
  </base-card>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseDialog from '@/components/UI/BaseDialog.vue';

export default {
  data() {
    return {
      inputIsInvalid: false,
    };
  },
  components: { BaseCard, BaseButton, BaseDialog },
  inject: ['addResource'],
  methods: {
    submitData() {
      // Lấy giá trị từ các input field
      const enteredTitle = this.$refs.titleInput.value;
      const enteredDescription = this.$refs.descriptionInput.value;
      const enteredLink = this.$refs.linkInput.value;

      // Kiểm tra validation - hiển thị error nếu thiếu field
      if (
        !enteredTitle.trim() ||
        !enteredDescription.trim() ||
        !enteredLink.trim()
      ) {
        this.inputIsInvalid = true;
        return;
      }

      // Gọi method từ parent component
      this.addResource(enteredTitle, enteredDescription, enteredLink);
    },
    // Đóng error dialog
    confirmError() {
      this.inputIsInvalid = false;
    },
  },
};
</script>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
