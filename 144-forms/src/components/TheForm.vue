<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="user-name">Your Name</label>
      <input
        id="user-name"
        name="user-name"
        type="text"
        v-model="userName"
        @input="logData('userName', userName)"
        @blur="validateName"
        :class="{ invalid: !isValidName && userName }"
      />
      <p v-if="!isValidName && userName" class="error-message">
        Name must be at least 2 characters long
      </p>
    </div>
    <div class="form-control">
      <label for="age">Your Age (Years)</label>
      <input
        id="age"
        name="age"
        type="number"
        v-model.number="userAge"
        @input="logData('userAge', userAge)"
        @blur="validateAge"
        :class="{ invalid: !isValidAge && userAge }"
      />
      <p v-if="!isValidAge && userAge" class="error-message">
        Age must be between 18 and 120
      </p>
    </div>
    <div class="form-control">
      <label for="referrer">How did you hear about us?</label>
      <select
        id="referrer"
        name="referrer"
        v-model="referrer"
        @change="logData('referrer', referrer)"
      >
        <option value="google">Google</option>
        <option value="wom">Word of mouth</option>
        <option value="newspaper">Newspaper</option>
      </select>
    </div>
    <div class="form-control">
      <h2>What are you interested in?</h2>
      <div>
        <input
          id="interest-news"
          name="interest"
          type="checkbox"
          value="news"
          v-model="interests"
          @change="logData('interests', interests)"
        />
        <label for="interest-news">News</label>
      </div>
      <div>
        <input
          id="interest-tutorials"
          name="interest"
          type="checkbox"
          value="tutorials"
          v-model="interests"
          @change="logData('interests', interests)"
        />
        <label for="interest-tutorials">Tutorials</label>
      </div>
      <div>
        <input
          id="interest-nothing"
          name="interest"
          type="checkbox"
          value="nothing"
          v-model="interests"
          @change="logData('interests', interests)"
        />
        <label for="interest-nothing">Nothing</label>
      </div>
      <p v-if="!isValidInterests" class="error-message">
        Please select at least one interest
      </p>
    </div>
    <div class="form-control">
      <h2>How do you learn?</h2>
      <div>
        <input
          id="how-video"
          name="how"
          type="radio"
          value="video"
          v-model="learningStyle"
          @change="logData('learningStyle', learningStyle)"
        />
        <label for="how-video">Video Courses</label>
      </div>
      <div>
        <input
          id="how-blogs"
          name="how"
          type="radio"
          value="blogs"
          v-model="learningStyle"
          @change="logData('learningStyle', learningStyle)"
        />
        <label for="how-blogs">Blogs</label>
      </div>
      <div>
        <input
          id="how-other"
          name="how"
          type="radio"
          value="other"
          v-model="learningStyle"
          @change="logData('learningStyle', learningStyle)"
        />
        <label for="how-other">Other</label>
      </div>
      <p v-if="!isValidLearningStyle" class="error-message">
        Please select a learning style
      </p>
    </div>
    <div>
      <button :disabled="!isFormValid">Save Data</button>
      <p v-if="!isFormValid" class="validation-summary">
        Please fill all required fields correctly
      </p>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      userName: '',
      userAge: null,
      referrer: 'google',
      interests: [],
      learningStyle: '',
    };
  },
  computed: {
    // Validation computed properties
    isValidName() {
      return this.userName.trim().length >= 2;
    },
    isValidAge() {
      return this.userAge >= 18 && this.userAge <= 120;
    },
    isValidInterests() {
      return this.interests.length > 0;
    },
    isValidLearningStyle() {
      return this.learningStyle !== '';
    },
    isFormValid() {
      return (
        this.isValidName &&
        this.isValidAge &&
        this.isValidInterests &&
        this.isValidLearningStyle
      );
    },
  },
  methods: {
    submitForm() {
      console.log('=== FORM VALIDATION ===');
      console.log('Name valid:', this.isValidName);
      console.log('Age valid:', this.isValidAge);
      console.log('Interests valid:', this.isValidInterests);
      console.log('Learning style valid:', this.isValidLearningStyle);
      console.log('Form valid:', this.isFormValid);

      if (!this.isFormValid) {
        console.log('❌ Form validation failed!');
        alert('Please fix validation errors before submitting');
        return;
      }

      console.log('=== FORM SUBMITTED ===');
      console.log('Name:', this.userName);
      console.log('Age:', this.userAge);
      console.log('Referrer:', this.referrer);
      console.log('Interests:', this.interests);
      console.log('Learning Style:', this.learningStyle);
      console.log('=== END FORM DATA ===');

      // Reset form to default values
      this.resetForm();
    },
    logData(fieldName, value) {
      console.log(`${fieldName} changed to:`, value);
    },
    resetForm() {
      console.log('🔄 Resetting form to default values...');
      this.userName = '';
      this.userAge = null;
      this.referrer = 'google';
      this.interests = [];
      this.learningStyle = '';
      console.log('✅ Form reset complete!');
    },
    validateName() {
      console.log('Name validation:', this.isValidName);
    },
    validateAge() {
      console.log('Age validation:', this.isValidAge);
    },
  },
};
</script>

<style scoped>
form {
  margin: 2rem auto;
  max-width: 40rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #4c3d3d;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

input,
select {
  display: block;
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

select {
  width: auto;
}

input[type='checkbox'],
input[type='radio'] {
  display: inline-block;
  width: auto;
  margin-right: 1rem;
}

input[type='checkbox'] + label,
input[type='radio'] + label {
  font-weight: normal;
}

button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}

button:disabled {
  background-color: #ccc;
  border-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff6b6b;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  margin-bottom: 0;
}

.validation-summary {
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
}

.invalid {
  border-color: #ff6b6b !important;
  background-color: rgba(255, 107, 107, 0.1);
}
</style>
