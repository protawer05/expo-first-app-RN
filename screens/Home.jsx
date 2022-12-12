import {
	Text,
	View,
	FlatList,
	ActivityIndicator,
	RefreshControl,
	TouchableOpacity,
} from 'react-native'
import Post from '../components/Post'
import axios from 'axios'
import { useState, useEffect } from 'react'

export const HomeScreen = ({ navigation }) => {
	const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const fetchPosts = () => {
		setIsLoading(true)
		axios
			.get('https://63922c1dac688bbe4c5e0595.mockapi.io/data')
			.then(({ data }) => setItems(data))
			.catch(err => {
				console.log(err)
				alert('Ошибка при получении')
			})
			.finally(() => setIsLoading(false))
	}

	useEffect(fetchPosts, [])
	if (isLoading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' />
				<Text style={{ marginTop: 15, fontSize: 20 }}>Loading...</Text>
			</View>
		)
	}
	return (
		<View>
			<FlatList
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
				}
				data={items}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('FullPost', {
								id: item.id,
								title: item.title,
							})
						}
					>
						<Post
							title={item.title}
							createdAt={item.createdAt}
							imageUrl={item.imageUrl}
						/>
					</TouchableOpacity>
				)}
			/>
		</View>
	)
}
