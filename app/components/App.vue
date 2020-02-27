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
import groceryData from "../grocery-data.json";
import GroceryList from "./GroceryList";
import AddItem from "./AddItem";

export default {
  components: { GroceryList },
  data() {
    return {
      items: groceryData.groceryItems,
    };
  },
  methods: {
    onAddTap() {
      const newId = new Date().getTime();
      this.$showModal(AddItem, {
        props: { id: newId }
      }).then(newItem => {
        if (newItem) {
          this.items.unshift(newItem);
        }
      });
    },
  },
  computed: {
    all: function() {
      this.items;
    },
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
