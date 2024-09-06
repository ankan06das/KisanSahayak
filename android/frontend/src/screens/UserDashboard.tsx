import React, { Component } from 'react'
import { ImageBackground, ScrollView, Text, TouchableOpacity, View, Image, SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { selectUser } from '../../slices/userSlice'
import { useFonts } from 'expo-font'
import { Icon } from '@rneui/themed'
import { BarChart } from 'react-native-chart-kit'

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

const UserDashboard = () => {
    const [loaded] = useFonts({
        Poppins: require("../../assets/fonts/Poppins/Poppins-Light.ttf"),
        PoppinsSemiBold: require("../../assets/fonts/Poppins/Poppins-SemiBold.ttf")
    })
    const user = useSelector(selectUser);
    // const firstName = user.name.split(" ")[0];
    // const lastName = user.name.split(" ")[1];
    console.log(user.crops.length);
    
    const crops = user.crops.map((crop) => {
        return crop + ", "
    })
    crops[crops.length - 1] = user.crops[crops.length - 1];    
    
    if (loaded)
    return (
        <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
                <ImageBackground
            source={require('../../assets/templategreen.png')}
            style={{position:'absolute',
            left:0, 
            right:0, 
            top:0,
            bottom:0}} />
            <ScrollView 
            style={{backgroundColor:'#00000000',
            position:'absolute',
            left:0,
            right:0,
            top:0,
            bottom:0}} >
                <View style={tw`flex-col`}>
                    <View style={tw`flex-row m-3 p-6 justify-between`}>
                        <Text style={{color: "white", fontSize: 12}}>crops: {user.crops.length}</Text>
                        <View style={tw`flex-row`}>
                            <Icon name='phone' size={20} color="white" type='feather'/>
                            <Text style={{color: "white", fontSize: 12, marginLeft: 8}}>
                                Contact No. +91-{user.phoneno}
                            </Text>
                        </View>
                    </View>
                    <View style={tw`flex-row m-6`}>
                        <TouchableOpacity
                        style={{
                        borderWidth:2,
                        borderColor:'rgb(34, 197, 94)',
                        alignItems:'center',
                        justifyContent:'center',
                        width:125,
                        height:125,
                        backgroundColor:'#fff',
                        borderRadius:140,
                        margin: 7
                    }}
                        >
                        <Image source={require('../../assets/farmermale.png')} style={tw`h-30 w-30`}/>
                        </TouchableOpacity>
                        <View style={{flexShrink: 1, marginTop: 40}}>
                            <Text style={{fontFamily: "PoppinsSemiBold", color: "white", fontSize: 17}}>{user.name}</Text>
                            <Text style={{fontFamily: "Poppins", color: "white", fontSize: 10}}>grows {crops}</Text>
                        </View>
                    </View>
                    <View style={tw`flex-row m-6`}>
                        {/* <Icon name='pluscircleo' size={20} color="white" type='antdesign'/>
                        <Text style={tw`ml-2 text-white`}>Add crops</Text> */}
                    </View>
                    <View style={tw`mt-18`}>
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
                    </View>
                </View>
            </ScrollView>
        </View>
        </SafeAreaView>
    )
}

export default UserDashboard;
