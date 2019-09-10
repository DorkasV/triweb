export const state = () => ({
  siteTitle: 'Tristats'
})

export const getters = {
  getSiteTitle: (state) => (title) => {
    return [title, state.siteTitle].join(' | ')
  }
}
