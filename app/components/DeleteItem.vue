<template>
  <Page>
    <StackLayout>
      <Label text="Delete Item"></Label>
      <Button text="Yes" @tap="onDeleteTap"></Button>
      <Button text="no" @tap="onBackTap"></Button>
    </StackLayout>
  </Page>
</template>

<script>
export default {
  props: ["item"],
  data: function() {
    return {
        name: ''
    };
  },
  methods: {
    onDeleteTap() {
        const res = true;
        this.$modal.close(res);
    },
    onBackTap() {
        this.$modal.close();
    }
  }
};
</script>
