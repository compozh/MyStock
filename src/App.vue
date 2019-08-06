<template lang="pug">
  div(id="app")
    header-block
    operation-popup
    operation-table
</template>

<script>

  // Import components
  import testing from './components/testing';
  import headerBlock from './components/headerBlock';
  import operationPopup from './components/operationPopup';
  import operationTable from './components/operationTable';

  export default {
    name: 'app',
    data() {
      return {

      }
    },
    components: {
      testing,
      headerBlock,
      operationPopup,
      operationTable
    }
  }

</script>

<style>
  #app {
    font-family: 'Avenir', sans-serif;
    font-size: 14px;
    color: #555;
  }

  h1, h2 {
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

</style>
