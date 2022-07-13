import { View, ScrollView } from 'react-native';
import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';

const Home = () => {

    return (
        <ScrollView>
            <View>
                <Hero />
            </View>
            <View>
                <CarouselSection />
            </View>
        </ScrollView>
    )
}

export default Home;
