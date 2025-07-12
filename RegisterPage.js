import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  background: #5a4fcf;
  color: white;
  border: none;
  padding: 10px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #4839b7;
  }
`;

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registration submitted! (demo only)');
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
          placeholder="Enter your username"
        />
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
