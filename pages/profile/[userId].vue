<template>
    <div class="container mx-auto pt-32">
        <div>

            <div class="bg-white relative shadow rounded-lg w-5/6 md:w-5/6 lg:w-4/6 xl:w-3/6 mx-auto">
                <div class="relative flex justify-center">
                    <Icon name="material-symbols:person" :color="user?.status?.name === 'active' ? 'green' : 'gray'"
                        size="150"
                        class="rounded-full bg-white p-5 mx-auto absolute -top-20 w-32 h-32 shadow-md transition duration-200 transform hover:scale-110" />
                </div>

                <div class="mt-16">
                    <h1 class="font-bold text-center text-3xl text-gray-900">{{ user?.mobile }}</h1>
                    <p class="text-center text-sm text-gray-400 font-medium">{{ user?.created_at }}</p>

                </div>
                <form @submit.prevent="subForm" class="flex flex-col p-8 [&>input]:border-green-500">
                    <!-- first and last name -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input v-model="form.first_name" type="text" placeholder="نام"
                            class="border p-2 rounded w-full focus:border-b-slate-400">
                        <input v-model="form.last_name" type="text" placeholder="نام خانوادگی"
                            class="border p-2 rounded w-full focus:border-b-slate-400">
                    </div>
                    <!-- gender -->
                    <div class="mb-4 flex flex-row">
                        <div v-for="(gender, i) in genders" :key="i" class="flex items-center me-4 ">
                            <input v-model="form.gender_id" :id="gender?.id" type="radio" :value="gender?.id" name="genders"
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:shadow-none cursor-pointer">
                            <label :for="gender?.id" class="ms-2 text-sm font-medium text-gray-700 cursor-pointer">{{
                                gender?.title }}</label>
                        </div>
                    </div>

                    <!-- grades and major -->
                    <div class="mb-4 grid grid-cols-2 gap-4">
                        <!-- grades -->
                        <div class="flex flex-col text-sm text-gray-700">
                            <p class="py-2">مقطع تحصیلی</p>
                            <select v-model="form.grade_id" class="bg-white border px-2 h-12 rounded ">
                                <option selected value="0">انتخاب مقطع تحصیلی</option>
                                <option v-for="grade in grades" :key="grade?.id" :value="grade?.id">{{ grade?.title }}
                                </option>
                            </select>
                        </div>
                        <!-- major -->
                        <div class="flex flex-col text-sm text-gray-700">
                            <p class="py-2">رشته تحصیلی</p>
                            <select v-model="form.major_id" class="bg-white border px-2 h-12 rounded ">
                                <option selected value="0">انتخاب رشته</option>
                                <option v-for="major in majors" :key="major?.id" :value="major?.id">{{ major?.title }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <!-- provinces and cites -->
                    <div class="mb-4 grid grid-cols-2 gap-4">
                        <!-- provinces -->
                        <div class="flex flex-col text-sm text-gray-700">
                            <p class="py-2">استان</p>
                            <select v-model="form.province" class="bg-white border px-2 h-12 rounded ">
                                <option selected value="0">انتخاب استان</option>
                                <option v-for="province in provinces" :key="province?.id" :value="province">{{
                                    province?.title }}
                                </option>
                            </select>
                        </div>
                        <!-- cites -->
                        <div class="flex flex-col text-sm text-gray-700">
                            <p class="py-2">شهر</p>
                            <select v-model="form.shahr_id"
                                class="bg-white border px-2 h-12 rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
                                :disabled="!form.province?.id">
                                <option selected value="0">انتخاب شهر</option>
                                <option v-for="city in filteredCities" :key="city?.id" :value="city?.id">
                                    {{ city?.title }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
                        <input v-model="form.school" type="text" placeholder="نام مدرسه"
                            class="border p-2 rounded w-full focus:border-b-slate-400">
                    </div>
                    <button type="submit" id="theme-toggle"
                        class="w-full mx-auto px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                        save
                    </button>
                    <button @click.prevent="logout">
                        <Icon name="material-symbols:exit-to-app"
                            class="text-2xl text-red-700 w-full mt-5 cursor-pointer" />
                    </button>
                </form>
            </div>

        </div>
    </div>
</template>

<script setup>
definePageMeta({
    middleware: 'auth',
})

const URL = "https://alaatv.com/api/v2/"
const form = reactive({
    first_name: "",
    last_name: "",
    gender_id: "",
    grade_id: "",
    major_id: "",
    address: "",
    shahr_id: "",
    school: "",

    province: "",
    pending: false
})
const { userId } = useRoute()?.params
const user = ref(null)
const { data: resInfo, error } = await useAsyncData(() => $fetch(`${URL}megaroute/getUserFormData`))
const { data: resUser, error: userError } = await useAsyncData(async () => await useIFetch(`${URL}user/${userId}`, true, "GET"))

const { cities, genders, grades, majors, provinces } = resInfo?.value?.data

// get users
if (resUser.value?.data?.data) {
    user.value = toRaw(resUser.value?.data?.data)
    form.first_name = user.value?.first_name
    form.last_name = user.value?.last_name
    form.gender_id = user.value?.gender_id
    form.grade_id = user.value?.grade_id
    form.major_id = user.value?.major_id
    form.address = user.value?.address
    form.shahr_id = user.value?.shahr_id
    form.school = user.value?.school
    // form.province = user?.province
} else {
    console.log(userError.value)
}


const filteredCities = computed(() => {
    return form.province?.id ? cities.filter(city => city.province.id === form.province?.id) : []
})

const setAddressFromProvince = () => { form.address = form.province?.title }

const subForm = async () => {
    setAddressFromProvince()
    form.pending = true
    const { data: resData, error, status } = await useIFetch(`${URL}user/${user?.id}`, true, "PUT", JSON.stringify(form))

    form.pending = false
    if (status.value === "success") {
        // todo set data in form
        console.log(resData.value);
    } else {
        console.log(error);
        // todo expire token and redirect to login page
    }
}

const logout = async () => {
    refreshCookie("user")
    refreshCookie("token")
    const userCookie = useCookie("user")
    const token = useCookie("token")
    token.value = null
    userCookie.value = null
    return navigateTo("/login")
}

</script>
