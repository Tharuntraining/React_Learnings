import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
interface CreateTaskPopupProps {
    modal: any;
    toggle: any;
    save: any;
}
const CreateTaskPopup = (modal: any, toggle: any, save: any) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        if (name === 'taskName') {
            setTaskName(value);
        }
        else if (name === 'description') {
            setDescription(value);
        }
    };
    const handleSave = () => {
        let taskObject = { taskName, description };
        taskObject["taskName"] = taskName;
        taskObject["description"] = description;
        save(taskObject);
    }


    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create Task</ModalHeader>
                <ModalBody>
                    <form>
                        <div className="form-group">
                            <label>Task Name</label>
                            <input type="text" className="form-control" placeholder="Enter Task Name" value={taskName} onChange={handleChange} name='taskName' />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea className="form-control" id="description" rows={3} value={description} onChange={handleChange} name='description' />
                        </div>
                    </form>

                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default CreateTaskPopup;