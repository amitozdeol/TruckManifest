<template>
    <header v-if="title" class="is-clearfix mb-3">
        <div class="cats is-pulled-right has-text-right">
            <small>
                <span v-if="right-title">{{right-title}}<br></span>
                <span v-if="right-subtitle" class="has-text-weight-bold has-text-white">{{right-subtitle}}</span>
            </small>
        </div>
        <div>
            <h2>{{title}}</h2>
            <small v-if="subtitle">{{subtitle}}</small>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        title: String,
        subtitle: String,
        'right-title': String,
        'right-subtitle': String
    }
}
</script>

<style>

</style>
