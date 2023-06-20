<template>
  <v-row>
    <v-col cols="2">
      <v-select
        @update:modelValue="updateSelectFilter"
        v-model="loadFilters.selectFilter"
        clearable
        label="Filter"
        :items="['Completed', 'Uncompleted']"
      ></v-select>
    </v-col>
    <v-col cols="10">
      <v-text-field
        @keyup="updateSearchFilter()"
        v-model="loadFilters.searchFilter"
        label="Search"
      ></v-text-field>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "TaskFilter",
  data: () => ({
    timer: null,
  }),
  computed: mapGetters(["loadFilters"]),
  methods: {
    ...mapActions(["getFilters", "getTasks", "updateFilter"]),

    created() {
      this.getFilters();
    },

    updateSelectFilter(value) {
      this.updateFilter({ selectFilter: value });
      this.getTasks();
    },

    updateSearchFilter() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      
      const searchFilterValue = this.loadFilters.searchFilter;
      this.timer = setTimeout(() => {
        this.updateFilter({ searchFilter: searchFilterValue });
        this.getTasks();
      }, 800);
    },
  },
};
</script>

<style>
</style>