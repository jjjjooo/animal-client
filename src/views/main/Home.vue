<template>
  <section>
    <Preview />
  </section>
</template>

<script>
export default {
  components: {
    Preview: () => import('@/views/post/Preview'),
  },
};
</script>

<style></style>
