<script lang="ts" setup>
import {defineComponent} from 'vue';
import {Button as AntButton} from 'ant-design-vue';
import {isNullOrUnDef, calcAdd} from '@common-utils/utils';

function handleClick() {
  console.log(123123);
  console.log('isNullOrUnDef1===', isNullOrUnDef(null));
  console.log('isNullOrUnDef2===', isNullOrUnDef(123));
  console.log('calcAdd===', calcAdd(0.1, 0.2));
}
</script>

<template>
  <div class="antButton">
    <AntButton @click="handleClick">按钮</AntButton>
  </div>
</template>

<style lang="less" scoped>
.antButton {
  padding: 20px;
  background-color: burlywood;
}
</style>
