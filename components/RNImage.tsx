import { ImageStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import { IMAGE_BASE_URL } from '@constants/common'

type ImageProps = {
    url: string,
    placeholder?: number | string,
    style: ImageStyle,
    defaultImage?: number | string,
    contentFit?: string
}

const RNImage = ({ url, placeholder, style, defaultImage, contentFit = 'cover' }: ImageProps) => {
    const [error, setError] = useState(false)
    useEffect(() => {
        setError(false)
    }, [url])

    // on image load error
    const onError = () => {
        setError(true)
    }

    if (error || !url) return <Image source={defaultImage} style={[style]} contentFit='contain' />
    return (
        <Image
            source={{ uri: IMAGE_BASE_URL + url }}
            style={style}
            contentFit={contentFit as 'cover' | 'contain' | 'fill' | 'none'}
            placeholder={placeholder}
            transition={1000}
            onError={onError}
        />
    )
}

export default RNImage