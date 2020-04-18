import React, { Component } from 'react';
import axios from 'axios';


export default class CreateEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            time_spent: '',
            collaborators: '',
            difficulty: 0,
            category: '',
            completed: false,
            date: new Date()
        };

        this.onChangeEventTitle = this.onChangeEventTitle.bind(this);
        this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
        this.onChangeEventTimeSpent = this.onChangeEventTimeSpent.bind(this);
        this.onChangeEventCollabs = this.onChangeEventCollabs.bind(this);
        this.onChangeEventDifficulty = this.onChangeEventDifficulty.bind(this);
        this.onChangeEventCategory = this.onChangeEventCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEventTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    onChangeEventDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeEventTimeSpent(e) {
        if (/^\d*\.?\d*$/.test(e.target.value)) {
            this.setState({
                time_spent: e.target.value
            });
        }
    }
    onChangeEventCollabs(e) {
        this.setState({
            collaborators: e.target.value
        });
    }
    onChangeEventDifficulty(e) {
        this.setState({
            difficulty: parseInt(e.target.value)
        });
    }
    onChangeEventCategory(e) {
        this.setState({
            category: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Event Title: ${this.state.title}`);
        console.log(`Event Description: ${this.state.description}`);
        console.log(`Event Time Spent: ${this.state.time_spent}`);
        console.log(`Event Collaborators: ${this.state.collaborators}`);
        console.log(`Event Difficulty: ${this.state.difficulty}`);
        console.log(`Event Category: ${this.state.category}`);
        console.log(`Event Category: ${this.state.completed}`);

        const newEvent = {
            title: this.state.title,
            description: this.state.description,
            time_spent: parseInt(this.state.time_spent),
            collaborators: this.state.collaborators,
            difficulty: this.state.difficulty,
            category: this.state.category,
            completed: this.state.completed
        };

        axios.post('http://localhost:4000/events/add', newEvent)
            .then(res => console.log(res.data));
        this.setState({
            title: '',
            description: '',
            time_spent: '',
            collaborators: '',
            difficulty: 0,
            category: '',
            completed: false,
            date: new Date()
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Event</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeEventTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeEventDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Time Spent: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.time_spent}
                            onChange={this.onChangeEventTimeSpent}
                        />
                    </div>
                    <div className="form-group">
                        <label>Collaborators: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.collaborators}
                            onChange={this.onChangeEventCollabs}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.category}
                            onChange={this.onChangeEventCategory}
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="difficultyOptions"
                                    id="difficultyLow"
                                    value="1"
                                    checked={this.state.difficulty===1}
                                    onChange={this.onChangeEventDifficulty}
                            />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="difficultyOptions"
                                    id="difficultyMedium"
                                    value="2"
                                    checked={this.state.difficulty===2}
                                    onChange={this.onChangeEventDifficulty}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="difficultyOptions"
                                    id="difficultyHigh"
                                    value="3"
                                    checked={this.state.difficulty===3}
                                    onChange={this.onChangeEventDifficulty}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Event" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }

}