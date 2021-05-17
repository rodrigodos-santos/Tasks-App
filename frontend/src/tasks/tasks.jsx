import React from 'react'

import PageHeader from '../template/pageHeader'
import TasksForm from './tasksForm'
import TasksList from './tasksList'

export default props => (
    <div>
        <PageHeader name='Tarefas' small='Cadastro'></PageHeader>
        <TasksForm/>
        <TasksList/>
    </div>
)