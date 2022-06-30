<template>
<div>
<span v-for="producto in row.cotizacion_productos" :key="producto.id">

{{producto.producto.name}}
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
