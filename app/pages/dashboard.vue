<script setup>
// import { v4 as uuidv4 } from 'uuid'
// import { useCloned } from '@vueuse/core'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const { user, initializeUser } = useAuthentication()
initializeUser()
const updated = ref(false)

const { data: residents } = await useFetch('/api/residents')
const resident = ref(getResidentData())
function getResidentData() {
  let res = residents.value.find((r) => r.email === user.value.email)
  if (!res) {
    res = {
      surname: "",
      email: "",
      hausnummer: "",
      floor: "",
      klingel: ""
    }
  }
  return res
}
const parcels = ref(await getParcelData())

async function getParcelData() {
  const { data: parcels } = await useFetch('/api/parcels', {
    query: {
      email: user.value.email,
      is_collected_yet: false
    }
  })
  for (let parcel of parcels.value) {
    const holder = residents.value.find((resident) => resident.email = parcel.current_holder)
    parcel.current_holder = holder
  }
  return parcels.value
}

async function updateResident() {
  console.log('sending', resident.value)
  const result = await $fetch('/api/residents', {
    method: 'PATCH',
    body: {
      surname: resident.value.surname,
      email: resident.value.email,
      hausnummer: resident.value.hausnummer,
      floor: resident.value.floor,
      klingel: resident.value.klingel
    }
  })
  if (result.success) {
    updated.value = true
  } else {

  }
}

if (!user.value) {
  navigateTo('/login')
}
</script>

<template>
  <v-container>
    <p class="text-h4 py-4">{{ $t('YOUR_PARCELS') }}</p>
    <v-card v-if="parcels && parcels.length > 0">
      <v-table>
        <thead>
          <tr>
            <th>{{ $t('DATUM') }}</th>
            <th>{{ $t('HAUSNUMMER') }}</th>
            <th>{{ $t('ETAGE') }}</th>
            <th>{{ $t('KLINGEL') }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="parcel in parcels">
            <td>{{ dayjs(parcel.date_created).fromNow() }}</td>
            <td>{{ parcel.current_holder.hausnummer }}</td>
            <td>{{ parcel.current_holder.floor }}</td>
            <td>{{ parcel.current_holder.klingel }}</td>
            <td><v-btn color="secondary" class="py-2" @click="parcelCollected(parcel.id)">Got it!</v-btn></td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <v-card v-else><v-empty-state headline="Sorry!" title="Nobody has any parcels for you at the moment."
        text="If you're looking for a missing parcel, hopefully your neighbour will let you know they have it soon." /></v-card>
    <div class="text-h4 py-4">{{ $t('GOT_A_PARCEL') }}</div>
    <p>{{ $t('GOT_A_PARCEL_PARA') }}</p>

    <v-card class="pa-4">
      <v-autocomplete :items="residents" item-title="surname" item-value="email" />
    </v-card>
    <v-navigation-drawer location="right" permanent>
      <v-form class="pa-2">
        <v-text-field v-model="resident.surname" placeholder="name"></v-text-field>
        <v-text-field v-model="resident.email" placeholder="email"></v-text-field>
        <v-text-field v-model="resident.hausnummer" placeholder="Hausnummer"></v-text-field>
        <v-text-field v-model="resident.floor" placeholder="Etage"></v-text-field>
        <v-text-field v-model="resident.klingel" placeholder="Klingel"></v-text-field>
        <v-btn @click="updateResident" color="primary">Update</v-btn>
      </v-form>
      <div v-if="updated">Successfully updated.</div>
      <div class="py-4">
        <NUsersLogoutLink>Sign out</NUsersLogoutLink>
      </div>
    </v-navigation-drawer>
  </v-container>


</template>