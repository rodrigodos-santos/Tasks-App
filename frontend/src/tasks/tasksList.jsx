import React from 'react'
import IconButton from '../template/iconButton'

export default props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(tasks => (
            <tr key={tasks._id}>
                <td className={tasks.done ? 'markedAsDone' : ''}>{tasks.description}</td>
                <td>
                    <IconButton style='success' icon='check' hide={tasks.done}
                        onClick={() => props.handleMarkAsDone(tasks)} />
                    <IconButton style='warning' icon='undo' hide={!tasks.done}
                        onClick={() => props.handleMarkAsPending(tasks)} />
                    <IconButton style='danger' icon='trash-o' hide={!tasks.done}
                        onClick={() => props.handleRemove(tasks)} />
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