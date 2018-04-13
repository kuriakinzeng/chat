import BotUI from 'botui'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import annyang from 'annyang'

Vue.use(VueAxios, axios)

var botui = new BotUI('chatbot', {
  vue: Vue
});


botui.message.add({
  delay: 500,
  loading: true,
  content: 'Bonjour'
}).then(()=>{
  readyForInput()
})

function readyForInput() {
  botui.action.text({
    action: {
      placeholder: 'Say something...',
      size: 100
    }
  }).then(function (res) {
    readyForInput()
    Vue.axios.post(process.env.BACKEND_URL, {
      q: res.value
    }).then((response) => {
      botui.message.add({
        delay:500,
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

if (annyang) {
  annyang.addCallback('result', function(phrases) {
    var phrase = phrases[0]
    if (phrase.charAt(0) === ' '){
      phrase.substring(1)
    }
    console.log(phrase)
    botui.message.add({
      delay: 500,
      human: true,
      loading: true,
      content: phrase
    }).then(()=>{
      readyForInput()
      Vue.axios.post(process.env.BACKEND_URL, {
        q: phrase
      }).then((response) => {
        botui.message.add({
          delay:500,
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
    })
  })

  var activateBtn = new Vue({
    el: '#activate-btn',
    data: {
      state: 0
    }, 
    methods: {
      start: function() {
        annyang.abort()
        annyang.start()
      },
      stop: function() {
        annyang.abort()
      }
    }
  })
  // annyang.start();
}