// React Core
import React, { useRef, useState } from 'react';

// React Native Core
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Iconos
import { Ionicons } from '@expo/vector-icons';

// Constants
import { Colors } from '../constants/Colors';

// Data
import departmentCategories from '@/data/categories';

// PROPS
type Props = {
    onCategoryChanged: (category: string) => void;
};

const CategoryButtons = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);

    const itemRef = useRef<(View | null)[]>([]);

    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) => {
        const seleted = itemRef.current[index];

        setActiveIndex(index);

        seleted?.measure((x: any) => {
            scrollRef.current?.scrollTo({ x: x, y: 0, animated: true });
        });

        onCategoryChanged(departmentCategories[index].title);
    };

    return (
        <View>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingVertical: 10,
                    marginBottom: 10,
                }}>
                {departmentCategories.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        ref={(el) => (itemRef.current[index] = el)}
                        onPress={() => handleSelectCategory(index)}
                        style={activeIndex == index ? styles.categoryBtnActive : styles.categoryBtn}>
                        <Ionicons
                            name={item.iconName as any}
                            style={styles.categoryIcon}
                            size={20}
                            color={activeIndex == index ? Colors.white : Colors.black}
                        />
                        <Text style={activeIndex == index ? styles.categoryBtnTextActive : styles.categoryButtonText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default CategoryButtons;

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: Colors.black,
    },
    categoryBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        marginRight: 10,
        shadowColor: Colors.gray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        borderWidth: 1,
        borderColor: Colors.gray,
    },
    categoryText: {
        marginLeft: 8,
        fontSize: 16,
        color: Colors.black,
    },
    categoryIcon: {
        marginRight: 5,
    },
    categoryButtonText: {
        color: Colors.black,
    },
    categoryBtnActive: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.active,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 10,
        marginRight: 10,
        shadowColor: Colors.gray,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
        borderWidth: 1,
        borderColor: Colors.gray,
    },
    categoryBtnTextActive: {
        color: Colors.white,
    },
});
