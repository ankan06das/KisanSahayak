import React, { Component, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { Icon } from '@rneui/themed';
import * as ImagePicker from "expo-image-picker";
import tw from 'twrnc'
import { selectUser } from '../../slices/userSlice';
import { useSelector } from 'react-redux';

const Home = () => {
  const [img, setImg] = useState('');
  const user = useSelector(selectUser);
  console.log(user);
  
  const sources = [
    {
      name: "wheat",
      require: require("../../assets/wheat.png")
    },
    {
      name: "mustard",
      require: require("../../assets/mustard.png")
    },
    {
      name: "rice",
      require: require("../../assets/rice.png")
    },
    {
      name: "potato",
      require: require("../../assets/potato.png")
    },
    {
      name: "corn",
      require: require("../../assets/corn.png")
    },
    {
      name: "sugarcane",
      require: require("../../assets/sugarcane.png")
    },

  ]

  const registeredCropsSource: { name: string; require: any; }[] = [];

  sources.map((crops) => {
    if (user.crops.includes(crops.name))
      registeredCropsSource.push(crops);
  })
  
  console.log(registeredCropsSource);
  

  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(cameraStatus.status === "granted" && galleryStatus.status === "granted")
    })();
  }, [])

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1
    })
    console.log(result);
    if (!result.canceled){
      setImg(result.assets[0].uri);
    }
  }
  const choosePhotoFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1
    })
    console.log(result);
    if (!result.canceled){
      setImg(result.assets[0].uri);
    }
  }
  // const choosePhotoFromGallery = async () => {
  //   const image = await launchCamera({
  //     mediaType: "photo"
  //   });
  //   setImg(img);
  //   console.log(img);
  // }
    return (
    <ScrollView>
      <View style={tw`flex-col`}>
        <View style={tw`flex-row`}>
          {registeredCropsSource.map((crops) => {
              return (
                <View>
            <TouchableOpacity
            style={{
              borderWidth:2,
              borderColor:'rgb(34, 197, 94)',
              alignItems:'center',
              justifyContent:'center',
              width:60,
              height:60,
              backgroundColor:'#fff',
              borderRadius:50,
              margin: 7
        }}
            >
              <Image key={crops.name} source={crops.require} style={tw`h-10 w-10`}/>
            </TouchableOpacity>
              <Text key={crops.name} style={tw`ml-4`}>
              {crops.name}
              </Text>
              </View>
            )
          })
          }
        </View>
        <Text style={tw`text-xl m-4 mb-2 pl-4`}> Revitalize Your Fields </Text>
        <View style={tw`m-3 pt-4 shadow-md bg-white`}>
            <View style={tw`flex-row self-center mb-5`}>
              <View style={tw`flex-col self-center`}>
                <Image
                  source={require("../../assets/takepic.png")}
                  style={tw`h-20 w-20`}
                />
                <Text style={tw`mt-7`}>
                  Take a picture
                </Text>
              </View>
              <View style={tw`my-7 mx-2`}>
                <Icon name='arrow-right' size={20} color="black" type='entypo'/>
              </View>
              <View style={tw`flex-col self-center`}>
                <Image
                  source={require("../../assets/report.png")}
                  style={tw`h-20 w-20`}
                />
                <Text style={tw`mt-7`}>
                  View Insights
                </Text>
              </View>
              <View style={tw`my-7 mx-2`}>
                <Icon name='arrow-right' size={20} color="black" type='entypo'/>
              </View>
              <View style={tw`flex-col self-center`}>
                <Image
                  source={require("../../assets/harvest.png")}
                  style={tw`h-20 w-20`}
                />
                <Text style={tw`mt-2`}>
                  Optimize your farming
                </Text>
                <Text>
                  practices and secure
                </Text>
                <Text>
                  a bountiful harvest
                </Text>
              </View>
            </View>
        </View>
          <TouchableOpacity style={tw`m-3`} onPress={openCamera}>
            <View style={tw`h-15 w-70 bg-black shadow-md self-center`}>
              <Text style={tw`text-xl text-white m-auto`}>
                Take a picture
              </Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={choosePhotoFromGallery} style={tw`mb-2`}>
          <View style={tw`h-15 w-70 bg-green-500 shadow-md self-center`}>
            <Text style={tw`text-xl text-white m-auto`}>
              Choose from gallery
            </Text>
          </View>
        </TouchableOpacity>
        {img && <Image source={{uri: img}} style={tw`self-center h-70 w-70`}/>}
      </View>
      </ScrollView>
    )
}

export default Home
