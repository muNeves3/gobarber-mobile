import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText
} from './styles'
import { useAuth } from '../../hooks/auth';
import { IProvider } from '../Dashboard';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';

interface IRouteParams{
  providerId: string;
}

interface IAvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { goBack } = useNavigation();
  const { providerId } = route.params as IRouteParams;

  const routeParams = route.params as IRouteParams;

  const [providers, setProviders] = useState<IProvider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date);
  const [availability, setAvailability] = useState<IAvailabilityItem[]>([]);

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    })
  }, [])

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      }
    }).then(response => {
      setAvailability(response.data);
    })
  }, [selectedDate, selectedProvider])

  const navigateBack = useCallback(() => {goBack()}, [goBack]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, [])

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, [])

  const handleDateChange = useCallback((event: any, date: Date | undefined) => {
    if(Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if(date) {
      setSelectedDate(date);
    }
  }, [])

  return(
    <Container>
      <Header>
          <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591"/>
          </BackButton>

          <HeaderTitle>Cabeleireiros</HeaderTitle>

          <UserAvatar source={{uri: user.avatar_url}}/>
      </Header>

      <ProvidersList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={providers}
        keyExtractor={provider => provider.id}
        renderItem={({item: provider}) => (
         <ProviderContainer
          onPress={() => handleSelectProvider(provider.id)}
          selected={provider.id === selectedProvider}
         >
           <ProviderAvatar source={{uri: provider.avatar_url}}/>
           <ProviderName
            selected={provider.id === selectedProvider}
           >{provider.name}</ProviderName>
         </ProviderContainer>
        )}
      />

      <Calendar>
        <Title>Escolha a data</Title>

        <OpenDatePickerButton onPress={handleToggleDatePicker}>
          <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            onChange={handleDateChange}
            value={selectedDate}
          />
        )}
      </Calendar>
    </Container>
  );
}

export default CreateAppointment;
