import React, { Component } from 'react';
import Adapter from '../Adapter';
import TVShowList from './TVShowList';
import Nav from './Nav';
import SelectedShowContainer from './SelectedShowContainer';
import { Grid } from 'semantic-ui-react';



class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: "",
    page: 0
  }

  componentDidMount = () => {
    Adapter.getShows(this.state.page).then(shows => this.setState({shows}))
        document.addEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate = () => {
    // window.scrollTo(0, 0)
  }

  handleSearch = (e) => {
    this.setState({ searchTerm: e.target.value.toLowerCase() })
  }

  handleFilter = (e) => {

    this.setState({ filterByRating: parseInt(e.target.value)})
  }

  selectShow = (show) => {
    Adapter.getShowEpisodes(show.id)
    .then((episodes) => {
        this.setState({
      selectedShow: show,
      episodes: episodes
    })})
  }

  displayShows = () => {
    if(!!this.state.searchTerm) {
      return this.state.shows.filter(s => s.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    }
    if (this.state.filterByRating){
      return this.state.shows.filter((s)=> {
        return s.rating.average >= this.state.filterByRating
      })
    } else {
      return this.state.shows
    }
  }

  handleScroll = e => {
    const bottom = e.srcElement.scrollingElement.scrollHeight - e.srcElement.scrollingElement.scrollTop === e.srcElement.scrollingElement.clientHeight

    if (bottom) {
      this.setState({page: this.state.page + 1}, () => Adapter.getShows(this.state.page)
        .then(shows => {
          if (!!shows) {this.setState({shows: [...this.state.shows, ...shows]})}

        }))
    }
  }

  render (){
    return (
      <div>
        <Nav handleFilter={this.handleFilter} handleSearch={this.handleSearch} searchTerm={this.state.searchTerm}/>
        <Grid celled>
          <Grid.Column width={5} style={{padding: 0}}>
            {!!this.state.selectedShow ? <SelectedShowContainer selectedShow={this.state.selectedShow} allEpisodes={this.state.episodes}/> : <div/>}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList handleScroll={this.handleScroll} shows={this.displayShows()} selectShow={this.selectShow} searchTerm={this.state.searchTerm}/>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
