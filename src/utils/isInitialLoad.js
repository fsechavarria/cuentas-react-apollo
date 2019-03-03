export default route => {
  const sessionStorage = window.sessionStorage
  if (
    sessionStorage.length === 0 ||
    typeof sessionStorage.isInitialLoad === 'undefined'
  ) {
    sessionStorage.setItem('isInitialLoad', true)
  } else if (sessionStorage.isInitialLoad === 'true') {
    sessionStorage.setItem('isInitialLoad', false)
  }
  return sessionStorage.isInitialLoad === 'true'
}
