<template lang="pug">
  div
    form(class="popup")
      label(class="date")
        i(class="far fa-calendar-alt")
        | Дата операции:
        input(type="date"
              v-model="operationDate")
      hr
      ul(class="operations-types")
        li(v-for="type in operationsTypes")
          label(:style="getNoActiveStyle(!operationDate)")
            input(type="radio"
                  :value="type"
                  @click="description = ''"
                  v-model="operationSelected"
                  :disabled="!operationDate")
            | {{ type }}

      select(class="articles"
             v-if="operationSelected !== 'перемещение'"
             v-model="articleSelected"
             :disabled="!operationSelected"
             :style="getNoActiveStyle(!operationSelected)")
        option(disabled value="") Выберите статью
        option(v-for="article in articles") {{ article }}

      ul(class="accounts"
         v-if="operationSelected !== 'перемещение'")

        li(v-for="item in accounts")
          label(:style="getNoActiveStyle(!articleSelected)")
            input(type="checkbox"
                  :value="item.account"
                  v-model="accountsChecked"
                  :disabled="!articleSelected")
            | {{ item.account }}
          input(type="number" min=0
                v-model.number="item.cost"
                v-if="accountsChecked.some(i => i === item.account)")

      div(class="transfer" v-else)
        label(class="transfer") Со счета:
          select(class="transfer"
                 v-model="transfer.fromAccount")
            option(disabled value="") Выберите счет
            option(v-for="item in accounts"
                   :disabled="item.account === transfer.toAccount")
              | {{ item.account }}
        label(class="transfer") На счет:
          select(class="transfer"
                 v-model="transfer.toAccount"
                 :disabled="!transfer.fromAccount"
                 :style="getNoActiveStyle(!transfer.fromAccount)")
            option(disabled value="") Выберите счет

            option(v-for="item in accounts"
                   :disabled="item.account === transfer.fromAccount")
              | {{ item.account }}

        label(class="transfer") Сумма перемещения:
          input(type="number" min=0
                class="transfer"
                v-model.number="transferCost"
                :disabled="!transfer.toAccount"
                :style="getNoActiveStyle(!transfer.toAccount)")

      textarea(v-model.trim="description"
               placeholder="введите описание операции"
               :disabled="checkInputCost()"
               :style="getNoActiveStyle(checkInputCost())")

      button(class="reset-btn"
             @click.prevent="clearForm") Очистить
      button(class="submit-btn"
             @click.prevent="submitForm"
            :disabled="checkInputComment()"
            :style="getNoActiveStyle(checkInputComment())") Записать

</template>

<script>
  // Event Bus
  import { eventEmitter } from "../index";

  export default {
    name: "operationPopup",
    created() {
      const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric"
      };
      this.operationDate = new Date()
        .toLocaleString("ru-RU", options)
        .split('.')
        .reverse()
        .join('-');

      this.operationResource = this.$resource('operations');
    },
    data() {
      return {
        operations: [],
        operationDate: '',
        operationSelected: '',
        operationsTypes: ['расход', 'приход', 'перемещение'],
        articleSelected: '',
        articles: ['проезд', 'продукты', 'прочее'],
        accountsChecked: [],
        accounts: [
          { account: 'наличка', cost: ''},
          { account: 'для выплат', cost: ''},
          { account: 'универсальная', cost: ''},
        ],
        transfer: {
          fromAccount: '',
          toAccount: '',
        },
        transferCost: '',
        description: '',
      }
    },
    computed: {

    },
    methods: {
      getDate() {
        return new Date(this.operationDate.split('-').join(','))
          .toLocaleString("ru-RU", {
            day: "numeric",
            month: "numeric",
            year: "numeric"
          });
      },
      getCost(account) {
        let cost = 0;
        this.accounts.forEach(obj => {
          if (obj.account === account) {
            cost = obj.cost.toFixed(2);
          }
        });
        return cost;
      },
      getNoActiveStyle(condition) {
        if (condition) return 'opacity: .5';
      },
      checkInputCost() {
        if (this.operationSelected !== 'перемещение') {
          if (this.accountsChecked.length > 0)
            return !this.accountsChecked
              .every(i => this.accounts
                .some(j => j.account === i && j.cost > 0));
          return true;
        } else {
          return !this.transferCost;
        }
      },
      checkInputComment() {
        if (this.description)
          return (this.checkInputCost() && this.description);
        return true;
      },
      clearForm() {
        this.operationSelected = '';
        this.articleSelected = '';
        this.accountsChecked = [];
        this.accounts.forEach(obj => obj.cost = '');
        this.transfer.fromAccount = '';
        this.transfer.toAccount = '';
        this.transferCost = '';
        this.description = '';
        this.operations = [];
      },
      submitForm() {
        if (this.operationSelected !== 'перемещение') {
          this.accountsChecked.forEach(account => {
            this.operations.push({
              date: this.getDate(),
              type: this.operationSelected,
              article: this.articleSelected,
              account: account,
              cost: this.getCost(account),
              description: this.description
            })
          });
        } else {
          let transferAccounts = Object.keys(this.transfer);
          transferAccounts.forEach((account, index) => {
            this.operations.push({
              date: this.getDate(),
              type: this.operationsTypes[index],
              article: this.operationSelected,
              account: this.transfer[account],
              cost: this.transferCost.toFixed(2),
              description: this.description
            });
          });
        }
        this.operationResource.save({},  this.operations)
          .then(() => {
            eventEmitter.$emit('operationsUpdate');
          });
        this.clearForm();
      }
    },
  }
</script>

<style scoped>

  .popup {
    margin: 10px;
    padding: 10px;
    box-shadow: 0 0 8px 0 #808080;
    background: white;
  }

  hr {
    margin: 10px 0;
  }
  /*applying fonts*/
  input, select, button  {
    font-family: 'Avenir', sans-serif;
    font-size: 14px;
    color: #555;
    padding: 3px 5px;
  }

  .popup label.date {
    display: inline-block;
    font-size: 15px;
  }

  .popup label.date i {
    margin-right: 10px;
  }

  .popup ul {
    margin: 0;
    padding: 0;
    display: flex;
  }

  .popup label {
    display: flex;
    align-items: center;
    margin-right: 24px;
  }

  .popup select.articles {
    margin: -5px 0 15px 0;
    padding: 3px 5px;
    width: 296px;
  }

  .popup label.transfer {
    margin-bottom: 15px;
    width: 293px;
    justify-content: space-between;
  }

  .popup select.transfer {
    margin: 0;
    width: 220px;
  }

  .popup input.transfer {
    width: 100px;
  }

  .popup ul.accounts {
    display: flex;
    flex-direction: column;
  }

  .popup li {
    display: flex;
    height: 21px;
    list-style: none;
    margin-bottom: 10px;
  }

  .popup ul.accounts li label {
    width: 200px;
  }

  .popup textarea {
    width: 287px;
    display: block;
  }

  .popup button {
    width: 100px;
    margin: 15px 94px 10px 0;
    padding: 5px;
  }

  input[type="date"] {
    font-size: 15px;
    border: none;
    padding: 2px 0 2px 13px;
  }

  input[type="radio"],
  input[type="checkbox"] {
    width: 16px;
    height: 17px;
    margin: 0 5px 0 0;
  }

  input[type="number"] {
    width: 68px;
    text-align: center;
  }

</style>
