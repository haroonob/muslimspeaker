import React, { Component } from 'react';
import {
  ListView, View, Alert,
  ScrollView,
  Text,
  Image,
  Dimensions,
  Platform,

  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles';
import {Actions,ActionConst} from 'react-native-router-flux';


class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.appinfo.profile == undefined)
      return null;
   else   
    return (

      <ScrollView >
        <View style={styles.drawerHeader} key={0}>
          <View style={styles.drawerHeaderPic} key={0}>
            <Image style={{ width: 70, height: 70, borderRadius: 45 }} source={{ uri: Platform.OS === 'android' ? 'file://' + this.props.appinfo.profile.profile_picture : '' + this.props.appinfo.profile.profile_picture }} />
          </View>
          <View key={1}>
            <Text key={0} style={styles.drawerHeaderTitle}>
              {this.props.appinfo.profile.name}
            </Text>
            <Text style={styles.drawerHeaderEmail} key={1}>
              {this.props.appinfo.profile.email}
            </Text>
          </View>
        </View>
        <View style={styles.content} key={1}>
          {this.props.appinfo.categories.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.listItem} onPress={() => {
                this.props.navProps.setCurrentCategory({category:item});
                this.props.navProps.searchTrack(item, '');
                this.props.navProps.getTracks(item);
                this.props.closeDrawer();
                }}>
              <Icon name={item.thumb} size={30} color='#000' />
              <Text style={styles.listItemTitle}>{item.label}</Text>

            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.content}>
          
          <TouchableOpacity
            style={styles.listItem} onPress={() => Alert.alert('Refresh')}>
            <Icon name='refresh' size={30} color='#000' />
            <Text style={styles.listItemTitle}>Refresh</Text>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem} onPress={() => Alert.alert('Share')}>
            <Icon name='share-alt' size={30} color='#000' />
            <Text style={styles.listItemTitle}>Share App</Text>

          </TouchableOpacity>
         <TouchableOpacity
            style={styles.listItem} onPress={() =>{  
              Actions.home({type:ActionConst.RESET});
                Actions.test({})
          }}>
            <Icon name='share-alt' size={30} color='#000' />
            <Text style={styles.listItemTitle}>Share App</Text>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.listItem} onPress={() => Alert.alert('Setting')}>
            <Icon name='cogs' size={30} color='#000' />
            <Text style={styles.listItemTitle}>Setting</Text>

          </TouchableOpacity>
         
        </View>
      </ScrollView>


    );
  }
}

module.exports = Menu;

