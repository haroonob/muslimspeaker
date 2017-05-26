import { StyleSheet, Dimensions } from 'react-native';

let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({

  header: {
    height: 50,
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    top: 0, right: 0, left: 0,
    backgroundColor: "#143520"
  },
  footer: {
    height: 80,
    bottom: 0, right: 0, left: 0,
    backgroundColor: "#fff",
    position: 'absolute',
  },
  headerLeft: {
    left: 2,
    paddingLeft: 10,
    paddingTop: 10,

    flex: 0.1
  },
  headerTitle: {
    height: 50,
    padding: 5,
    flex: 0.8
  },
  headerRight: {
    right: 0,
    flex: 0.05,
    paddingTop: 10,
    paddingLeft: 10

  },
  drawer: {
    flex: 1,

  },
  drawerHeader: {
    height: 250,
    padding: 30,
    flex: 1,

    backgroundColor: '#143520'
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 1000

  },
  drawerHeaderInfo: {
    height: 56
  },
  drawerHeaderPic: {
    width: 70,
    height: 70,
    borderRadius: 45,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#143520'
  },
  drawerHeaderTitle: {
    color: '#fff',

  },
  drawerHeaderEmail: {
    color: '#fff',

  },

  listItem: {
    borderBottomColor: '#eee',
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 20
  },
  listItemTitle: {
    flex: 6,
    color: '#000',

    textAlign: 'left',
    paddingLeft: 20
  },
  homecontainer: {
    flex: 1
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#fff',
    paddingLeft: 20,
    height: 40,

  },
  searchBoxInput: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'space-around',
    color: '#fff',
  },
  searchBoxIcon: {
    padding: 10,
    flex: 0.1,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 10,
    paddingHorizontal: 5
  },
  searchInput: {
    height: 20,
    width: width - 150,
    borderBottomWidth: 1,
    borderBottomColor: "#000"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50
  },
  inlineContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  // header: {
  //   marginTop: 17,
  //   marginBottom: 17,
  //   width: window.width,
  // },
  headerClose: {
    position: 'absolute',
    top: 10,
    left: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  downloadButton: {
    position: 'absolute',
    top: 10,
    left: width - 40,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
  },
  headerText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: 'center',
  },
  trackImage: {
    marginBottom: 20,
    width: width - 30,
    height: 300,
    marginTop: 20
  },

  trackthumb: {

    width: 30,
    height: 30

  },
  trackTitle: {
    color: "#000",
    fontFamily: "Helvetica Neue",
    textAlign: 'center',
    fontSize: 19,
    backgroundColor: 'red',

  },
  albumTitle: {
    color: "#000",
    fontFamily: "Helvetica Neue",
    fontSize: 14,
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    marginTop: 5,
    marginLeft: 45,
  },
  play: {
    marginTop: 5,
    marginLeft: 50,
    marginRight: 50,
  },
  forward: {
    marginTop: 5,
    marginRight: 45,
  },
  shuffle: {
    marginTop: 5,
  },
  volume: {
    marginTop: 5,
  },
  sliderContainer: {
    width: width
  },
  timeInfo: {
    flexDirection: 'row',
  },
  titleCenter: {
    color: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    width: width - 80,
    textAlign: 'center',
  },
  timeRight: {
    color: '#000',
    textAlign: 'right',
    flex: 1,
    fontSize: 10,
  },
  slider: {
    height: 20,
  },
  sliderTrack: {
    height: 2,
    backgroundColor: '#333',
  },
  sliderThumb: {
    width: 10,
    height: 10,
    backgroundColor: '#000',
    borderRadius: 10 / 2
  },
  trackContainer: {
    width,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#000"
  },
  trackView: {
    flex: 1,
    width,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  trackDetail: {
    flex: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackAction: {
    flex: 0.1,
    flexDirection: 'row',
    padding: 10
  },
  trackTitleImage: {
    height: 50,
    width: 50,
  },
  trackTitleContainer: {
    height: 50,
  },
  trackTitleText: {
    color: "#000",

    paddingRight: 15,
    paddingLeft: 10
  },
  trackDuration: {
    paddingRight: 10,
    color: "grey",
    paddingLeft: 5
  },
  noPaddingHorizontal: {
    paddingHorizontal: 0
  },
  containerCentered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;
