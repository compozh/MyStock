<template lang="pug">
  table
    tr
      th(v-for="header in columnHeaders") {{ header }}
    tr(v-for="operation in operations")
      td(v-for="(field, key) in operation"
         v-show="key !== '_id'"
         :style="getColor(operation, field)") {{ field }}
      td(class="actions")
        i(class="far fa-plus-square" title="details")
        i(class="fas fa-edit" title="edit")
        i(class="far fa-clone" title="copy")
        i(class="far fa-trash-alt"
          @click="operationRemove($event)"
          title="delete")
</template>

<script>
  // Event Bus
  import { eventEmitter } from "../index";

  export default {
    name: "operationTable",
    data() {
      return {
        operations: '',
        operationResource: '',
        columnHeaders: ['Дата', 'Операция', 'Статья', 'Счет', 'Сумма', 'Коментарий', 'Действия']
      }
    },
    created() {
      this.operationResource = this.$resource('operations');
      eventEmitter.$on('operationsUpdate', this.getData);
      this.getData();
    },
    methods: {
      getData() {
        this.operationResource.get().then(res => this.operations = res.body);
      },
      operationRemove(event) {
        const id = event.target.parentElement.parentNode.firstChild.innerHTML;
        this.operationResource.delete('operations', { id })
          .then(() => this.getData());
        this.getData();
      },
      getColor(o, f) {
        if (o.article === 'перемещение' && f >= 0) return "color: blue";
        if (o.type === 'расход' && f >= 0) return "color: red";
        if (o.type === 'приход' && f >= 0) return "color: green";
      },
    }
  }
</script>

<style scoped>

  table {
    width: 95%;
    margin: 20px;
    border-collapse: collapse;
    box-shadow: 0 0 8px 0 #808080;
    background: white;
  }

  table tr:nth-child(odd) {
    background: #eeeeee;
  }

  table tr:hover {
    background: #d2d2d2;
    cursor: pointer;
  }

  table td, table th {
    padding: 5px;
    border: 1px solid #b0b0b0;
    text-align: center;
    font-size: 12px;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100px;
  }

  table th {
    background: lightgoldenrodyellow;
  }

  table td {

  }

  table td i {
    margin: 0 3px;
    cursor: pointer;
  }

  table td i.far.fa-plus-square:hover {
    color: green;
  }

  table td i.fas.fa-edit:hover {
    color: orange;
  }

  table td i.far.fa-clone:hover {
    color: blue;
  }

  table td i.far.fa-trash-alt:hover {
    color: red;
  }

</style>
