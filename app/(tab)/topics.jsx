import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Topic from '../../components/Topic'
import { getAllTopicsForUser } from '../../lib/api'

export default function Topics() {

  const router = useRouter()

  const [topics, setTopics] = useState([])

  useFocusEffect(
    useCallback(() => {
      console.log("fetching data on topics page...");

      const fetchData = async () => {
        const data = await getAllTopicsForUser()
        setTopics(data)
      }

      fetchData()

    }, [])
  )

  return (
    <View className='flex-1 relative'>

      <TouchableOpacity
        onPress={() => router.push('screens/addTopic')}
        className='w-20 rounded-full aspect-square bg-redl2 absolute bottom-8 right-7 z-30 items-center justify-center'>
        <Ionicons name='add' size={30} color={"white"} />
      </TouchableOpacity>


      <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} >

        {
          topics.map(t => (
            <TouchableOpacity key={t.id} activeOpacity={0.6}>
              <Topic
                imageSrc={t.img_url}
                lastUpdated={t.updated_at}
                sourceCount={t.source_count}
                topic={t.name}
              />
            </TouchableOpacity>
          ))
        }

      </ScrollView>
    </View>
  )
}