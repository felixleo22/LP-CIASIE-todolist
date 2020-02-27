<template v-if="groceryItem.deleted">
  <GridLayout columns="100, *">
    <Label col="0" :text="statusText"></Label>
    <Label col="1" class="item-name" :class="{ 'line-through' : groceryItem.done }" :text="groceryItem.name"></Label>
  </GridLayout>
</template>

<script>
export default {
  props: ["groceryItem"],
  data: function() {
    return {};
  },
  computed: {
    statusText: function() {
      return this.groceryItem.done ? "Done" : "Not done";
    }
  },
  methods: {
    toggleDone: function() {
      this.$emit("toggleDone", this.groceryItem);
    },
  }
};
</script>

<style lang="scss" scoped>
page {
  label {
    color: gray;
  }
  .line-through {
    text-decoration: line-through;
  }
}

</style>

