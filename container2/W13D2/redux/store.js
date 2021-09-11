class Store {
    constructor(rootReducer) {
        this.rootReducer = rootReducer
        this.state = {}
        this.subscriptions = []
    }

    getState() {
        const copy = Object.assign({}, this.state)
        return copy
    }

    subscribe(callback) {
        this.subscriptions.push(callback)
        return () => {
            this.subscriptions = this.subscriptions.filter( s => s !== callback)
        }
    }

    dispatch(action) {
      const newState = this.rootReducer(this.state, action, this.subscriptions)
      
      this.state = Object.assign(this.state, newState);
    }
}

export default Store