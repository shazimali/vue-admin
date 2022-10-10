
<template>
  <v-container
    class="spacing-playground"
    fluid
  >
    <v-row>
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Create User</h3>
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
            :counter="20"
            :error-messages="user.name.error"
            label="Name"
            outline
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
        >
          <v-text-field
            v-model="user.email.value"
            :error-messages="user.email.error"
            label="E-mail"
            outline
          ></v-text-field>
        </v-col>
       <v-col
          cols="12"
        >
          <v-text-field
            v-model="user.password.value"
            label="Password"
            type="password"
            :error-messages="user.password.error"
            outline
          ></v-text-field>
        </v-col>
        <v-col>
                    <v-btn color="success" class="mt-3" @click="save">save  </v-btn>
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
    name:"create",
    data() {
    return {
    loadgin:false,
      user: {
        name: {
          value:"",
          error:""
        },
        email: {
          value:"",
          error:""
        },
        password:{
          value:"",
          error:""
        }
      },
    };
  },
    methods: {
    
    save() {
      var data = {
        name: this.user.name.value,
        email: this.user.email.value,
        password:this.user.password.value,
      };

      UserDataService.store(data)
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
    }
  },

}
</script>