import React, {useState, useEffect, Component} from "react"; 
import ReactDOM from "react-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'reactstrap';
import styled from 'styled-components';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/*// div
const StyledDiv = styled.div``;
// paragraph
const StyledP = styled.p``;
// section
const StyledSection = styled.section``;
// headers h1 - h6
const StyledHeading = styled.h1``;
// a
const StyledA = styled.a``;
// etc.....*/

// date picker at https://github.com/Hacker0x01/react-datepicker

const NasaImage = styled.img`
    width: 50%;
`;

const NasaH1 = styled.h1`
    color: #002244;
    font-size: 3.5rem;
    border-top: 1px solid #002244;
    width: 60%;
    margin-left: 20%;
    margin-top: 3%;
`;

const NasaH2 = styled.h2`
    color: #A5ACAF;
    font-size: 2.5rem;
`;

const NasaH3 = styled.h3`
    color: #69BE28;
    font-size: 1.5rem;
`;
const Nasa = styled.div`
  width: 50%;
  justify-content: center;
  text-align: center;
  align-self: center;
  margin-left: 25%;
  margin-top: 3%;
  margin-bottom: 3%;
`

const NasaA = styled.a`
  color: #A5ACAF;
  font-weight: bold;
`
const Button = styled.button`
    padding: 6px 10px;
    margin: 5px;
    border: none;
    border-radius: 3px;
    color: white;

${props => (props.type === 'primary' ? `background: #2196f3;` : null)}
    ${props => (props.type === 'success' ? `background: #4caf50;` : null)}
    ${props => (props.type === 'danger' ? `background: #f44336;` : null)}
    ${props => (props.type === 'warning' ? `background: #fdd835;` : null)}
`;

function App() {
  /* couldn't get it to work below
  state = {
    startDate: new Date()
  };

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };


  handleSelect = (date, event, monthSelectedIn) => {
    // Preventing onFocus event to fix issue
    // https://github.com/Hacker0x01/react-datepicker/issues/628
    this.setState({ preventFocus: true }, () => {
      this.preventFocusTimeout = setTimeout(
        () => this.setState({ preventFocus: false }),
        50
      );
      return this.preventFocusTimeout;
    });
    this.setSelected(date, event, undefined, monthSelectedIn);
    if (!this.props.shouldCloseOnSelect || this.props.showTimeSelect) {
      this.setPreSelection(date);
    } else if (!this.props.inline) {
      this.setOpen(false);
    }
  };
    */
  // Initialize state to hold the image URL
  const [imgURL, setImgURL] = useState("");
  const [copyright, setCopyright] = useState("");
  const [date, setDate] = useState("");
  const [explanation, setExplanation] = useState("");
  const [imgURL1, setImgURL1] = useState("");
  const [copyright1, setCopyright1] = useState("");
  const [date1, setDate1] = useState("");
  const [explanation1, setExplanation1] = useState("");

  

  useEffect(
    () => {
      var minYear = 2000;
      var maxYear = 2019;
      var randomYear =  minYear + Math.round(Math.random() * (maxYear-minYear));
      var minMonth = 1;
      var maxMonth = 12;
      var randomMonth =  minMonth + Math.round(Math.random() * (maxMonth-minMonth));
      var minDay = 1;
      var maxDay = 28;
      var randomDay = minDay + Math.round(Math.random() * (maxDay - minDay));
      var randomDate = randomYear + '-' + randomMonth + '-' + randomDay;
      console.log(randomDate);
      console.log('https://api.nasa.gov/planetary/apod?date=' + randomDate + '&api_key=' + process.env.REACT_APP_API_KEY);

      axios
        .get('https://api.nasa.gov/planetary/apod?date=' + randomDate + '&api_key=' + process.env.REACT_APP_API_KEY)
        .then(
            response =>{setImgURL(response.data.hdurl);
                        setCopyright(response.data.copyright);
                        setDate(response.data.date);
                        setExplanation(response.data.explanation);
            
    }    
        )
        .catch(error => {console.log(error);});
      function refresh() {
          
        var min = 700;
        var max = 1000;
        var rand =  min + Math.round(Math.random() * (max-min));
            axios
              .get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol='+ rand + '&api_key=' + process.env.REACT_APP_API_KEY)
              .then(
                response => {
                  if (response === []) {
                    refresh();
                        }
                  console.log(response.data);
                  setImgURL1(response.data.photos[0].img_src);
                  setCopyright1(response.data.photos[0].id);
                  setDate1(response.data.photos[0].earth_date);
                  setExplanation1(`${response.data.photos[0].rover.name}, ${response.data.photos[0].rover.status}`);
                }
          
              )
              .catch(error => {console.log(error);})      
        }    
      
        var min = 1;
        var max = 1000;
        var rand =  min + Math.round(Math.random() * (max-min));
                  console.log(rand);
      console.log('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=' + rand + '&api_key=' + process.env.REACT_APP_API_KEY);
                  
            axios
              .get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol='+ rand + '&api_key=' + process.env.REACT_APP_API_KEY)
              .then(
                response => {
                  console.log(response.data);
                  setImgURL1(response.data.photos[0].img_src);
                  setCopyright1(response.data.photos[0].id);
                  setDate1(response.data.photos[0].earth_date);
                  setExplanation1(`${response.data.photos[0].rover.name}, ${response.data.photos[0].rover.status}`);
                  
                }
          
              )
              .catch(error => {console.log(error);})      
    
    
    
    
    
    }, []);

    
  const person = () => {
    return (
      <div id="operatorsRow" className="buttonColumn2">
        {operators.map((item, index) => {
          return (
            <div
              id={item}
              className="buttonOp"
              key={index}
              onClickCapture={buttonClick({ item })}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };
  
      /* couldn't get it to work below
      <DatePicker
  selected={Example.state.date}
  onSelect={this.handleSelect} //when day is clicked
  onChange={this.handleChange} //only when value has changed
      />*/

  
  return (
      

    <div className="App">
      <p>
        Read through the instructions in the README.md file to build your NASA
        app! Have fun 🚀!
      </p>
    <div className="wrapper">
      <h1>Hello From the Ingram Home Component</h1>
    </div>    <div>
      <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="danger">Danger</Button>
      <Button type="warning">Warning</Button>
    </div>
    <div className="wrapper">
      <NasaH1>NASA Astronomy Photo of the Day:</NasaH1>
    </div>   
    <div id="nasa1" className="nasa">Copyright:  {copyright}</div>
    <div id="nasa2" className="nasa">Date:  {date}</div>
      <Nasa><div id="nasa2" className="nasa">Explanation:  {explanation}</div></Nasa>
      <div id="nasa3" className="nasaImg">
        <NasaImage src={imgURL} alt="NASA Astronomy Photo of the Day" />
        </div>
    <div className="wrapper">
      <NasaH1>NASA Mars Rover Mission Photos:</NasaH1>
    </div>   
    <div id="nasa1" className="nasa"><NasaH2>Random Images from sols 700 to 1000:</NasaH2></div>
      <div id="nasa2" className="nasa"><NasaH3><NasaA href={imgURL1} target="_blank">IMG URL</NasaA></NasaH3></div>
      <div id="nasa4" className="nasa"><NasaH3>ID Number:  </NasaH3>{copyright1}</div>
      <div id="nasa5" className="nasa"><NasaH3>Status:  </NasaH3>{explanation1}</div>
      
        <NasaImage src={imgURL1} alt="NASA Mars Rover Photo" />
    </div>
  );
}


export default App;


