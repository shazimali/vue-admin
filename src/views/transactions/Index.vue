<template>
    <div class="transactions">
          <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
              <h3>Transactions</h3>
          </v-subheader>
          <v-row>
            <v-col  cols="12" sm="12" >
                <v-card class="max-auto">
                    <v-form>
    <v-container>

      <v-row>
        <v-col
          cols="12"
          md="6"
        >
          <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Select transaction date"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-select
          v-model="country"
          :items="allCountries"
          label="Countries"
          hint="Please select country"
          persistent-hint
          outline
        ></v-select>
        </v-col>
       <v-col
          cols="12"
          md="6"
        >
        <v-select
          v-model="user"
          :items="allUsers"
          label="Users"
          hint="Please select user"
          persistent-hint
          outline
        ></v-select>
        </v-col>
        <v-col>
                    <v-btn color="success" class="mt-3" @click="search">search  </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
                </v-card>
            </v-col>
        </v-row>
          <v-row>
                <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-card-title>Transactions List</v-card-title>
          <v-data-table 
              :headers="headers"
              :items="allTransactions"
              :items-per-page=5
              :loading="loading"
              :server-items-length="totalTransactions"
              @pagination="pagination"
              class="elevation-1"
              :footer-props="{
                  'itemsPerPageOptions': [5,10,15]
              }"
          >
          </v-data-table>
        </v-card>
      </v-col>
          </v-row>
    </div>
  </template>
  
  <script>
  import TransactionDataService from "../../services/TransactionDataService";
  import { setCountries, setUsers } from "../../constants";
  export default {
      name: "transaction",
      data() {
          return {
            date: '',
            user:'',
            country:'',
            menu: false,
            modal: false,
            menu2: false,
            allTransactions:[],
            allUsers:[],
            allCountries:[],
            totalTransactions:0,
            loading: false,
              headers: [
                  { text: "Account#", align: "start",value: "account_id" },
                  { text: "Amount", value: "amount"},
                  { text: "Created At", value: "created_at"},
                  { text: "Country", value: "country"},
                  { text: "User", value: "user"},
              ]
          }
      },
      methods : {
          retriveTransactions($event){
            TransactionDataService.getAll($event.page,$event.itemsPerPage,this.country,this.user,this.date)
              .then((response) => {
                console.log(response.data.response.transactions.data);
              this.allTransactions = response.data.response.transactions.data.map(this.getDisplayTransactions);
              this.totalTransactions = response.data.response.transactions.total;
              this.allUsers = setUsers(response.data.response.users);
              this.allCountries = setCountries(response.data.response.countries);
              this.loading=false;
              })
              .catch((e) => {
                this.$store.dispatch('alert','error');
                this.$store.dispatch('alertMessage',e);
              });
          },
          pagination($event) {
              this.loading=true;
              this.retriveTransactions($event);
          },
          getDisplayTransactions(transaction) {
            return {
                account_id: transaction.account_id,
                amount: transaction.amount,
                created_at: transaction.created_at,
                country: transaction.country.country_name,
                user: transaction.user.name,
            };
          },
          search(){
            console.log(this.user);
            TransactionDataService.getAll(1,5,this.country,this.user,this.date)
              .then((response) => {
                console.log(response.data.response.transactions.data);
              this.allTransactions = response.data.response.transactions.data.map(this.getDisplayTransactions);
              this.totalTransactions = response.data.response.transactions.data.total;
              this.allUsers = setUsers(response.data.response.users);
              this.allCountries = setCountries(response.data.response.countries);
              this.loading=false;
              })
              .catch((e) => {
                this.$store.dispatch('alert','error');
                this.$store.dispatch('alertMessage',e);
              });
          }
      },
  
  
  }
  </script>