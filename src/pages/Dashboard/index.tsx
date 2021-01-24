import React, { useCallback } from 'react';
import { Container,Header,HeaderTitle,Username, ProfileButton,UserAvatar } from './styles'

import { useAuth } from '../../hooks/auth'
import { useNavigation } from '@react-navigation/native';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation()

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate])

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <Username>{user.name}</Username>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{uri: user.avatar_url}} />
        </ProfileButton>
      </Header>
    </Container>
  );
}

export default Dashboard;
