import React, { useState } from 'react';
import Axios from 'axios';
import { API_URL } from "../auth/constants";

function PublishButton() {
    const [status, setStatus] = useState('');

    const handlePublish = async () => {
        try {
            const response = await Axios.post(`${API_URL}/mqtt_manager`, { message: '1' });
            setStatus(response.data);
        } catch (error) {
            setStatus('Error sending message');
        }
    };

    return (
        <div>
            <button style={{backgroundColor: 'red'}} onClick={handlePublish}>Turn On/Off Light 1</button>
            <p>{status}</p>
        </div>
    );
}

export default PublishButton;
