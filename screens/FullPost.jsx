import styled from 'styled-components/native'
import { View } from 'react-native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Loading } from '../components/Loading'
const PostImage = styled.Image`
	border-radius: 10px;
	width: 100%;
	height: 250px;
	margin-bottom: 20px;
`

const PostText = styled.Text`
	font-size: 18px;
	line-height: 24;
`
export const FullPostScreen = ({ route, navigation }) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const { id, title } = route.params
	useEffect(() => {
		navigation.setOptions({ title })
		setIsLoading(true)
		axios
			.get(`https://63922c1dac688bbe4c5e0595.mockapi.io/data/${id}`)
			.then(({ data }) => setData(data))
			.catch(err => {
				console.log(err)
				alert('Ошибка при получении')
			})
			.finally(() => setIsLoading(false))
	}, [])
	if (isLoading) {
		return (
			<View>
				<Loading />
			</View>
		)
	}
	return (
		<View style={{ padding: 20 }}>
			<PostImage
				source={{
					uri: data.imageUrl,
				}}
			/>
			<PostText>{data.text}</PostText>
		</View>
	)
}
