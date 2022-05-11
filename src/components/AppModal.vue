<template>
  <div class="modal-backdrop" @click="$emit('close')"></div>
  <div class="modal">
    <h3>Вы хотите удалить эту задачу</h3>
    <div>
      <button class="btn primary" @click="$emit('sendConfirm', false)">Не удалять</button>
      &nbsp;&nbsp;
      <button class="btn danger" @click="$emit('sendConfirm', true)">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['close', 'sendConfirm']
}
</script>