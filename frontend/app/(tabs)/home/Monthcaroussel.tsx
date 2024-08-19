import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const Monthcaroussel = () => {
    // Creating an array of months from January to June
    const data: string[] = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];



    // State to track the current index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to render each item in the carousel
    const renderItem = ({ item, index }: { item: string, index: number }) => {
        const isActive = index === currentIndex;
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',


                    opacity: isActive ? 1 : 0.5, // Apply opacity to non-active items
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: isActive ? 'black' : 'gray', // Black color for active item
                    }}
                >
                    {isActive ? `<   ${item}   >` : item}
                </Text>
            </View>
        );
    };

    return (
        <Carousel
            loop // Enables infinite looping of the carousel
            width={140} // Width of each item in the carousel
            height={50} // Height of the carousel
            data={data}
            style={{

                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderWidth: 2,
                borderColor: 'black',


            }}
            scrollAnimationDuration={1000} // Duration of the scrolling animation
            onSnapToItem={(index: number) => setCurrentIndex(index)} // Update current index on item snap
            renderItem={renderItem} // Function to render each item in the carousel

        />
    );
};

export default Monthcaroussel;
