import BotUI from 'botui'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import annyang from 'annyang'
// import SpeechKITT from 'speechkitt'

Vue.use(VueAxios, axios)

var botui = new BotUI('hello-world', {
  vue: Vue
});

botui.message.add({
  delay: 1000,
  loading: true,
  content: 'Bonjour'
}).then(()=>{
  readyForInput()
})

function readyForInput() {
  botui.action.text({
    action: {
      placeholder: 'Enter your text here'
    }
  }).then(function (res) {
    readyForInput()
    Vue.axios.post(process.env.BACKEND_URL, {
      q: res.value
    }).then((response) => {
      botui.message.add({
        delay:1000,
        loading:true,
        content:response.data.text
      })
    }).catch((error) => {
      botui.message.add({
        delay:500,
        loading:true,
        content:"Sorry but it's break time for me."
      })
    })
  });
}

