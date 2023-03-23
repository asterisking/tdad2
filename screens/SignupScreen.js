import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import SingupForm from '../components/signupScreen/SingupForm'

const INSTAGRAM_LOGO = 'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram'

const SignupScreen = ({navigation}) => (
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={{ uri: INSTAGRAM_LOGO, height: 100, width: 100 }} />
    </View>
<SingupForm navigation={navigation}/>
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,

    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 60,
    }
})

export default SignupScreen