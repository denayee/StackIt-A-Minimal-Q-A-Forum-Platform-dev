import React from 'react';
import styled from 'styled-components';

const NotificationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NotificationItem = styled.li`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  background: ${props => (props.unread ? '#e6f7ff' : 'white')};
`;

const notifications = [
  { id: 1, message: 'User123 answered your question.', unread: true },
  { id: 2, message: 'User456 mentioned you in a comment.', unread: true },
  { id: 3, message: 'User789 commented on your answer.', unread: false },
];

const NotificationsPage = () => {
  return (
    <div>
      <h2>Notifications</h2>
      <NotificationList>
        {notifications.map(n => (
          <NotificationItem key={n.id} unread={n.unread}>
            {n.message}
          </NotificationItem>
        ))}
      </NotificationList>
    </div>
  );
};

export default NotificationsPage;
