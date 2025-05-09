import React from 'react';

import { useForm } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { SignInProps } from '@aws-amplify/ui-react-native';

import { MaterialIcons } from '@expo/vector-icons';
import Facebook from "../../assets/images/Facebook.svg"
import Google from "../../assets/images/Google.svg"
import Apple from "../../assets/images/Apple.svg"

import {
  ErrorMessage,
  LinkButton,
  LinksContainer,
  ProviderButton,
  SubmitButton,
  TextField,
  ViewHeader,
  ViewContainer,
  ViewSection,
  ViewDivider,
} from './Components';

function capitalize<T extends string>([first, ...rest]: T): Capitalize<T> {
  return [first && first.toUpperCase(), rest.join('').toLowerCase()]
    .filter(Boolean)
    .join('') as Capitalize<T>;
}

export function SignIn({
  error: errorMessage,
  fields,
  handleSubmit,
  isPending,
  socialProviders,
  toFederatedSignIn,
  toForgotPassword,
  toSignUp,
}: SignInProps): React.JSX.Element {
  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: 'onTouched' });

  // State for email tick and password eye icon toggle
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);

  const validateEmail = (email: string) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailRegex.test(email));
  };
  return (
    <ViewContainer style={styles.container}>
      <ViewHeader style={styles.header}>Log In</ViewHeader>      
      <ViewSection style={{ marginTop: 25 }}>
          {fields.map(({ name, label, ...field }) => (
            <View key={name}>
              {/* Label on top of the text field */}
              <Text style={styles.label}>{label}</Text>
              <TextField
                {...field}
                control={control}
                error={errors?.[name]?.message as string}
                name={name}
                secureTextEntry={field.type === 'password' && !passwordVisible}
                rules={{ required: `${label} is required` }}
                style={[
                  styles.textField,
                  (errors?.[name]?.message || errorMessage) && { borderColor: '#f00' }, // Red border for error
                ]}
                onChangeText={(text) => {
                  field.onChange?.(text); // Pass the text directly
                  if (field.type === 'email') validateEmail(text); // Validate email if the field is email
                }}
              />
              {field.type === 'password' && (
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.eyeIcon}
                >
                  <MaterialIcons
                    name={passwordVisible ? 'visibility' : 'visibility-off'} // Toggle icon
                    size={24}
                    color="#333"
                  />
                </TouchableOpacity>
              )}
              {field.type === 'email' && isEmailValid && (
                <MaterialIcons
                  name=  "check-circle"
                  size={24}
                  color="black"
                  style={styles.tickIcon}
                />
              )}
            </View>
          ))}
          {(
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          )}
      </ViewSection>

      <SubmitButton
        disabled={!isValid}
        loading={isPending}
        onPress={() => {
          handleSubmit(getValues());
        }}
        style={[styles.button]}
        labelStyle={[styles.buttonText]}
      >
        Log in
      </SubmitButton>     

      <LinksContainer>        
        <LinkButton onPress={toForgotPassword} style={undefined} labelStyle={[styles.link, styles.linkText]}>
          Forgot Password?
        </LinkButton>
      </LinksContainer>

      <View style={styles.orLogIn}>
          <View style={styles.lineView}></View>
          <Text style={styles.orText}>Or Login with</Text>
          <View style={styles.lineView}></View>
      </View>
        <View style={styles.buttonBucket}>
            <View style={styles.buttonWithIcon}>
              <Facebook width={20} height={20} />
            </View>
            <View style={styles.buttonWithIcon}>
                <Google width={20} height={20} />
            </View>
            <View style={styles.buttonWithIcon}>
                <Apple width={20} height={20} />
            </View>
        </View>
        <View style={styles.footer}>
            <Text style={{fontSize: 14, lineHeight: 18, color: "rgba(0, 0, 0, 0.7)", textAlign: "left"}}>Don't have an account?</Text>
            <Text style={{fontSize: 14, lineHeight: 18, textDecorationLine: "underline", fontWeight: "600", textAlign: "left", color: "#000"}} onPress={toSignUp}>Sign up</Text>
        </View>
    </ViewContainer>   
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16 * 0.87,
  },
  header: {
    fontSize: 34 * 0.87,
    fontWeight: '700' as '700',
    color: '#000',
    marginBottom: 7 * 0.87,
    marginTop: 70 * 0.87,
  },
  button: {
    backgroundColor: '#343434',
    padding: 12 * 0.87,
    borderRadius: 40 * 0.87,
    marginTop: 37 * 0.87,
    width: 110 * 0.87,
    height: 42 * 0.87,
    alignSelf: 'center' as 'center',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center' as 'center',
    fontSize: 16 * 0.87,
  },
  textField: {
    backgroundColor: '#fff',
    color: '#000',
    borderColor: '#ccc',
    borderWidth: 1 * 0.87,
    borderRadius: 12 * 0.87,
    padding: 8 * 0.87,
    height: 57,
  },
  errorMessage: {
    color: '#f00',
    fontSize: 14 * 0.87,
  },
  link: {
    color: 'black',
    textDecorationLine: 'underline' as 'underline',
  },
  linkText: {
    color: 'black',
    fontSize: 15 * 0.87,
    fontWeight: '400' as '400',
  },
  label: {
    fontSize: 16 * 0.87,
    fontWeight: '400' as '400',
    color: '#000',
    marginBottom: 8 * 0.87,
    marginTop: 13 * 0.87,
  },
  eyeIcon: {
    position: 'absolute' as 'absolute',
    right: 16 * 0.87,
    top: 62 * 0.87,
  },
  tickIcon: {
    position: 'absolute' as 'absolute',
    right: 16 * 0.87,
    top: 60 * 0.87,
  },
  orLogIn: {
    marginTop: 22 * 0.87,
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
  },
  lineView: {
    borderStyle: 'solid' as 'solid',
    borderColor: '#d8dadc',
    borderTopWidth: 1 * 0.87,
    flex: 1,
    width: '100%' as '100%',
    height: 1 * 0.87,
  },
  orText: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 14 * 0.87,
    lineHeight: 18 * 0.87,
    marginHorizontal: 10 * 0.87,
  },
  buttonBucket: {
  marginTop: 22 * 0.87,
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    gap: 15 * 0.87,
  },
  buttonWithIcon: {
    borderRadius: 10 * 0.87,
    backgroundColor: '#fff',
    borderStyle: 'solid' as 'solid',
    borderColor: '#d8dadc',
    borderWidth: 1 * 0.87,
    flex: 1,
    width: '100%' as '100%',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    paddingHorizontal: 45 * 0.87,
    paddingVertical: 18 * 0.87,
  },
  footer: {
    marginTop: 88 * 0.87,
    flexDirection: 'row' as 'row',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    gap: 5 * 0.87,
  },
};