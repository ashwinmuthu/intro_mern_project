import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { parseISO } from 'date-fns'; 
 
import "react-datepicker/dist/react-datepicker.css";
import "./edit-event.component.css";


export default class EditEvent extends Component {
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
            startDate: new Date()
        };

        this.onChangeEventTitle = this.onChangeEventTitle.bind(this);
        this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
        this.onChangeEventTimeSpent = this.onChangeEventTimeSpent.bind(this);
        this.onChangeEventCollabs = this.onChangeEventCollabs.bind(this);
        this.onChangeEventDifficulty = this.onChangeEventDifficulty.bind(this);
        this.onChangeEventCategory = this.onChangeEventCategory.bind(this);
        this.onChangeEventCompleted = this.onChangeEventCompleted.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
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
    onChangeEventCompleted(e) {
        this.setState({
            completed: !this.state.completed
        });
    }
    onDateChange = date => {
        this.setState({
            startDate: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            title: this.state.title,
            description: this.state.description,
            time_spent: parseInt(this.state.time_spent),
            collaborators: this.state.collaborators,
            difficulty: this.state.difficulty,
            category: this.state.category,
            completed: this.state.completed,
            startDate: this.state.startDate
        };
        console.log(obj);
        axios.post('http://localhost:4000/events/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data))

        this.props.history.push('/');
    }

    onDelete(e) {
        e.preventDefault();
        const obj = {
            title: this.state.title,
            description: this.state.description,
            time_spent: this.state.time_spent,
            collaborators: this.state.collaborators,
            difficulty: this.state.difficulty,
            category: this.state.category,
            completed: this.state.completed,
            startDate: this.state.startDate
        };
        console.log(obj);
        axios.post('http://localhost:4000/events/delete/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    componentDidMount() {
        axios.get('http://localhost:4000/events/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    time_spent: (response.data.time_spent).toString(),
                    collaborators: response.data.collaborators,
                    difficulty: response.data.difficulty,
                    category: response.data.category,
                    completed: response.data.completed,
                    startDate: parseISO(response.data.startDate)
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        
        return (
            <div>
                <h3 align="center">Update Event</h3>
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
                    <div className="date-pick-row">
                        <DatePicker
                                selected={this.state.startDate}
                                onChange={this.onDateChange}
                        />
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeEventCompleted}
                                checked={this.state.completed}
                                value={this.state.completed}
                        />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>
                    <div className="form-group">
                        <input type="button"
                               value="Delete Todo"
                               className="btn btn-danger"
                               onClick={this.onDelete}
                        />
                    </div>
                </form>
            </div>
        )
    }
}