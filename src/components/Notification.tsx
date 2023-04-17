import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
  Image,
  TextStyle,
  ImageStyle,
  ViewStyle,
  StyleProp,
  TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SafeContainer from './SafeContainer';

const s = StyleSheet.create({
  container: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 10,

    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginTop: 10,
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    alignItems: 'center',
    marginRight: 5,
    borderRadius: 5,
    height: 45,
    width: 45,
  },
  content: {
    flex: 1,
    marginHorizontal: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 8,
    lineHeight: 25,
    color: '#007BFF',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444444',
  },
});

export interface NotificationComponentProps {
  /** Passed to `<Image />` as `source` param.
   * @default null */
  imageSource?: ImageSourcePropType;

  /** The maximum number of lines to use for rendering title.
   * @default null */
  maxTitleLines?: number;

  /** The maximum number of lines to use for rendering description.
   * @default null */
  maxDescriptionLines?: number;

  /** A container of the component. Set it in case you use different SafeAreaView than the standard
   * @default SafeAreaView */
  ContainerComponent?: React.ElementType;

  /** The style to use for rendering title
   * @default null */
  titleStyle?: StyleProp<TextStyle>;

  /** The style to use for rendering subTitle
    * @default null */
  subTitleStyle?: StyleProp<TextStyle>;

  /** The style to use for rendering colorbgansware
    * @default null */
  colorBgAnsware?: string;

  /** The style to use for rendering Invite
    * @default null */
  inviteStyle?: StyleProp<TextStyle>;

  /** On press to use for rendering Invite
    * @default null */
  onPressInvite?: Function;

  /** On press to use for rendering Answare
    * @default null */
  onPressAnsware?: Function;

  /** The style to use for rendering description
   * @default null */
  descriptionStyle?: StyleProp<TextStyle>;

  /** The style to use for notification container.
   * Might be useful to change background color, shadows, paddings or margins
   * @default null */
  containerStyle?: StyleProp<ViewStyle>;

  /** The style to use for rendering image
   * @default null */
  imageStyle?: StyleProp<ImageStyle>;
}

interface NotificationComponentAllProps extends NotificationComponentProps {
  title?: string;
  subTitle?: string;
  description?: string;
  call?: boolean;
  onPressInvite?: Function;
  onPressAnsware?: Function;
}

const NotificationComponent: React.FunctionComponent<NotificationComponentAllProps> = ({
  title,
  subTitle,
  call,
  titleStyle,
  onPressInvite,
  onPressAnsware,
  subTitleStyle,
  colorBgAnsware,
  inviteStyle,
  description,
  descriptionStyle,
  imageSource,
  imageStyle,
  ContainerComponent,
  maxTitleLines,
  maxDescriptionLines,
  containerStyle,
}) => {
  const Container = ContainerComponent ?? SafeContainer;
  return (
    <>
      {call ? (
        <Container>
          <View style={[s.container, containerStyle]}>
            <View style={s.content}>
              {!!title && (
                <Text style={[s.title, titleStyle]} numberOfLines={maxTitleLines}>
                  {title}
                </Text>
              )}
              <TouchableOpacity onPress={() => onPressInvite && onPressInvite()} style={{ paddingVertical: 8 }}>
                <Text style={[s.title, inviteStyle]}>Invited to current call</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => onPressAnsware && onPressAnsware()}
              style={{
                marginHorizontal: 8
              }}>
              <View style={{
                width: 48,
                height: 48,
                backgroundColor: colorBgAnsware,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <MaterialIcons name="call" color="white" size={24} />
              </View>
            </TouchableOpacity>
          </View>
        </Container>
      ) : (
        <Container>
          <View style={[s.container, containerStyle]}>
            {!!imageSource && <Image style={[s.image, imageStyle]} source={imageSource} />}
            <View style={s.content}>
              {!!title && (
                <Text style={[s.title, titleStyle]} numberOfLines={maxTitleLines}>
                  {title}
                </Text>
              )}
              {!!subTitle && (
                <Text style={[s.title, subTitleStyle]} numberOfLines={maxTitleLines}>
                  {subTitle}
                </Text>
              )}
              {!!description && (
                <Text style={[s.description, descriptionStyle]} numberOfLines={maxDescriptionLines}>
                  {description}
                </Text>
              )}
            </View>
          </View>
        </Container>
      )}
    </>
  );
};

export default NotificationComponent;
