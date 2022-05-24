const vm = new Vue({
  el: '#app',
  data: {
    toDos: [],
    newToDo: '',
    beforeEditCache: '',
    editedToDo: null
  },
  mounted () {
    if (localStorage.getItem('toDos')) {
      this.toDos = JSON.parse(localStorage.getItem('toDos'))
    }
  },
  methods: {
    addToDo: function () {
      if (!this.newToDo) return
      this.toDos.push({
        id: new Date().getTime().toString(),
        done: false,
        content: this.newToDo
      })
      this.newToDo = ''
      this.save()
    },
    removeToDo: function (n) {
      this.toDos.splice(n, 1)
      this.save()
    },
    save: function () {
      const parsedToDo = JSON.stringify(this.toDos)
      localStorage.setItem('toDos', parsedToDo)
    },
    editToDo: function (toDo) {
      this.beforeEditCache = toDo.content
      this.editedToDo = toDo
    },
    doneEdit: function (toDo, n) {
      if (!this.editedToDo) {
        return
      }
      this.editedToDo = null
      const content = toDo.content
      if (content) {
        toDo.content = content
      } else {
        this.removeToDo(n)
      }
    },
    cancelEdit: function (toDo) {
      this.editedToDo = null
      toDo.content = this.beforeEditCache
    }
  }
})
