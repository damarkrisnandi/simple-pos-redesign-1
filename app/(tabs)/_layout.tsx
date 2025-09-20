// import { icons } from "@/constants/icons";
// import { images } from "@/constants/images";
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { Badge } from '../../components/ui/Badge';
import { Colors } from '../../constants/Colors';
import { CartItem } from '../../models/product';


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
  // {
  //   name: "profile",
  //   title: "Profile",
  //   icon: 'user',
  //   showTitle: false,
  //   showIcon: true,
  // }
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
            minWidth: 120,
            minHeight: 40,
          }}
        >
          {showIcon && <Feather name={icon} size={18} style={{
            color: Colors.secondary,
            marginRight: showTitle ? 4 : 0,
          }} />}
          {showTitle && <Text style={{
            color: Colors.secondary,
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
          padding: 5,
          borderRadius: 50,
          minWidth: 120,
          minHeight: 40,
        }}
      >
        {showIcon && <Feather name={icon} size={18} style={{
          color: '#fff',
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

const OrdersTabIcon = ({ icon, title, focused, showTitle, showIcon }: TabIconProps) => {
  const cartCounts = useSelector((state: any) => state.cart.items.reduce((curr: number, item: CartItem) => curr + item.quantity, 0) ?? undefined);

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
            minWidth: 120,
            minHeight: 40,
          }}
        >
          {showIcon && <Feather name={icon} size={18} style={{
            color: Colors.secondary,
            marginRight: showTitle ? 4 : 0,
          }} />}
          {showTitle && <Text style={{
            color: Colors.secondary,
            fontSize: 9,
            fontWeight: '600',
          }}>{title}</Text>}
          {cartCounts > 0 && <Badge variant='secondary' label={cartCounts} />}
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
          padding: 5,
          borderRadius: 50,
          minWidth: 100,
          minHeight: 40,
        }}
      >
        {showIcon && <Feather name={icon} size={18} style={{
          color: '#fff',
          marginRight: showTitle ? 4 : 0,
        }} />}
        {/* {showTitle && <Text style={{
          color: '#000',
          fontSize: 12,
          fontWeight: '600',
        }}>{title}</Text>} */}
        {cartCounts > 0 && <Badge variant='primary' label={cartCounts} textStyle={{ color: Colors.secondary, fontSize: 12, fontWeight: '600' }} />}
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
          justifyContent: 'space-between',
          alignItems: 'center',
          shadowColor: '#f3f3f3',
          shadowOpacity: 0.1,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
        },
        tabBarStyle: {
          backgroundColor: Colors.secondary,
          borderRadius: 50,
          marginHorizontal: 70,
          marginBottom: 50,
          height: 52,
          position: 'absolute',

          overflow: 'hidden',
          borderWidth: 0,
          // width: 300,
          paddingHorizontal: 10,
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

            tabBarActiveTintColor: Colors.primary,
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <>
                {tab.name === 'orders' ? <OrdersTabIcon
                  icon={tab.icon}
                  title={tab.title}
                  focused={focused}
                  showIcon={tab.showIcon}
                  showTitle={tab.showTitle}
                /> : <TabIcon
                  icon={tab.icon}
                  title={tab.title}
                  focused={focused}
                  showIcon={tab.showIcon}
                  showTitle={tab.showTitle}
                />
                }
              </>
            )
          }}
        />
      ))}



    </Tabs>
  )
}
