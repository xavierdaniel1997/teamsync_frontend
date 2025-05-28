import React from 'react'
import { ITask } from '../../types/task'

interface KanbanTaskCardPrope{
  task: ITask;
}

const KanbanTaskCard: React.FC<KanbanTaskCardPrope> = ({task}) => {
  return (
    <div className='bg-[#191919] p-3 rounded-sm'>
        <div>
            <p>task title</p>
        </div>
    </div>
  )
}

export default KanbanTaskCard