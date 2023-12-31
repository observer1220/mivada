<template>
  <TheModal @close="usePost.hidePostDetails">
    <div class="postDetails">
      <img class="postImage" :src="post.image" alt="" />
      <div class="postMeta">
        <div class="author">
          <TheAvatar :src="post?.user?.avatar" />
          <span>{{ post.username }}</span>
        </div>
        <pre class="postDesc">
          {{ post?.description }}
        </pre>
        <el-scrollbar>
          <div class="comments">
            <div class="comment" v-for="comment in comments">
              <TheAvatar :src="comment.user?.avatar" />
              <span class="user">{{ comment.username }}</span>
              <span class="commentDate">
                {{ dateToRelative(comment.created_at) }}
              </span>
              <p class="commentContent">{{ comment.content }}</p>
            </div>
          </div>
        </el-scrollbar>

        <div class="actions">
          <PostActions :likes="post.liked_sum" :comments="post.comments" :favors="post.favored_sum" @likeClick="() => {
            usePost.toggleLike(post.id, user.user_metadata?.username)
          }" @favorClick="usePost.toggleFavor(post.id, user.user_metadata?.username)" :likedByMe="post.likedByMe"
            :favoredByMe="post.favoredByMe" />
          <span class="postPubDate">
            {{ dateToRelative(post.created_at) }}
          </span>
          <input type="text" name="comment" v-model="content" id="" class="commentInput" placeholder="請輸入您的留言..."
            v-on:keyup.enter="createComment" />
          <button @click="createComment()" class="commentPubBtn">
            發佈
          </button>
        </div>
      </div>
    </div>
  </TheModal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import TheAvatar from "./TheAvatar.vue";
import TheModal from "./TheModal.vue";
import PostActions from "./PostActions.vue";
import { dateToRelative } from "../utils/date";
import { usePostStore } from "../store/post";
import { useCommentStore } from "../store/comment";
import { useUserStore } from "../store/user";

const usePost = usePostStore();
const useComment = useCommentStore();
const useUser = useUserStore();

const content = ref("");
const post = usePost.postDetails();
const comments: any = computed(() => useComment.list);
const user = useUser.user;

async function createComment() {
  await useComment.addComment(content.value, post.id, user.user_metadata.userId)
}

watch(comments, () => {
  content.value = "";
});

</script>

<style scoped>
.postDetails {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 350px);
  grid-template-rows: minmax(0, 1fr);
  width: 95vw;
  height: 95vh;
}

.postImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.postMeta {
  padding: 20px;
  display: grid;
  align-items: start;
  grid-template-rows: max-content max-content 1fr max-content;
  max-height: 100%;
  height: 100%;
}

.author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.postDesc {
  width: 100%;
  white-space: pre-wrap;
  margin-top: 24px;
}

.comments {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: max-content;
  grid-gap: 28px;
  align-items: start;
  overflow-y: auto;
  height: 100%;
}

.comment {
  display: grid;
  grid-template-areas:
    "avatar name date"
    "comment comment comment";
  grid-template-columns: 34px 1fr 1fr;
  align-items: center;
  column-gap: 10px;
  row-gap: 14px;
}

.commentDate {
  grid-area: date;
  justify-self: end;
  color: #a7a7a7;
}

.commentContent {
  grid-area: comment;
}

.actions {
  border-top: 1px solid #eaeaea;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  margin: 20px -24px 0px -24px;
  padding: 20px 24px 0 24px;
  row-gap: 16px;
}

.postActions> :deep(svg) {
  transform: scale(0.8125);
}

.postPubDate {
  color: #9f9f9f;
  grid-column: 2 / 6;
  justify-self: end;
  font-size: 14px;
}

.commentInput {
  background: #f7f7f7;
  border-radius: 16px;
  border: none;
  grid-column: 1 / 4;
}

.commentInput::placeholder {
  color: #b9b9b9;
  border: none;
}

.commentPubBtn {
  color: #1da0ff;
  border: none;
  background: none;
  font-size: 16px;
  margin-left: 20px;
  grid-column: 4 / 6;
}
</style>
