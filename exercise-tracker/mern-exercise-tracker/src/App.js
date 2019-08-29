import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import ExercrisesList from './components/exercises-list.component';
import EditExercrise from './components/edit-exercises.component';
import CreateExercrise from './components/create-exercises.component';
import CreateUser from './components/create-user.component';

function App() {
    return (
        <Router>
            <Navbar />
            <br />
            <Route path='/' exact component={ExercrisesList} />
            <Route path='/edit/:id' exact component={EditExercrise} />
            <Route path='/create' exact component={CreateExercrise} />
            <Route path='/user' exact component={CreateUser} />
        </Router>
    );
}

export default App;
