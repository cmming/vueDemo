import { shallowMount } from '@vue/test-utils'
import RightPanel from '@/components/RightPanel/index.vue'

describe('index.vue', () => {
  test('测试参数传入', () => {
    const clickNotClose = true
    const wrapper = shallowMount(RightPanel, {
      propsData: { clickNotClose }
    })
    console.log(wrapper)
    // expect(wrapper.text()).toMatch(clickNotClose)
  })
})
