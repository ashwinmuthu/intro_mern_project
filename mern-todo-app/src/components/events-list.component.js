import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Event = props => (
    <tr>
        <td className={props.event.difficulty ? 'completed' : ''}>{props.event.title}</td>
        <td className={props.event.difficulty ? 'completed' : ''}>{props.event.time_spent}</td>
        <td className={props.event.difficulty ? 'completed' : ''}>{props.event.category}</td>
        <td>
            <Link to={"/edit/"+props.event._id}>Edit</Link>
        </td>
    </tr>
);

export default class EventsList extends Component {

    constructor(props) {
        super(props);
        this.state = {events: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/events/')
            .then(response => {
                this.setState({ events: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    eventList() {
        return this.state.events.map(function(currentEvent, i){
            return <Event event={currentEvent} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Events List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Time Spent</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.eventList() }
                    </tbody>
                </table>
            </div>
        )
    }
}