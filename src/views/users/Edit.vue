
<template>
  <v-container
    class="spacing-playground"
    fluid
  >
    <v-row>
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Edit User</h3>
        </v-subheader>
            <v-col  cols="12" sm="12" >
                <v-card class="max-auto">
                    <v-form>
    <v-container>

      <v-row>
        <v-col
          cols="12"
      
        >
          <v-text-field
            v-model="user.name.value"
            :error-messages="user.name.error"
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
   
        >
          <v-text-field
            v-model="user.email.value"
            :error-messages="user.email.error"
            disabled    
            label="E-mail"
          ></v-text-field>
        </v-col>
       <v-col
          cols="12"
        >
          <v-text-field
            v-model="user.password.value"
            label="Password"
            hint="please enter password for new password"
            type="password"
            :error-messages="user.password.error"
          ></v-text-field>
        </v-col>
        <v-col>
                    <v-btn color="success" class="mt-3" @click="save">Update</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
                </v-card>
            </v-col>
        </v-row>
  </v-container>
</template>
<script>
import UserDataService from '../../services/UserDataService';

export default {
    name:"edit",
    data() {
    return {
    loadgin:false,
      user: {
          id:this.$route.params.id,
        name: {
          value:"",
          error:""
        },
        email: {
          value:"",
          error:""
        },
        status:"",
        password:{
          value:"",
          error:""
        },
        
      },
    };
  },
    methods: {
    save() {
      var data = {
        id: this.user.id,
        name: this.user.name.value,
        email: this.user.email.value,
        password:this.user.password.value,
      };
      UserDataService.update(this.user.id,data)
        .then((response) => {
          this.$store.dispatch('alert','success');
          this.$store.dispatch('alertMessage',response.data.response);
          this.$router.push('/users');
        })
        .catch((e) => {
          this.$store.dispatch('alert','error');
          this.$store.dispatch('alertMessage',e.response.data.response);
          this.user.name.error = e.response.data.response.name ? e.response.data.response.name.Name : ''
          this.user.email.error = e.response.data.response.email ? e.response.data.response.email.Email : ''
          this.user.password.error = e.response.data.response.password ? e.response.data.response.password.Password : ''
        });
    },
    retriveUserDetails(id){
      UserDataService.edit(id)
            .then((response) => {
            this.user.name.value = response.data.response.name;
            this.user.email.value = response.data.response.email;
            this.loading=false;
            })
            .catch((e) => {
              this.$store.dispatch('alert','error');
              this.$store.dispatch('alertMessage',e);
            });
    },
  },
  ready: function(id) {
    this.user.id = id;
},
  mounted(){
    this.retriveUserDetails(this.user.id)
  }

}
</script>