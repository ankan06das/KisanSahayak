import React, { Component, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import { Icon } from '@rneui/themed';
import * as ImagePicker from "expo-image-picker";
import tw from 'twrnc'
import { selectUser, setPredictionData } from '../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import * as Speech from "expo-speech"
import { BarChart } from 'react-native-chart-kit';

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43]
    }
  ]
};

const chartConfig = {
  backgroundColor: "#3437eb",
  backgroundGradientFrom: "#0088ff",
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const Home = () => {
  const [img, setImg] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log(user);
  const handleVoice = () => {
    Speech.speak("कार्यक्रम में उपस्थित चीफ जस्टिस ऑफ इंडिया डी वाई चंद्रचूड़ जी, जस्टिस श्री संजीव खन्ना जी, जस्टिस बी आर गवई जी, देश के कानून मंत्री अर्जुनराम मेघवाल जी, अटॉर्नी जनरल आर वेंकट रमानी जी, सुप्रीम कोर्ट बार काउंसिल के अध्यक्ष श्रीमान कपिल सिब्बल जी, बार काउंसिल ऑफ इंडिया के अध्यक्ष भाई मनन कुमार मिश्रा जी, सुप्रीम कोर्ट के सभी judges, हाईकोर्ट्स के Chief Justices, district judges, अन्य महानुभाव, देवियों एवं सज्जनों!", {
      language: "hi-IN",
      pitch: 0.05,
      volume: 10
    });
  }

  const [predictionsData, setPredictionsData] = useState({});
  
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

  const handlePredict = () => {
    setPredictionsData(data);
    dispatch(setPredictionData(data));
  }
    return (
    <ScrollView>
      <View style={tw`flex-col`}>
        <View style={tw`flex-row`}>
          {registeredCropsSource.map((crops) => {
              return (
                <View style={tw`flex-col items-center`}>
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
              <Text key={crops.name}>
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
        {img && <TouchableOpacity
        onPress={handleVoice} style={tw`mb-2`}>
          <View style={tw`h-15 w-70 bg-blue-500 shadow-md self-center`}>
            <Text style={tw`text-xl text-white m-auto`}>
              Predict
            </Text>
          </View>
        </TouchableOpacity>}
        {/* {img && <Image source={{uri: img}} style={tw`self-center h-70 w-70`}/>} */}
        {Object.keys(predictionsData).length > 0 && <View style={tw`mt-18`}>
                    <Text style={{alignSelf: 'center', fontFamily: "Poppins"}}>
                        Annual Rainfall
                    </Text>
                    <BarChart
                        style={{marginVertical: 8,
                            }}
                        data={data}
                        width={400}
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix='mm'
                        chartConfig={chartConfig}
                        verticalLabelRotation={0}
                        />
                    </View>}
      </View>
      </ScrollView>
    )
}

export default Home
