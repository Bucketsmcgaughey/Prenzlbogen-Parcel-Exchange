<template>
  <v-container>

    <v-card class="mx-auto pa-4" max-width="500">
      <div class="dark-header py-4">
        <h2>{{ $t('WELCOME') }}</h2>
      </div>
      <v-tabs v-model="tab" align-tabs="center" fixed-tabs>
        <v-tab value="signin" :text="$t('SIGN_IN')" />
        <v-tab value="signup" :text="$t('SIGN_UP')" />
      </v-tabs>
      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="signin">
          <NUsersLoginForm @success="handleLoginSuccess">
            <template #header>
              <p></p>
            </template>
            <!--- <template #email-field>
              <v-text-field v-model="formData.email" :placeholder="$t('YOUR_EMAIL_ADDRESS')"
                :label="$t('YOUR_EMAIL_ADDRESS')" variant="outlined" />
            </template>
            <template #password-field>
              <v-text-field v-model="formData.password" type="password" :placeholder="$t('YOUR_PASSWORD')"
                :label="$t('YOUR_PASSWORD')" variant="outlined" />
            </template> -->
            <template #submit-button>
              <v-btn block type="submit" class="brand-submit-btn" :disabled="isLoading">
                <span v-if="isLoading">Signing in...</span>
                <span v-else>{{ $t('SIGN_IN') }}</span>
              </v-btn>
            </template>
          </NUsersLoginForm>
          <!-- <v-form class="pa-4">
            <v-text-field v-model="email" :placeholder="$t('YOUR_EMAIL_ADDRESS')" :label="$t('YOUR_EMAIL_ADDRESS')"
              variant="outlined" />
            <v-text-field v-model="password" type="password" :placeholder="$t('YOUR_PASSWORD')"
              :label="$t('YOUR_PASSWORD')" variant="outlined" />
            <v-btn block type="submit" class="brand-submit-btn" :disabled="isLoading" @click="">
              <span v-if="isLoading">{{ $t('SIGNING_IN') }}</span>
              <span v-else>{{ $t('SIGN_IN') }}</span>
            </v-btn>
          </v-form> -->
        </v-tabs-window-item>
        <v-tabs-window-item value="signup">
          <p class="pa-4">{{ $t('SIGN_UP_BENEFITS') }}</p>
          <NUsersRegisterForm />
          <!-- <v-form class="pa-4">
            <v-text-field v-model="surname" :placeholder="$t('YOUR_SURNAME')" :label="$t('YOUR_SURNAME')"
              variant="outlined" />
            <v-text-field v-model="email" :placeholder="$t('YOUR_EMAIL_ADDRESS')" :label="$t('YOUR_EMAIL_ADDRESS')"
              variant="outlined" />
            <v-text-field v-model="password" type="password" :placeholder="$t('YOUR_PASSWORD')"
              :label="$t('YOUR_PASSWORD')" variant="outlined" password />
            <v-btn block class="brand-submit-btn" :disabled="isLoading" @click="createNewUser">
              <span v-if="isLoading">{{ $t('SIGNING_IN') }}</span>
              <span v-else>{{ $t('SIGN_UP') }}</span>
            </v-btn>
          </v-form> -->
        </v-tabs-window-item>
      </v-tabs-window>

    </v-card>

  </v-container>
</template>

<script setup>
import { useAuthentication } from '#imports'

const { login } = useAuthentication()
const isLoading = ref(false)

const email = ref("")
const password = ref("")
const surname = ref("")
// const hausnummer = ref("")
// const klingel = ref("")

const tab = ref("signin")
const tabs = [
  {
    text: "$t('SIGN_IN')",
    value: "signin"
  },
  {
    text: "$t('SIGN_UP')",
    value: "signup"
  }
]

const handleLoginSuccess = (user) => {
  login(user)
  // Redirect to dashboard or home page
  navigateTo('/dashboard')
}

async function createNewUser() {
  const newUser = await createUser({
    email: email.value,
    name: surname.value,
    password: 'password.value',
    role: 'user',
    active: true
  })
  console.log('New user', newUser)
}


</script>

<style></style>