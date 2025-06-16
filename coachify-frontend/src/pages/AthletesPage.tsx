import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function AthletesPage() {
    const [athletes, setAthletes] = useState([]);

    useEffect(() => {
        api.get('/athletes')
            .then(res => setAthletes(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h1>Athletes</h1>
            <ul>
                {athletes.map((a: any) => (
                    <li key={a.id}>{a.firstName} {a.lastName}</li>
                ))}
            </ul>
        </div>
    );
}
