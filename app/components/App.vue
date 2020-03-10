<template>
  <Page>
    <ActionBar title="Groceries">
      <ActionItem text="Add" @tap="onAddTap"></ActionItem>
    </ActionBar>

    <StackLayout>
      <GroceryList :items="items" />
    </StackLayout>
    <TabView>
      <TabViewItem title="All">
         <GroceryList :items="items" />
      </TabViewItem>
      <TabViewItem title="UnDone">
         <GroceryList :items="onFilterUndone" />
      </TabViewItem>
      <TabViewItem title="Done">
         <GroceryList :items="onFilterDone" />
      </TabViewItem>
    </TabView>
  </Page>
</template>
<script>

import GroceryList from "./GroceryList";
import AddItem from "./AddItem";


export default {
  components: { GroceryList },
  data() {
    return {
      
    };
  },
  methods: {
    onAddTap() {
      this.$showModal(AddItem, {}).then(newItem => {
        if (newItem) {
          console.log(newItem);
          this.$store.dispatch("insert", newItem);
        }
      });
    },
  },
  created() {
    this.items = this.$store.getters.todoItems;
  },
  computed: {
    onFilterDone: function() {
      return this.items.filter(item => item.done);
    },
    onFilterUndone: function() {
      return this.items.filter(item => !item.done);
    }
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #53ba82;
  color: #ffffff;
}

.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
</style>
