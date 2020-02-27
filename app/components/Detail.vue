<template>
  <Page>

    <ActionBar title="Groceries">
      <ActionItem text="Edit" @tap="onEditTap"></ActionItem>
    </ActionBar>

    <StackLayout>
      <Button text="Go back" @tap="onBackTap"></Button>
      <Label :text="groceryItem.name"></Label>
      <Button :text="statusText" @tap="toggleDone"></Button>
      <Button text="delete" @tap="toggleDelete" v-if=groceryItem.done></Button>
    </StackLayout>
  </Page>
</template>

<script>
import DeleteItemVue from './DeleteItem.vue';
import EditItemVue from './EditItem.vue';

export default {
  props: ["groceryItem"],
  data: {
    name : '',
  },
  computed: {
    statusText: function() {
      return this.groceryItem.done ? "Done" : "Not done";
    },
  },
  methods: {
    onBackTap() {
      this.$navigateBack();
    },
    toggleDone: function() {
      this.groceryItem.done = !this.groceryItem.done;
    },
    toggleDelete: function() {
      this.$showModal(DeleteItemVue, { 
      }).then(res => {
        if(res) {
           this.groceryItem.deleted = true;
           this.$navigateBack();
        }
      });
    },
    onEditTap() {
      this.$showModal(EditItemVue, {
        props: { id: this.groceryItem.id  }
      }).then(nom => {
        if (nom) {
          this.groceryItem.name = nom;
        }
      });
    },
  }
};
</script>

<style lang="stylus" scoped>

</style>