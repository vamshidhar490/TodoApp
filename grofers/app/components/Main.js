import React, { Component } from 'react';
import { Text,
        View,
        StyleSheet,
        TextInput,
        ScrollView,
        TouchableOpacity,
        KeyboardAvoidingView,
        StatusBar
} from 'react-native';
import Note from './Note.js';


export default class App extends Component {
  componentDidMount() {
     StatusBar.setHidden(true);
  }
  constructor(props){
    super(props);
    this.state={
      noteArray:[],
      noteText: '',
    }
  }
  render() {
    let notes = this.state.noteArray.map((val,key) => {
      return <Note key={key} keyval={key} val={val}
        deleteMethod={ ()=>this.deleteNote(key)}/>
    });

    return (
      <KeyboardAvoidingView
      style={styles.container}
      >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Grofers</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {notes}
        </ScrollView>
        <View style={styles.footer}>

          <TextInput
            style={styles.textInput}
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
            placeholder='Buy'
            placeholderTextColor='white'
            underlineColorAndroid='transparent'>
          </TextInput>

        </View>
        <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    );
  }
  addNote(){
    if(this.state.noteText){
      var d = new Date();
      this.state.noteArray.push({
        'date':d.getFullYear()+
        "/" + (d.getMonth() + 1) +
        "/" + d.getDate(),
        'note': this.state.noteText
      });
      this.setState({noteArray: this.state.noteArray})
      this.setState({noteText:''});

    }

  }

  deleteNote(key){
    this.state.noteArray.splice(key, 1);
    this.setState({noteArray:this.state.noteArray})
  }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#094ab5",
    },
    header: {
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent:'center',
        borderBottomWidth: 10,
        borderBottomColor: '#121212'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    textInput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#071538',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 90,
        backgroundColor: '#008B8B',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
});
