<template>
  <svg>
    <use :href="`${sprite}#icon-${icon}`" />
  </svg>
</template>
<script setup lang="ts">
// 使用動態属性時，不能直接寫圖片路徑，需要使用 import 導入
import sprite from "../assets/icons/sprite.svg";

defineProps({
  icon: String,
});
</script>
