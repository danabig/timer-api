import axios from 'axios'

export const sendWebhook = async (timer) => {
  try {
    await axios({
      method: "post",
      url: `${timer.url}/${timer._id}`,
      data: {},
    })
    console.log(`sent webhook to ${timer.url}`)
  } catch(e) {
    console.log(e)
  }
}
