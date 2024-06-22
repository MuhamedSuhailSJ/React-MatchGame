import {Component} from 'react'
import AddTabItem from '../TabList'
import AddThumbnialItem from '../ThumbnailList'
import './index.css'

const rearrangedlist = props => {
  const list = props.imagesList
  return list.sort(eachitem => Math.random() - 0.5)
}

export default class MatchGame extends Component {
  state = {
    imglist: this.props.imagesList,
    shuffled: [],
    tablist: this.props.tabsList,
    category: 'FRUIT',
    time: 60,
    score: 0,
  }

  componentDidMount() {
    this.timerinterval = setInterval(this.timefunc, 1000)
  }

  onchangecategory = tabId => {
    this.setState({
      category: tabId,
    })
  }

  onClickthumbnialimg = id => {
    const {time, shuffled} = this.state
    if (time !== 0 && shuffled[0].id === id) {
      this.setState(prev => ({
        score: prev.score + 1,
        shuffled: rearrangedlist(this.props),
      }))
    }
  }

  resetbtn = () => {
    this.setState({time: 60, score: 0})
    this.timerinterval = setInterval(this.func, 1000)
  }

  timefunc = () => {
    const {time} = this.state
    const newtime = time * 1000 - 1000
    console.log(newtime)
    this.setState({time: Math.floor((newtime / 1000) % 60)})
    if (time === 1) {
      clearInterval(this.timerinterval)
    }
  }

  render() {
    const {score, imglist, shuffled, tablist, category, time} = this.state
    const displayeditem = shuffled[0]
    const filterList = imglist.filter(
      eachitem => eachitem.category === category,
    )
    const showorhide = () => {
      if (time > 0) {
        return (
          <>
            <div className='displayeditem-container'>
              <img
                src={displayeditem.imageUrl}
                alt='match'
                className='displayeditemImg'
              />
            </div>
            <ul className='tablist-container'>
              {tablist.map(eachitem => (
                <AddTabItem
                  details={eachitem}
                  onchangecategory={this.onchangecategory}
                  key={eachitem.tabId}
                />
              ))}
            </ul>
            <ul className='thumbnail-container'>
              {filterList.map(eachitem => (
                <AddThumbnialItem
                  details={eachitem}
                  onClickthumbnial={this.onClickthumbnialimg}
                  key={eachitem.id}
                />
              ))}
            </ul>
          </>
        )
      }
      return (
        <div className='bgresultcontainer'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/match-game-trophy.png'
            className='trophyimg'
            alt='trophy'
          />
          <p>YOUR SCORE</p>
          <p>{score}</p>
          <button className='playagainbtn' onClick={this.resetbtn}>
            <img
              src='https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png '
              alt='reset'
            />
            PLAY AGAIN
          </button>
        </div>
      )
    }
    return (
      <div>
        <navbar className='navbar-container'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png'
            alt='website logo'
            className='navbar-logo'
          />
          <div className='scorecord-container'>
            <p className='score'>
              Score: <span className='scorecount'>{score}</span>
            </p>
            <div className='timer-container'>
              <img
                src='https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png '
                alt='timer'
                className='timerimg'
              />
              <p className='timer'>{time} sec</p>
            </div>
          </div>
        </navbar>
        <div className='bgcontainer'>{showorhide()}</div>
      </div>
    )
  }
}
