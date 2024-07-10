// vue 2 way
// export const useCounterStore  = defineStore('counter1', {
//   state: () => ({ count: 0, name: "Akinola"}),
//   getters: {
//     doubleCount: (state) => state.count * 2
//   },
//   actions: {
//     increment () {
//       this.count++
//     }
//   }
// });

export const useCounterStore = defineStore('counter1', () => {
  const count = ref(0);
  const name =  ref("Akinola");
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value = count.value + 1
  }

  return { count, name, doubleCount, increment, }
})