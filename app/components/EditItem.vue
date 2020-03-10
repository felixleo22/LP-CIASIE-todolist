<template>
  <Page>
    <StackLayout>
      <Label text="Edit item"></Label>
      <TextField v-model="name" hint="Enter grocery name"></TextField>
      <Button text="Save" @tap="onSaveTap"></Button>
      <Button text="Cancel" @tap="onCancelTap"></Button>
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
    onSaveTap() {
        this.$modal.close(this.name);
    },
    onCancelTap() {
        this.$modal.close();
    }
  }
};
</script>
