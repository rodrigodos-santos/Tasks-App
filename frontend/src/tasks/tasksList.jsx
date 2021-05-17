import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'
import { markAsDone, markAsPending, remove } from './tasksActions'

const TasksList = props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(tasks => (
            <tr key={tasks._id}>
                <td className={tasks.done ? 'markedAsDone' : ''}>{tasks.description}</td>
                <td>
                    <IconButton style='success' icon='check' hide={tasks.done}
                        onClick={() => props.markAsDone(tasks)} />
                    <IconButton style='warning' icon='undo' hide={!tasks.done}
                        onClick={() => props.markAsPending(tasks)} />
                    <IconButton style='danger' icon='trash-o' hide={!tasks.done}
                        onClick={() => props.remove(tasks)} />
                </td>
            </tr>
        ))
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className='tableActions'>Ações</th>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}

const mapStateToProps = state => ({ list: state.tasks.list })
const mapDispatchToProps = dispatch => 
    bindActionCreators({ markAsDone, markAsPending, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TasksList)