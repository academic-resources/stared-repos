
const selectLocation = (city, job) => {
  return {
    type: "SWITCH_LOCATION",
    city,
    jobs
  }
}

// window.selectLocation = selectLocation
export default selectLocation