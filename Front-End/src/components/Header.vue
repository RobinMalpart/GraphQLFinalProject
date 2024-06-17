<template>
    <header class="bg-[#385999] justify-center flex">
        <div class="flex flex-row justify-between container">
            <div class="flex flex-row">
                <div class="inline me-1">
                    <img class="h-12 w-32" src="../assets/logo.png" alt="Logo Facebook">
                </div>
                <div class="flex flex-row h-8 w-24 my-auto text-[#284184] ms-1 ">
                    <UsersIcon class="hover:text-slate-50 ease-out duration-300" />
                    <ChatBubbleLeftRightIcon class="mx-2 hover:text-slate-50 ease-out duration-300" />
                    <GlobeAmericasIcon class="hover:text-slate-50 ease-out duration-300" />
                </div>
            </div>

            <div class="inline-flex flex-row my-auto">
                <input class="h-8 w-96 rounded-l-lg" type="text" placeholder=" Search on Facebook">
                <div class="bg-white inline my-auto p-1 rounded-r-lg">
                    <MagnifyingGlassIcon class="h-6 w-6 text-slate-400" />
                </div>
            </div>

            <div class="inline-flex flex-row my-auto">
                <button class="bg-[#3b5998] text-white">Home</button>
                <button class="bg-[#3b5998] text-white mx-3">Profile</button>
                <button class="bg-[#3b5998] text-white">Account</button>
            </div>
        </div>
    </header>
</template>

<script>
import { UsersIcon } from '@heroicons/vue/24/outline'
import { ChatBubbleLeftRightIcon } from '@heroicons/vue/24/outline'
import { GlobeAmericasIcon } from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
export default {
    name: 'Header',
    components: {
        UsersIcon,
        ChatBubbleLeftRightIcon,
        GlobeAmericasIcon,
        MagnifyingGlassIcon
    }
}
</script>

<style scoped>

</style>