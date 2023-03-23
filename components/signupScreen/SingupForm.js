import React from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import {firebase, db} from '../../firebase'

export default SignupForm =({navigation}) => {

    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string()
        .required()
        .min(6, 'Your password has to have at least 6 characters')
    })

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.mp/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async(email, password, username) => {
        try {
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
            console.log("firebase user created Successful!!!!!", email, password);
            db.collection('users').doc(authUser.user.email).set({
            owner_uid: authUser.user.owner_uid,
            username: username,
            email: authUser.user.email,
        profile_picture: await getRandomProfilePicture(),
        })
        } catch(error) {
            Alert.alert('failed')

    }


    return (
        <View style={styles.wrapper}>
          <Formik
          initialValues={{email: '', username:'', passwrod: ''}}
          onSubmit={(values) => {
              onSignup(values.email, values.password, values.username)
          }}
          validationSchema={SignupFormSchema}
          validateOnMount={true}
          >
              {({handleChange, HandleBlur, handleSubmit, values, isValid}) => (
  
          <>
          <View style={[styles.inputField,
          {borderColor: values.email.length < 1 || validation.validate(values.email) ? '#CCC' : 'red'},
          ]}>
          <TextInput 
          placeholderTextColor='#444'
          placeholder='Phone number, username or email'
          autoCapitalize='none'
          keyboardType='email-address'
          textContentType='emailAddress'
          autoFocus={true}
          onChangeText={handleChange('email')}
          onBlur={HandleBlur('email')}
          value={values.email}
          />
  
          </View>
          
          <View style={[styles.inputField,
          {borderColor: values.username.length < 1 || validation.validate(values.username) ? '#CCC' : 'red'},
          ]}>
          <TextInput 
          placeholderTextColor='#444'
          placeholder='Username'
          autoCapitalize='none'
          keyboardType='username'
          textContentType='username'
          autoFocus={true}
          onChangeText={handleChange('username')}
          onBlur={HandleBlur('username')}
          value={values.username}
          />
  
          </View>

          <View style={[styles.inputField,
       {borderColor: 1 > values.password.length || values.password.length >= 6 ? '#ccc' : 'red'},    
      ]}>
          <TextInput 
          placeholderTextColor='#444'
          placeholder='Password'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={true}
          textContentType='password'
          onChangeText={handleChange('password')}
          onBlur={HandleBlur('password')}
          value={values.password}
          />
  
          </View>
          <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: '#6BB0F5' }}>Forgot password?</Text>
          </View>
  
          <Pressable titleSize={20} style={styles.button(isValid)} onPress={handleSubmit} disabled={!isValid}>
              <Text style={styles.buttonText}>Sign Up</Text>
              </Pressable>
          <View style={styles.signupContainer}>
              <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{color: '#6BB0F5'}}> Log In </Text>
          </TouchableOpacity>
          </View>
          </>
          )}
          </Formik>
        </View>
      )
  
  }
  
  const syles=StyleSheet.create({
      wrapper: {
          marginTop: 80,
      },
  
      inputField: {
          borderRadius: 4,
          padding: 12,
          backgroundColor: '#FAFAFA',
          marginBottom: 10,
          borderWidth: 1,
      },
  
      button: isValid => ({
          backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 42,
          borderRadius: 4,
      }),
  
      buttonText: {
          fontWeight: '600',
          color: '#fff',
          fontSize: 20,
      },
  })