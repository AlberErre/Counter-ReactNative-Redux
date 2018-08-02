import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';

import RestartCount from './components/RestartCount';
import GreenArrow from './components/GreenArrow';
import RedArrow from './components/RedArrow';
import TextCount from './components/TextCount';

import { connect } from 'react-redux';
import actions from './actions/actions';

class Counter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground source={require('./assets/background.jpg')} resizeMode='cover' style={styles.imageBackground}>
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>

          <GreenArrow 
            add={() => this.props.addCounter()}
          />

          <View style={styles.countContainer}>
            <TextCount
              counter={this.props.counter}
            />
            <RestartCount
              reset={() => this.props.resetCounter()}
            />
          </View>

          <RedArrow 
            sub={() => this.props.subCounter()}
          />

        </View>
      </View>
      </ImageBackground>
    );
  }
}

// Esto pasa el estado a props, por eso hacemos this.props.counter
// en lugar de this.state.counter
const mapSateToProps = (state) => (
  {
    counter: state.counter
  }
);

// Esto hace dispatch de las acciones mediante this.props.XXXX
// luego eso se pasa al onPress dentro del componente
// lo metemos en connect, esta aqui para poner las funciones como una prop mas
const mapDispatchToProps = (dispatch) => (
  {
    //addCounter: () => dispatch({ type: 'INCREASE_COUNT'}),
    addCounter: () => dispatch(actions.add),
    subCounter: () => dispatch(actions.sub),
    resetCounter: () => dispatch(actions.reset)
  }
);

export default connect(mapSateToProps, mapDispatchToProps)(Counter);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 300,
    height: 300,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 100,
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 300,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});
