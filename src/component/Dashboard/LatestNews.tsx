import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FullCard from '../News/FullCard'
import ListCard from '../News/ListCard'

export default function LatestNews() {
    return (
        <View>
            <FullCard
                id={100}
                title={"राप्ती हाईड्रो एण्ड जनरल कन्स्ट्रक्सन लिमिटेड आयोजनाको शेयर निष्काशन"}
                image={"https://presspalika.com/wp-content/uploads/2022/06/received_1103220203606910.jpeg"}
                description={"रुकुम पश्चिमको चौरजहारी नगर कार्यपालिकाकाे पहिलो बैठक बसेकाे छ । हिजाे बसेकाे बैठकले यस्तो निर्णय. . ."}
            />

            <ListCard
                id={110}
                title={"राप्ती हाईड्रो एण्ड जनरल कन्स्ट्रक्सन लिमिटेड आयोजनाको शेयर निष्काशन"}
                image={"https://presspalika.com/wp-content/uploads/2022/06/received_1103220203606910.jpeg"}
                description={"रुकुम पश्चिमको चौरजहारी नगर कार्यपालिकाकाे पहिलो बैठक बसेकाे छ । हिजाे बसेकाे बैठकले यस्तो निर्णय. . ."}
                style={{
                    marginTop: 20
                }}
            />

            <ListCard
                id={110}
                title={"राप्ती हाईड्रो एण्ड जनरल कन्स्ट्रक्सन लिमिटेड आयोजनाको शेयर निष्काशन"}
                image={"https://presspalika.com/wp-content/uploads/2022/06/received_1103220203606910.jpeg"}
                description={"रुकुम पश्चिमको चौरजहारी नगर कार्यपालिकाकाे पहिलो बैठक बसेकाे छ । हिजाे बसेकाे बैठकले यस्तो निर्णय. . ."}
                style={{
                    marginTop: 20
                }}
            />

            <ListCard
                id={110}
                title={"राप्ती हाईड्रो एण्ड जनरल कन्स्ट्रक्सन लिमिटेड आयोजनाको शेयर निष्काशन"}
                image={"https://presspalika.com/wp-content/uploads/2022/06/received_1103220203606910.jpeg"}
                description={"रुकुम पश्चिमको चौरजहारी नगर कार्यपालिकाकाे पहिलो बैठक बसेकाे छ । हिजाे बसेकाे बैठकले यस्तो निर्णय. . ."}
                style={{
                    marginTop: 20
                }}
            />

            <ListCard
                id={110}
                title={"राप्ती हाईड्रो एण्ड जनरल कन्स्ट्रक्सन लिमिटेड आयोजनाको शेयर निष्काशन"}
                image={"https://presspalika.com/wp-content/uploads/2022/06/received_1103220203606910.jpeg"}
                description={"रुकुम पश्चिमको चौरजहारी नगर कार्यपालिकाकाे पहिलो बैठक बसेकाे छ । हिजाे बसेकाे बैठकले यस्तो निर्णय. . ."}
                style={{
                    marginTop: 20
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})