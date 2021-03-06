import Vue from 'vue'
import LoadingComponent from './index.vue'

const LoadingConstructor = Vue.extend(LoadingComponent)

let loading = undefined

LoadingConstructor.prototype.close = function () {
    if (loading) loading = undefined
    this.visible = false
    setTimeout(() => {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        this.$destroy()
    }, 300)
}

const Loading = (options = {}) => {
    if (loading) return loading
    const parent = document.body
    const opts = {
        text: '',
        ...options
    }
    const instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: opts
    })
    parent.appendChild(instance.$el)
    Vue.nextTick(() => instance.visible = true)
    loading = instance
    return instance
}

Vue.prototype.$loading = Loading
export default Loading