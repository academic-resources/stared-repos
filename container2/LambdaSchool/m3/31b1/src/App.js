import React from 'react';
import './App.css';
import SearchForm from './components/SearchForm.js';
import UserCard from './components/UserCard.js';
import axios from 'axios';
import GitHubCalendar from 'github-calendar';
import { GithubContributions } from "react-github-graph"


  
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      githubProfile: {},
      githubFollowers: [],
      username: 'evoingram',
      searchTerm: ''
    };
      
  }

  componentDidMount() {
    console.log("componentDidMount running");
    console.log(this.state.username);
      // - function for get request & setState
    let url = `https://api.github.com/users/${this.state.username}`;
      axios({
        method: "get",
        url: url,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          "Content-Type": "application/json"
        }
      })
        .then(githubProfileResponse => {
          console.log([githubProfileResponse]);
          this.setState({ githubProfile: githubProfileResponse.data });
        console.log(this.state.githubProfile);
        console.log(`githubProfile img url = ${this.state.githubProfile.avatar_url}`);
        })
        .catch(err => {
          console.log(err);
        });
      
        url = `https://api.github.com/users/${this.state.username}/followers`;                    
        axios({
          method: "get",
          url: url,
          headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
              "Content-Type": "application/json"
          }
        })
        .then(githubFollowerResponse => {
          console.log(`GitHub follower response = ${[githubFollowerResponse]}`);
          this.setState({ githubFollowers: githubFollowerResponse.data });
          console.log(`GitHub follower state = ${this.state.githubFollowers}`);
        })
        .catch(err => {
            console.log(err); 
        });  
    
        let responseSummaryText = "Summary of pull requests, issues opened, and commits made by " + `${this.state.username}`;
          // let responseProxy = "urlreq";
          let responseGlobalStats="true";
          let responseResponsive="true";
          let calendarOptions = new Object();
          calendarOptions.summary_text = GitHubCalendar(".calendar", `${this.state.username}`);
          calendarOptions.global_stats = GitHubCalendar(".calendar", `${this.state.username}`);
          calendarOptions.responsive = GitHubCalendar(".calendar", `${this.state.username}`);
          console.log("GitHub calendar options:" + `${calendarOptions}`);
          GitHubCalendar(".calendar", `${this.state.username}`);
  }

    /*
async githubContributions(username) { 
  
    event.preventDefault();
  // - maybe function for contrib graph
      let responseSummaryText = "Summary of pull requests, issues opened, and commits made by " + `${username}`;
      // let responseProxy = "urlreq";
      let responseGlobalStats="true";
      let responseResponsive="true";
      let calendarOptions = new Object();
      calendarOptions.summary_text = await GitHubCalendar(".calendar", `${username}`);
      calendarOptions.global_stats = await GitHubCalendar(".calendar", `${username}`);
      calendarOptions.responsive = await GitHubCalendar(".calendar", `${username}`);
      console.log("GitHub calendar options:" + `${calendarOptions}`);
      await GitHubCalendar(".calendar", `${username}`);
  }

    */

  changeSearchTerm = event => {
    console.log("changeSearchTerm running");
    // - function for handleChange for the search
    const newSearchTerm = event.target.value;
    this.setState({searchTerm: newSearchTerm});    
    console.log('event.target.value = ' + event.target.value);
    console.log("search term = " + this.state.searchTerm);
  };
  
  updateSearchTerm = event =>  {
    console.log("updateSearchTerm running");
    console.log("search term = " + this.state.searchTerm);
    console.log("current username = " + this.state.username);  
    const newUsername = this.state.searchTerm;
    this.setState({username: newUsername});
    console.log("current username = " + this.state.username);
    this.getNewGHUser();
  };

  getNewGHUser = event => {
    event.preventDefault();
    console.log("getNewGHUser running");
    console.log(this.state.searchTerm);
      // - function for get request & setState
    let url = `https://api.github.com/users/${this.state.searchTerm}`;
      axios({
        method: "get",
        url: url,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
          "Content-Type": "application/json"
        }
      })
        .then(githubProfileResponse => {
          console.log([githubProfileResponse]);
          this.setState({ githubProfile: githubProfileResponse.data });
        console.log(this.state.githubProfile);
        console.log(`githubProfile img url = ${this.state.githubProfile.avatar_url}`);
        })
        .catch(err => {
          console.log(err);
        });
      
        url = `https://api.github.com/users/${this.state.searchTerm}/followers`;                    
        axios({
          method: "get",
          url: url,
          headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
              "Content-Type": "application/json"
          }
        })
        .then(githubFollowerResponse => {
          console.log(`GitHub follower response = ${githubFollowerResponse}`);
          this.setState({ githubFollowers: [githubFollowerResponse] });
          console.log(`GitHub follower state = ${this.state.githubFollowers.data}`);
        })
        .catch(err => {
            console.log(err); 
        });  
  }

  render() {
    return (
      <div className="App">
        <UserCard
          getRequestGH={this.getRequestGH}
          githubContributions={this.githubContributions}
          githubProfile={this.state.githubProfile}
          githubFollowers={this.state.githubFollowers} />
        <GithubContributions username={this.state.username}></GithubContributions>
        
        <SearchForm
          searchTerm={this.state.searchTerm}
          username={this.state.username}
          githubContributions={this.githubContributions}
          updateSearchTerm={this.updateSearchTerm}
          changeSearchTerm={this.changeSearchTerm}
          getNewGHUser={this.getNewGHUser}
        />
      </div>
    );
  }
}

export default App;
