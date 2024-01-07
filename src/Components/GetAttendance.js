import React from 'react';
import { useState, useEffect } from 'react';
import Attendance from './AttendanceTable';
import axios from 'axios';
import BACKEND_URL from '../backend';
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';

function HelloWorld() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/api/getAllAttendance`);
                if(res.data){
                    setData(res.data);
                }

            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <Navbar/>
            <div style={{margin: "1rem 1rem"}}>
                <Typography variant="h1" component="div" gutterBottom>
                    Total Attendance
                </Typography>
                <Attendance data={data}/>
            </div>
        </>
    );
}

export default HelloWorld;
