const APIUtil = require('./api_util')

class TweetCompose {
  constructor($el) {
    this.$el = $el
    this.$ta = $el.find('textarea')
    this.$ta.on('input', () => {
      $charsLeft = $('strong')
      let chars = $ta.length
      let left = 140 - chars
      $charsLeft.text(`${left}`)
    })
    this.$el.submit(this.submitHandler.bind(this))
  }

  submitHandler(event) {
    event.preventDefault()
    const data = this.$el.serializeJSON()
    this.$el.find(':input').prop('disabled', true)
    APIUtil.createTweet(data).then(this.handleSuccess.bind(this))
  }

  clearInput() {
    this.$el.find(':input').prop('disabled', false)
    this.$el.find(':input').val('')
  }

  handleSuccess(data) {
    debugger
    this.clearInput()
    const ul_id = this.$el.data('tweets-ul')
    const $ul = $(ul_id)
    // data = JSON.stringify(data)
    const $li = $(`<li> ${data.content} - ${data.user.username} </li>`)
    $ul.append($li)
  }
}

module.exports = TweetCompose
