import { View, ScrollView } from 'react-native';
import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';
import userActions from '../redux/actions/userActions';
import { useSelector, useDispatch } from 'react-redux';
const Home = () => {
        const dispatch = useDispatch();
        dispatch(userActions.cleanState());
    return (
        <ScrollView>
            <View>
                <Hero  />
            </View>
            <View>
                <CarouselSection />
            </View>
        </ScrollView>
    )
}

export default Home;
