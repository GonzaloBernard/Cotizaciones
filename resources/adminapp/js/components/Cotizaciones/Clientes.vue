<template>
<div>
<span v-for="cliente in row.clientes" :key="cliente.id">
{{cliente.nombre}}
</span>
</div>
</template>

<script>
export default {
props: ['row'],
}
</script>

<style>

</style>
