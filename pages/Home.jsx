import { View, ScrollView } from 'react-native';
import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';

const Home = ({ navigation }) => {

    return (
        <ScrollView>
            <View>
                <Hero navigation={navigation} />
            </View>
            <View>
                <CarouselSection />
            </View>
        </ScrollView>
    )
}

export default Home;
