import React from 'react';
import './App.css';
import {red, white, box, video} from './style';
import ReactPlayer from 'react-player'

class App extends React.Component {

  render() {

    return <Instructions /> 

  }
}

class Instructions extends React.Component {

  render() {

    return(

      <div>

        <h1 style={red}>Premier League Events</h1>

        <h2 style={white}>Select a season</h2>

        <Search />

      </div>
      
      )
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);

    /* setting state in order to get data from the api, show the word loading if the data are not available yet 
    and get the value from the input of the user */
    this.state = { matches: null, loading: true, value: null };
    this.chooseSeason = this.chooseSeason.bind(this);

  };

  chooseSeason(e) {

    /* changing state value with input of the user */
    this.setState({ value: e.target.value })

  }

  /* data from api (I used component did update because we will get data from the api every time the state value changes) */
  async componentDidUpdate() {

    let url = `https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=4328&s=${this.state.value}`
    const response = await fetch(url);
    const data = await response.json();
    
    /* changing the state so that we can show the results (JSON is a dictionary so we need to write data.events in 
      order to get the results) */
    this.setState({ matches: data.events, loading: false })
    
}
  
  render() {
    
    return (
    
    <div>

      <div>
        
        {/* input of the user */}
        <select onChange={this.chooseSeason}>

          <option value=''></option>
          <option value='2019-2020'>2019-2020</option>
          <option value="2018-2019">2018-2019</option>
          <option value="2017-2018">2017-2018</option>
          <option value="2016-2017">2016-2017</option>
          <option value="2015-2016">2015-2016</option>
          <option value="2014-2015">2014-2015</option>
          <option value="2013-2014">2013-2014</option>
          <option value="2012-2013">2012-2013</option>
          <option value="2011-2012">2011-2012</option>
          <option value="2010-2011">2010-2011</option>

        </select>

        {/* showing the user the season selected */}
        <h2 style={white}>Selected season: {this.state.value}</h2>

      </div>

      <div>

          {/* logic so that we can show the word loading if we have no data yet */}
         {this.state.loading || !this.state.matches ? (
           
           <h2 style={white}>Loading...</h2>

         ): (
           
           <div>

            {/* map method because the JSON is a dictionary and I want to show ALL the results at once */}
            {this.state.matches.map(match => {
              
              return (
                
                <div style={box}>

                  <h1 style={red}>Match: {match.strEvent}</h1>

                  <h2 style={white}>Date: {match.dateEvent}</h2>

                  <h2 style={white}>Result: {match.intHomeScore} - {match.intAwayScore}</h2>

                  <h2 style={white}>Red Cards: {match.strHomeRedCards} {match.strAwayRedCards}</h2>

                  <h2 style={white}>Yellow Cards: {match.strHomeYellowCards} {match.strAwayYellowCards}</h2>

                  <h2 style={white}>Video:</h2>
                  
                  <figure>
                  
                    {/* video player */}
                    <ReactPlayer url={match.strVideo} controls style={video}>Video not supported</ReactPlayer>

                    <figcaption style={white}>Link video (if available): <a rel="noopener noreferrer" 
                    style={white} href={match.strVideo} target='_blank'>
                    {match.strVideo}</a></figcaption>

                  </figure>

                </div>

              )
            })}

            </div>

         )}

       </div>

    </div>
       )
  }
}

export default App;