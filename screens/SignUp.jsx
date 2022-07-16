import { Form, FormItem } from 'react-native-form-component';

const SignUp = () => {
const email = '';

    return (
        <Form onButtonPress={() => console.warn('do something')}>
            <FormItem
                label="Email"
                isRequired
                value={email}
                onChangeText={(email) => setEmail(email)}
                asterik
            />
        </Form>
    )
}
export default SignUp;