import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TasksForm from './tasksForm'
import TasksList from './tasksList'

const URL = 'http://localhost:3003/api/tasks'

export default class Tasks extends Component {
    constructor(props) {
        super(props)
        this.state = { description: '', list: [] }

        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)


        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleRemove = this.handleRemove.bind(this)

        this.refresh()

    }

    refresh(description='') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({ ...this.state, description, list: resp.data }))
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }

    handleAdd() {
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())
    }

    handleClear(tasks){
        this.refresh()
    }

    handleMarkAsDone(tasks){
        axios.put(`${URL}/${tasks._id}`, {...tasks, done: true})
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(tasks){
        axios.put(`${URL}/${tasks._id}`, {...tasks, done: false})
            .then(resp => this.refresh(this.state.description))
    }
    
    handleRemove(tasks){
        axios.delete(`${URL}/${tasks._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
                <TasksForm
                    description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                />
                <TasksList 
                    list={this.state.list} 
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    handleRemove={this.handleRemove} 
                />
            </div>
        )
    }
}