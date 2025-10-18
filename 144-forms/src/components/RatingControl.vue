<template>
  <div class="rating-control">
    <div class="stars">
      <span
        v-for="star in 5"
        :key="star"
        class="star"
        :class="{
          active: star <= currentRating,
          hover: star <= hoverRating,
        }"
        @click="setRating(star)"
        @mouseenter="hoverRating = star"
        @mouseleave="hoverRating = 0"
      >
        ★
      </span>
    </div>
    <div class="rating-text">
      <span v-if="currentRating > 0">
        {{ currentRating }}/5 - {{ getRatingText(currentRating) }}
      </span>
      <span v-else class="no-rating"> Click to rate </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RatingControl',
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      hoverRating: 0,
    };
  },
  computed: {
    currentRating() {
      return this.hoverRating || this.modelValue;
    },
  },
  methods: {
    setRating(rating) {
      console.log('🌟 Rating set to:', rating);
      this.$emit('update:modelValue', rating);
    },
    getRatingText(rating) {
      const texts = {
        1: 'Poor',
        2: 'Fair',
        3: 'Good',
        4: 'Very Good',
        5: 'Excellent',
      };
      return texts[rating] || '';
    },
  },
};
</script>

<style scoped>
.rating-control {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  font-size: 1.5rem;
  color: #ddd;
  cursor: pointer;
  transition: color 0.2s ease;
  user-select: none;
}

.star:hover {
  color: #ffc107;
}

.star.active {
  color: #ffc107;
}

.star.hover {
  color: #ffeb3b;
}

.rating-text {
  font-size: 0.9rem;
  color: #666;
  min-height: 1.2rem;
}

.no-rating {
  color: #999;
  font-style: italic;
}
</style>
