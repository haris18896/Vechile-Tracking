
export const isObjEmpty = (obj) => Object.keys(obj).length === 0

export const success = state => {
  state.loading = false
  state.error = null
}

export const error = (state, action) => {
  state.loading = false
  state.error = action.payload
}

