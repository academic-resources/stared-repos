import React,{ useState, useEffect }  from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'reactstrap';
import styled from 'styled-components'
import axios from 'axios';
import DatePicker from "react-datepicker";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import "react-datepicker/dist/react-datepicker.css";
ReactDOM.render(<App />, document.getElementById("root"));
