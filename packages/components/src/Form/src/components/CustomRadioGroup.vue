<template>
  <a-radio-group v-model:value="state" class="custom-radio" @change="handleChange">
    <a-radio v-for="(item, index) in options" :key="index" :value="item.value">
      <img class="icon" v-if="item.icon" :src="item.icon" />
      <span class="label" v-if="!item.icon">{{ item.label }}</span>
    </a-radio>
  </a-radio-group>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref, watchEffect, watch } from 'vue';
  import { RadioGroup, Radio } from 'ant-design-vue';
  import { useRuleFormItem } from '/@/hooks/component/useFormItem';

  type OptionsItem = { icon: string; label: string; value: string; disabled?: boolean };

  export default defineComponent({
    name: 'CustomeSelect',
    components: {
      ARadioGroup: RadioGroup,
      ARadio: Radio,
    },
    inheritAttrs: false,
    props: {
      value: {
        type: [String, Number, Boolean] as PropType<string | number | boolean>,
      },
      options: {
        type: Array as PropType<OptionsItem[]>,
        default: () => [],
      },
    },
    emits: ['options-change', 'change', 'update:value'],
    setup(props, { emit }) {
      const emitData = ref<any[]>([]);

      // Embedded in the form, just use the hook binding to perform form verification
      const [state] = useRuleFormItem(props, 'value', 'change', emitData);

      watchEffect(() => {});

      watch(
        () => state.value,
        (v) => {
          emit('update:value', v);
        },
      );

      function handleChange(_, ...args) {
        console.log(args);
        emitData.value = args;
      }

      return { state, handleChange };
    },
  });
</script>
<style scoped lang="less">
  .custom-radio {
    display: flex;
    flex-wrap: wrap;
    .icon {
      display: block;
      height: 35px;
    }
    ::v-deep .ant-radio-wrapper {
      display: flex;
      align-items: center;
    }
  }
</style>
