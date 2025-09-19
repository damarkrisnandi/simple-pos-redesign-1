// import { icons } from "@/constants/icons";
// import { images } from "@/constants/images";
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
import { Text, View } from "react-native";


type TabIconProps = {
  icon: any;
  title: string;
  focused: boolean;
  showTitle?: boolean;
  showIcon?: boolean;
}
const tabs = [
  {
    name: "index",
    title: "Home",
    icon: 'grid',
    showTitle: true,
    showIcon: true,
  },
  {
    name: "orders",
    title: "Orders",
    icon: 'shopping-cart',
    showTitle: true,
    showIcon: true,
  },
  {
    name: "profile",
    title: "Profile",
    icon: 'user',
    showTitle: true,
    showIcon: true,
  }
];

const TabIcon = ({ icon, title, focused, showTitle, showIcon }: TabIconProps) => {
  if (focused) {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'row',
            gap: 4,
            backgroundColor: '#c0e863',
            padding: 5,
            borderRadius: 50,
            minWidth: 100,
            minHeight: 40,
          }}
        >
          {showIcon && <Feather name={icon} size={18} style={{
            color: '#000',
            marginRight: showTitle ? 4 : 0,
          }} />}
          {showTitle && <Text style={{
            color: '#000',
            fontSize: 12,
            fontWeight: '600',
          }}>{title}</Text>}

        </View>

      </>
    )
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: 'row',
          gap: 4,
          // backgroundColor: '#c0e863',
          padding: 5,
          borderRadius: 50,
          minWidth: 100,
          minHeight: 40,
        }}
      >
        {showIcon && <Feather name={icon} size={18} style={{
          color: '#000',
          marginRight: showTitle ? 4 : 0,
        }} />}
        {/* {showTitle && <Text style={{
          color: '#000',
          fontSize: 12,
          fontWeight: '600',
        }}>{title}</Text>} */}

      </View>
    </>
  )
}
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#f3f3f3',
          borderRadius: 50,
          marginHorizontal: 10,
          marginBottom: 50,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 0,
          // paddingHorizontal: 2,
          paddingTop: 7,
          paddingBottom: 5,
          // shadowOffset: {
          //   width: 0,
          //   height: 0,
          // },
        }
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,

            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon
                icon={tab.icon}
                title={tab.title}
                focused={focused}
                showIcon={tab.showIcon}
                showTitle={tab.showTitle}
              />
            )
          }}
        />
      ))}



    </Tabs>
  )
}
