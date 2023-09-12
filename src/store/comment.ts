import { ref } from 'vue'
import { defineStore } from 'pinia';
import { createComment, loadComments } from '../apis/comment';

export const useCommentStore = defineStore('comment', () => {
  const list = ref([]);

  const initializeComments = (comments) => {
    list.value = comments;
  };

  const addComment = async (content, postId) => {
    await createComment(content, postId);
    loadAllComments(postId);
    increaseCommentCount(postId);
  };

  const loadAllComments = async (postId) => {
    const comments = await loadComments(postId);
    initializeComments(comments);
  };

  const increaseCommentCount = (id) => {
    const post = list.value.find((post) => post.id === id);
    post.comments++;
  };

  return {
    list,
    initializeComments,
    addComment,
    loadAllComments,
    increaseCommentCount,
  };
});