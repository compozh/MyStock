<template lang="pug">
  div
    div(class="header-block")
      div(class="label")
        div(class="label-left")
        div(class="label-right")
      a(class="logo") My
        span Stock
      div(class="search-field")
        button(class="btn-select") All Documents
        input(class="inp-search" type="text" placeholder="Search documents")
        button(class="btn-search")
          i(class="fas fa-search")
      div(class="user-field")
        a(:href="user.loginUrl") Log in
        a(:href="user.signupUrl") Sign up
        a(:href="user.currentUser")
    div(class="nav-bar")
      nav(class="main-menu")
        ul(class="main-menu-list")
          li(class="main-menu-item" v-for="(item, index) in menu")
            a(:href="item.link"
            :class="{ active: currentMenuItem === index }"
            @click="currentMenuItem = index") {{ item.title }}
</template>

<script>
    export default {
      name: "headerBlock",
      data() {
          return {
            user: {
              loginUrl: '#',
              signupUrl: '#',
              currentUser: '#'
            },
            menu: [
              { title: 'Home', link: '#' },
              { title: 'CashFlow', link: '#' },
              { title: 'Operations', link: '#' },
              { title: 'Charges', link: '#' },
              { title: 'Profit', link: '#' },
              { title: 'Budget', link: '#' },
              { title: 'Plan', link: '#' }
            ],
            currentMenuItem: ''
          }
      },
      methods: {

      }
    }
</script>

<style scoped>

  .header-block, .nav-bar {
    font-family: "Century Gothic", sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #808080;
    max-width: 100%;
    height: 40px;
    padding: 0 20px;
    color: #fff;
  }

  .header-block .label {
    position: relative;
    width: 40px;
    height: 40px;
  }

  .header-block .label-left,
  .header-block .label-right {
    position: absolute;
    top: 0;
    width: 39px;
    height: 39px;
    background: no-repeat center;
    background-size: 35px;
  }

  .header-block .label-left {
    background-image: url("../assets/Logo_left.png");
  }

  .header-block .label-right {
    background-image: url("../assets/Logo_right.png");
  }

  .label-right:hover {
    -webkit-transform: rotate(-360deg);
    -webkit-transition-timing-function: ease;
    -webkit-transition-duration: 1.8s;
  }

  .header-block .logo {

    text-shadow: 0 0 1px #0c0c0c80;
    font-size: 30px;

    display: flex;
    align-items: center;
    flex-grow: 1;
    text-decoration: none;
  }

  .header-block .logo span {
    color: #f8972b;
  }

  .header-block .search-field {
    flex-grow: 2;
  }

  .header-block .search-field .btn-select,
  .header-block .search-field .inp-search,
  .header-block .search-field .btn-search {
    cursor: pointer;
    outline: none;
    font-size: 11px;
    border: 0;
    background-color: #f5f5f5;
    height: 28px;
    border-radius: 2px 0 0 2px;
    box-sizing: border-box;
    width: 25%;
  }

  .header-block .search-field .inp-search {
    border-radius: 0;
    border-left: 1px solid #cecece;
    padding: 0 24px 0 7px;
    color: gray;
    cursor: text;
    width: 65%;
  }

  .header-block .search-field .btn-search {
    border-radius: 0 2px 2px 0;
    border-left: 1px solid #cecece;
    width: 10%;
  }

  .header-block .user-field {
    flex-grow: 1;
    text-align: right;
  }

  .header-block .user-field a {
    margin: 0 5px;
    text-decoration: none;
    color: #fff;
  }

  .nav-bar {
    background-color: #f5f5f5;
    border-bottom: 1px solid #cecece;
    display: flex;
    justify-content: center;
    box-shadow: 0 2px 2px 0 #b1b1b16b;
  }

  .nav-bar .main-menu {

  }

  .nav-bar .main-menu .main-menu-list {
    display: flex;
    margin: 0;
    height: 40px;
    padding: 0;
  }

  .nav-bar .main-menu .main-menu-item {
    list-style: none;
  }

  .nav-bar .main-menu .main-menu-item a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #555;
    line-height: 26px;
    font-size: 14px;
    height: 100%;
    padding: 0 10px;
  }

  .nav-bar .main-menu .main-menu-item a:hover {
    background-color: #dfdfdf;
  }

  .active {
    color: #f8972b !important;
    border-bottom: 2px solid #808080;
    box-sizing: border-box;
  }

</style>
