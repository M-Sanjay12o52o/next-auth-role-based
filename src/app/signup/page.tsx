"use client"

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface pageProps { }

const SignupPage: FC<pageProps> = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("")
    const [error, setError] = useState('');
    const router = useRouter();

    console.log("password frontend: ", password)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, role }),
            });

            if (response.ok) {
                router.push("api/auth/signin")
            } else {
                // Handle error response
                setError('Failed to sign up');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Failed to sign up');
        }
    };

    return (
        <div className='container'>
            <h2 className='text-center'>Signup Page</h2>
            <br />
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit} className='text-center'>
                <div>
                    <label>Username:</label>
                    <input
                        className='ml-2 text-black'
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Password:</label>
                    <input
                        className='ml-2 text-black'
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Role:</label>
                    <input
                        className='ml-2 text-black'
                        type="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
