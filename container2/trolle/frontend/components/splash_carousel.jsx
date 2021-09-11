import React from 'react'

class Carousel extends React.Component {
  constructor(props) {
    super(props)

    this.picsArray = [
      window.splash_image_4,
      window.splash_image_5,
      window.splash_image_6,
      window.splash_image_7,
      window.splash_image_8
    ]

    this.state = {
      pic_num: 0
    }
  }

  moveLeft() {
    this.setState({
      pic_num: (this.state.pic_num - 1 + 5) % 5
    })
  }

  moveRight() {
    this.setState({
      pic_num: (this.state.pic_num + 1) % 5
    })
  }

  render() {
    return (
      <div className="carousel">
        <div
          className="carousel-btn carousel-btn-left"
          onClick={this.moveLeft.bind(this)}
        >
          <svg height="40" viewBox="0 0 22 40" width="22">
            <path
              d="m4.31783602 20 16.88192488 16.8819248c.7133028.7133029.7133028 1.8697953 0 2.5830981-.7133029.7133028-1.8697953.7133028-2.5830981 0l-18.08168628-18.0816863c-.38000317-.3800032-.5575644-.8857877-.53268368-1.3833366-.02488072-.4975489.15268051-1.0033334.53268368-1.3833366l18.08168628-18.08168628c.7133028-.71330283 1.8697952-.71330283 2.5830981 0 .7133028.71330283.7133028 1.86979522 0 2.58309804z"
              fill="#d9e4eb"
              transform="translate(.265262)"
            />
          </svg>
        </div>
        <img src={this.picsArray[this.state.pic_num]} />
        <div
          className="carousel-btn carousel-btn-right"
          onClick={this.moveRight.bind(this)}
        >
          <svg height="40" viewBox="0 0 22 40" width="22">
            <path
              d="m4.31783662 20 16.88192488 16.8819248c.7133028.7133029.7133028 1.8697953 0 2.5830981-.7133029.7133028-1.8697953.7133028-2.5830981 0l-18.08168628-18.0816863c-.38000317-.3800032-.5575644-.8857877-.53268368-1.3833366-.02488072-.4975489.15268051-1.0033334.53268368-1.3833366l18.08168628-18.08168628c.7133028-.71330283 1.8697952-.71330283 2.5830981 0 .7133028.71330283.7133028 1.86979522 0 2.58309804z"
              fill="#d9e4eb"
              fillRule="evenodd"
              transform="matrix(-1 0 0 -1 21.734738 40)"
            />
          </svg>
        </div>
      </div>
    )
  }
}

export default Carousel
