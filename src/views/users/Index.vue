<template>
  <div class="users">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Users</h3>
            <v-btn color="success" to="./users/create">
                Create User
            </v-btn>
        </v-subheader>
        <br>
    <br>
        <v-row>
              <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Users List</v-card-title>
        <v-data-table 
            :headers="headers"
            :items="allUsers"
            :items-per-page=5
            :loading="loading"
            :server-items-length="totalUsers"
            @pagination="pagination"
            class="elevation-1"
            :footer-props="{
                'itemsPerPageOptions': [5,10,15]
            }"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editUser(item.id)">mdi-pencil</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
        </v-row>
  </div>
</template>

<script>
import UserDataService from "../../services/UserDataService";
export default {
    name: "users",
    data() {
        return {
            allUsers:[],
            totalUsers:0,
            loading: false,
            headers: [
                { text: "Name", align: "start",value: "name" },
                { text: "Email", value: "email"},
                { text: "Actions", value: "actions", sortable: false },
            ]
        }
    },
    methods : {
        retriveUsers($event){
          UserDataService.getAll($event.page,$event.itemsPerPage)
            .then((response) => {
            this.allUsers = response.data.response.data.map(this.getDisplayUser);
            this.totalUsers = response.data.total;
            this.loading=false
            })
            .catch((e) => {
              this.$store.dispatch('alert','error');
              this.$store.dispatch('alertMessage',e);
            });
        },
        pagination($event) {
            this.loading=true;
            this.retriveUsers($event);
        },
        editUser(id){
          this.$router.push('/users/'+id)
        },
        getDisplayUser(user) {
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        };
        }

    },


}
</script>