<template>
  <div class="postActions">
    <TheIcon icon="like" @click="emit('likeClick')" :fill="likedByMe ? '#FF3C3C' : 'none'"
      :stroke="likedByMe ? '#FF3C3C' : '#000000'" />
    <span>{{ Number(likes) > 0 ? `${likes}個讚` : "" }}</span>
    <TheIcon icon="comment" @click="emit('commentsClick')" fill="none" stroke="#000000" /><span>{{ comments || ""
    }}</span>
    <TheIcon icon="favorite" @click="emit('favorClick')" :fill="favoredByMe ? '#FFD12E' : 'none'"
      :stroke="favoredByMe ? '#FFD12E' : '#000000'" />
  </div>
</template>

<script setup lang="ts">
import TheIcon from "./TheIcon.vue";

defineProps({
  likes: Number,
  comments: Number,
  likedByMe: Boolean,
  favoredByMe: Boolean,
});

const emit = defineEmits([
  "likeClick",
  "commentsClick",
  "favorClick",
]);
</script>

<style scoped>
.postActions {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  column-gap: 16px;
}

.postActions>svg {
  width: 32px;
  height: 32px;
  grid-row: 1 / 2;
  cursor: pointer;
}

.postActions>span {
  font-size: 14px;
}
</style>
