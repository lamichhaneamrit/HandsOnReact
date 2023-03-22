import React, { useState, useEffect } from 'react';
import { Client } from '@microsoft/microsoft-graph-client';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function getAppointments() {
      try {
        const client = Client.init({
          authProvider: async (done) => {
            // Authenticate and authorize the app using the Microsoft Graph SDK
            done(null, 'ACCESS_TOKEN_HERE');
          }
        });

        // Fetch the user's appointments using the Graph SDK
        const result = await client
          .api('/me/events')
          .select('subject, start, end')
          .get();

        setAppointments(result.value);
      } catch (error) {
        console.log(error);
      }
    }

    getAppointments();
  }, []);

  return (
    <div>
      <h1>My Appointments</h1>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.subject} - {appointment.start.dateTime}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
