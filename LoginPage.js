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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Login submitted! (demo only)');
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
