import styled from 'styled-components/native';
import { Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { ButtonProps } from 'react-native'

interface IMarginTop extends ButtonProps {
  marginTop: number;
}

export const Container = styled.View`
  flex: 1;
  /* align-items: center; */
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0px 24px;
  text-align: left;
`
export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 98px;
  align-self: center;
`;

export const BackButton = styled.TouchableOpacity<IMarginTop>`
  margin-top: ${props => Platform.OS === 'android' ? props.marginTop = 150 : 40 }px;
  //40
`;

export const UserAvatarButton = styled.TouchableOpacity<IMarginTop>`
  margin-top: ${props => Platform.OS === 'android' ? props.marginTop = 12 : 32 }px;
  //32
`;

