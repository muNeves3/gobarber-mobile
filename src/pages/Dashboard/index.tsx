import React, { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Header,
  HeaderTitle,
  Username,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle
} from './styles'

import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/auth'
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export interface IProvider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<IProvider[]>([]);
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    })
  }, [])

  const navigateToProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [navigate])


  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', { providerId });
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

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        renderItem={({item: provider}) => (
          <ProviderContainer onPress={() => {navigateToCreateAppointment(provider.id)}}>
            <ProviderAvatar source={{uri: provider.avatar_url}}/>

            <ProviderInfo>
            <ProviderName>{provider.name}</ProviderName>

            <ProviderMeta>
              <Icon name="calendar" size={14} color="#ff9000"/>
              <ProviderMetaText>Segunda à sexta</ProviderMetaText>
            </ProviderMeta>

            <ProviderMeta>
              <Icon name="clock" size={14} color="#ff9000"/>
              <ProviderMetaText>8 horas às 18 horas</ProviderMetaText>
            </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
}

export default Dashboard;
