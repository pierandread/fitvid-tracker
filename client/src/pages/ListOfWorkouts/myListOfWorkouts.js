import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './myListOfWorkouts.css';
import WorkoutList from '../../components/WorkoutList/WorkoutList';
import FilterWorkouts from './../../components/WorkoutList/FilterWorkouts';
import ApiClient from '../../Services/ApiClient';
import Navigation from './../../components/Navigation/navBar';
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";


function MyListOfWorkouts() {

  const user = useSelector(state => state.currentUser);

  const fakeWorkouts = [
    {
      id: '002',
      name: 'Full Body Workout',
      description: '30 minutes intense bodyweight workout',
      difficulty: 'hard',
      type: 'strength',
      youtubeID: 'UBMk30rjy0o',
      tags: ['chest', 'HIT'],
      length: 20,
      created_by: 654684,
      weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    {
      id: '004',
      name: 'Abs Workout',
      description: '10 minutes intense bodyweight chest workout',
      difficulty: 'easy',
      type: 'strength',
      youtubeID: '8AAmaSOSyIA',
      tags: ['chest', 'HIT'],
      length: 10,
      created_by: 654684,
      weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
  ];

  const [searchValue, setSearchValue] = useState('');
  const [filteredWorkouts, setfilteredWorkouts] = useState([]);
  const [checkBoxStatus, setcheckBoxStatus] = useState({
    easy: false,
    medium: false,
    hard: false,
  });

  useEffect (() => {
    ApiClient.getMyWorkouts()
      .then(workouts => setfilteredWorkouts(workouts));
  }, []);

  const handleInputChange = (enteredInput) => {
    setSearchValue(enteredInput);
    console.log(enteredInput);
    filterWorkoutsDifficultyAndSearch(checkBoxStatus, enteredInput);
  };

  const handleCheckBoxChange = (toggleKey) => {
    let messengerObjectForBoxStatus = Object.assign(checkBoxStatus);
    console.log(
      'this is the messenger before --->',
      messengerObjectForBoxStatus
    );
    if (toggleKey === 'easy') {
      if (checkBoxStatus.easy === false) {
        setcheckBoxStatus({ ...checkBoxStatus, easy: true });
        messengerObjectForBoxStatus.easy = true;
      } else {
        setcheckBoxStatus({ ...checkBoxStatus, easy: false });
        messengerObjectForBoxStatus.easy = false;
      }
    }
    if (toggleKey === 'medium') {
      if (checkBoxStatus.medium === false) {
        setcheckBoxStatus({ ...checkBoxStatus, medium: true });
        messengerObjectForBoxStatus.medium = true;
      } else {
        setcheckBoxStatus({ ...checkBoxStatus, medium: false });
        messengerObjectForBoxStatus.medium = false;
      }
    }
    if (toggleKey === 'hard') {
      if (checkBoxStatus.hard === false) {
        setcheckBoxStatus({ ...checkBoxStatus, hard: true });
        messengerObjectForBoxStatus.hard = true;
      } else {
        setcheckBoxStatus({ ...checkBoxStatus, hard: false });
        messengerObjectForBoxStatus.hard = false;
      }
    }
    console.log('hookStatus', checkBoxStatus);
    console.log('messenger after --->', messengerObjectForBoxStatus);
    filterWorkoutsDifficultyAndSearch(messengerObjectForBoxStatus);
  };

  const filterWorkoutsDifficultyAndSearch = (
    checkBoxStatus,
    enteredInput = searchValue
  ) => {
    let filteredArray = [];

    if (checkBoxStatus.easy === true) {
      filteredArray = fakeWorkouts.filter(
        (Workout) => Workout.difficulty === 'easy'
      );
    }
    if (checkBoxStatus.medium === true) {
      filteredArray = filteredArray.concat(
        fakeWorkouts.filter((Workout) => Workout.difficulty === 'medium')
      );
    }
    if (checkBoxStatus.hard === true) {
      filteredArray = filteredArray.concat(
        fakeWorkouts.filter((Workout) => Workout.difficulty === 'hard')
      );
    } else {

    }

    if (filteredArray.length > 0) {
      filteredArray = filteredArray.filter((Workout) =>
        Workout.name.toLowerCase().includes(enteredInput.toLowerCase())
      );
      setfilteredWorkouts(filteredArray);
    } else {
      let searchFilteredArray = fakeWorkouts.filter((Workout) =>
        Workout.name.toLowerCase().includes(enteredInput.toLowerCase())
      );
      console.log(searchFilteredArray);
      setfilteredWorkouts(searchFilteredArray);
    }
  };

  return (
    
    (!user) ? <Redirect to="/" /> :

    <div>
      <Navigation/>
    <div className="header-search-view">
      <div>
        <Link to="/ListOfWorkouts">
          <button>
            <h1>Browse Workouts</h1>
          </button>
        </Link>
        <Link to="/myListOfWorkouts">
          <button>
            <h1>My Saved Workouts</h1>
          </button>
        </Link>
      </div>
      <div className="search-workouts">
        <input
          type="text"
          className="search-input"
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="    Search .."
          title="Type in a name"
        ></input>
      </div>
    </div>
    <div className="list-filter-container">
    <WorkoutList workouts={filteredWorkouts}></WorkoutList>
    <FilterWorkouts
      handleCheckBoxChange={handleCheckBoxChange}
    ></FilterWorkouts>
  </div>
  </div>
  );
}

export default MyListOfWorkouts;
