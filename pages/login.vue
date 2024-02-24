<template>
  <div class="min-h-[100vh] flex flex-col justify-center">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-2xl transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
      </div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">

        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold">Login</h1>
          </div>
          <div class="divide-y divide-gray-200">
            <form @submit.prevent="subFormLogin"
              class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <ul v-if="resForm.errors.length > 0" class="list-disc text-red-700 text-xs mb-7">
                <li v-for="(error, i) in resForm.errors" :key="i">{{ error }}</li>
              </ul>
              <div class="relative">
                <input @input="(e) => form.mobile = e.target.value" tabindex="1" autocomplete="off" id="mobile"
                  name="mobile" type="number"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="mobile" />
                <label for="mobile"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                  Mobile</label>
              </div>
              <div class="relative">
                <input @input="(e) => form.password = e.target.value" tabindex="2" autocomplete="off" id="password"
                  name="password" type="password"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="password" />
                <label for="password"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
              </div>
              <div class="relative">
                <button :disabled="resForm.pending" type="submit" tabindex="3"
                  class="w-full bg-cyan-500 hover:bg-cyan-600 text-white rounded-md px-2 py-1 cursor-pointer disabled:cursor-wait disabled:opacity-60">Submit</button>
              </div>
            </form>
          </div>
          <nuxt-link class="text-cyan-700" to="/">go to home </nuxt-link>
          <span> {{ resData?.value?.data?.asses_token }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'auth',
  // middleware : 'auth'
})

const URL = "https://alaatv.com/api/v2/"
const form = reactive({
  mobile: '',
  password: ''
})

const resForm = reactive({
  pending: false,
  errors: []
})

const handleCookie = async (name,data) => {
  const stringData = JSON.stringify(data)
  await $fetch(`/api/${name}`, {
    method: "post",
    body: {
      cookie: stringData
    }
  })
}



const subFormLogin = async () => {
  resForm.pending = true
  const { data: resData, error, status } = await useLazyFetch(`${URL}login`, {
    method: "post",
    body: {
      "mobile": form.mobile,
      "password": form.password
    }
  })
  resForm.pending = false
  if (status.value === "success") {
    
    const data = toRaw(resData.value)?.data
    const token = data?.access_token
    const user = data?.user

    await handleCookie("token",token)
    await handleCookie("user",user)
    await navigateTo(`/profile/${user?.mobile}`)
  } else {
    resForm.errors = Object.values(error.value.data.errors).flat()
  }

}

</script>
