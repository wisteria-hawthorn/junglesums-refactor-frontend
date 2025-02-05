import { Link } from 'react-router-dom';
import LogoutButton from '../../components/Login/LogoutButton';
import './ResultsPage.css';
import { ReactComponent as MySvgNight} from '../../nighttime-jungle.svg';
import CircularDeterminate from '../CircularDeterminate';
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";


export default function ResultsPage({score, clicks, setPercentageState , percentageState , mismatch , setMismatch, childName, setChildName}) {
const {user, isAuthenticated} = useAuth0() 

  let theMessage = "";
  const messageEncouragement = {
    
    topScore : "GREAT JOB, ADVENTURER!",
    midScore : "GREAT EFFORT, ADVENTURER!",
    lowScore : "KEEP TRYING: YOU CAN DO IT!"

  };


// leave these calculation here
// set this as state one level higher
// pass it down to this comp. and to circulardeterminate


// calculating the percentage of correct answers (scorePercent) from states: score & clicks
const totalDone = score + mismatch

let scorePercent = Math.floor((score / totalDone) * 100)
    if (isNaN(scorePercent)) {
      scorePercent = 0;
    };
  
// attempting to set this state (percentageState) to match the above calculated scorePercent:
  setPercentageState(scorePercent);

//comment

// matching messages to calculated percentages
    if (scorePercent >= 80) {
      theMessage = messageEncouragement.topScore;
    } else if (scorePercent >= 40 && scorePercent <= 79 ) {
      theMessage = messageEncouragement.midScore;
    } else {
      theMessage = messageEncouragement.lowScore;
    };

//POST REQUEST FUNCTIONALITY

  //Takes currently authenitcated user's email, uses it to find child's name.
    async function getChildDataByEmail() {
      let response = await fetch(`https://fullstack-fam.herokuapp.com/parent/search/?email=${user.email}`);
      let data = await response.json();
      setChildName(data.payload[0].name)
      console.log(`Name of student is ${data.payload[0].name}`)
    }
    
    useEffect(() => {
      if(isAuthenticated){
        console.log(`logged in as ${user.email}`)
        getChildDataByEmail();
      }
    }, []);
  
  //Takes score from activity, child's name, current date and time, and posts new row to child table
    async function postResults(){

      let date = new Date()
      let currentDate = date.toDateString()
      let currentTime = date.toLocaleTimeString()
      console.log(currentDate)
      console.log(currentTime)

      let response = await fetch("https://fullstack-fam.herokuapp.com/child", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(  {
          name: childName,
          scoreone: scorePercent,
          timecompleted: currentTime,
          datecompleted: currentDate
      },),
      });

      const data = await response.json();
      console.log(`successfully posted to the backend! WOOHOO`)

    }

    useEffect(() => {
      if(isAuthenticated){
        console.log('POSTING TO BACKEND')
        postResults();
      }
    }, []);

    return <>
        <LogoutButton/>
        <main className = "results-main-area">
       {/* <MySvgNight className = 'results-background-image-nighttime'/> */}
          <h1 className='well-done-h1'>Well Done!</h1>
          <div className="the-card-div">
        <h2 className='h2-score'>You got {score} correct</h2>
        <h3 className='h3-encouragement'>{theMessage}</h3>

        <div className='the-score-badge'>

          <CircularDeterminate score={score} percentageState={percentageState}/>

          <img className='the-banana-itself' src="banana-line-drawing.png" alt="banana" width="90" height="90"></img>

        </div>

        <div className='score-percentage-container'>

          <h3 className='h3-percentage'>{scorePercent}%</h3>

        </div>



        <div className='button-container-results'>
          <nav>
            <Link to="/expedition" style={{textDecoration: "none"}}>
              <button className = "map-button">Back to Map</button>
            </Link>
          </nav>
          <nav>
            <Link to="/activity-intro" style={{textDecoration: "none"}}>
              <button className = "retry-button">Try Again</button>
            </Link>
          </nav>
          </div>
        </div>
        </main>
      </>
  }