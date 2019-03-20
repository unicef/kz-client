<template>
    <div class="container-fluid">
        <header-component></header-component>
        <router-view></router-view>
    </div>
</template>


<script>
    import HeaderComponent from '@/layouts/HeaderComponent';
    import UnicefList from '../components/unicef/UnicefList';

    export default {
        components: {
            HeaderComponent,
            UnicefList,
        },
    };
</script>