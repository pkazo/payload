export const isUserLocked = (date: number): boolean => {
  if (!date) {
    return false
  }
  return date > Date.now()
}
