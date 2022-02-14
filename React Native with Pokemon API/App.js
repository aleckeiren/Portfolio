// StAuth10244: I Alec Pasion, 000811377 certify that this material is my original work. 
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone else.

import React, { useState, useEffect } from 'react';
import { Button, Text, TextInput, FlatList, View, Image, SectionList, StatusBar, StyleSheet, ScrollView, Pressable, ImageBackground } from 'react-native';
import {Picker} from '@react-native-picker/picker';

function App() {
  const [data, setData] = useState([]);
  const [pokemonAbilities, setAbilities] = useState([]);
  const [pokemonImage, setImage] = useState('./assets/81cd6759a1559cbb9af897c512ec77b1.png');
  const [pokemonTypes, setType] = useState('');
  const [pokemonStats, setStats] = useState([]);
  const [pokemonName, setName] = useState('');
  const [selectedValue, setSelected] = useState('pokemon');
  const [searchText, setText] = useState('');
  const [firstLoad, setLoad] = useState(true)
  const [shouldShowPokemon, setShouldShowPokemon] = useState(false);
  const [shouldShowMove, setShouldShowMove] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [damageClass, setDmgClass] = useState([]);
  const [moveName, setMoveName] = useState("");
  const [moveAccuracy, setAccuracy] = useState("");
  const [moveEffects, setEffects] = useState([]);
  const [learnedBy, setLearnedBy] = useState([]);
  const [background, setBackground] = useState('./assets/1089608.png')
  var search = "";
  var pokemon = [];
  var move = [];
  useEffect(() => {
    getSearchResults();
  }, []);
  // uses the search term in the input textbox as an argument to this API:
  //    https://domainsdb.info/
  function newSearchtext(e) {
    search = e.target.id
    setSelected('pokemon')
    setText(search)
  }
  async function getSearchResults()
  {
    if(firstLoad){
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const json = await response.json();
        // sets the array of domains to the array of domains returned by the API
        setData(json);
      } catch (error) { console.error(error); }
      setLoad(false)
    }else{
      if(searchText == null || searchText == ""){
        return null;
      }
      if(selectedValue == "pokemon"){
        let url = 'https://pokeapi.co/api/v2/pokemon/'+ searchText.replace(/\s+/g, '-').toLowerCase();
        try {
          const response = await fetch(url);
          const json = await response.json();
          setNotFound(false);
          pokemon = json
          setData(pokemon)
          setShouldShowMove(false)
          setShouldShowPokemon(true)
          setImage(pokemon.sprites.front_default)
          setType(pokemon.types)
          for (let i = 0; i < pokemon.abilities.length; i++) {
            let name = pokemon.abilities[i].ability.name.replace(/-/g,' ');
            pokemon.abilities[i].ability.name = name
          } 
          setAbilities(pokemon.abilities)
          for (let i = 0; i < pokemon.stats.length; i++) {
            let name = pokemon.stats[i].stat.name.replace(/-/g,' ');
            pokemon.stats[i].stat.name = name
          } 
          setStats(pokemon.stats)
          let pokeName = pokemon.name.replace(/-/g,' ');
          pokemon.name = pokeName
          setName(pokemon.name)
        } catch (error) { 
          console.error(error); 
          setNotFound(true);
        }
      }
      if(selectedValue == "move"){
        let url = 'https://pokeapi.co/api/v2/move/' + searchText.replace(/\s+/g, '-').toLowerCase();
        try {
          const response = await fetch(url);
          const json = await response.json();
          setShouldShowPokemon(false);
          setNotFound(false);
          setShouldShowMove(true);
          move = json
          setDmgClass(move.damage_class)
          setMoveName(move.name)
          setAccuracy(move.accuracy)
          setEffects(move.effect_entries)
          setLearnedBy(move.learned_by_pokemon)
          for(let i = 0; i < move.learned_by_pokemon.length; i++){
            let name = move.learned_by_pokemon[i].name.replace(/-/g,' ');
            move.learned_by_pokemon[i].name = name
          }
        } catch (error) { 
          console.error(error); 
          setNotFound(true);
        }
      }
    }
  }

  function clearResults() {
    setShouldShowPokemon(false);
    setShouldShowMove(false);
  }
  function handleKeyPress(e) {
    if(e.key === 'Enter'){
      getSearchResults()
    }
  }
  // displays the domains returned from the API in a FlatList
  return (
    <View style={{ flex: 1}}>
      <ImageBackground source={require('./assets/1089608.png')} resizeMode="cover" style={styles.image}>
      <View style={{backgroundColor:"#CE2211", paddingTop:8,paddingBottom:8}}>
          <Image
            style={styles.logo}
            source={require('./assets/81cd6759a1559cbb9af897c512ec77b1.png')}
          />
      </View>
      <View style={{ marginTop: 20, width:"80%", display: "flex",marginLeft: "auto",marginRight: "auto"}}>
        <View  style={{ marginTop: 2}}>
          <Text style={{fontWeight:'bold'}}>Search By:</Text>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 40, backgroundColor:'rgba(200, 200, 200, 0.78)'}}
            onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
          >
            <Picker.Item label="Pokemon" value="pokemon" />
            <Picker.Item label="Move" value="move" />
          </Picker>
        </View>
        <View  style={{ marginTop:14, marginBottom:14,backgroundColor:'rgba(200, 200, 200, 0.78)'}}>
          <TextInput
            style={{height: 40, width:"100%",padding:5}}
            placeholder="Enter Search Term"
            value={searchText}
            onKeyPress={handleKeyPress}
            onChangeText={term => setText(term)}
          />
        </View>
      </View>
      <View  style={{ marginTop: 2, alignItems: 'center'}}>
        <View style={{width:"50%"}}><Button color="#0C3348" onPress={getSearchResults} title="Search"  /></View>
      </View>
      <View style={{ marginTop: 2, alignItems: 'center', paddingBottom:30}}>
        <View style={{width:"50%"}}><Button color="#e54222" onPress={clearResults} title="Clear Results"  /></View>
      </View>
      </ImageBackground>
      {notFound ?
        (
          <Text style={{marginTop:2,textAlign:"center", color: 'red'}}>Not Found</Text>
        ) : null}
      {shouldShowPokemon ?
        (
          <View style={{flex: 1,paddingTop:20, margin: 'auto', backgroundColor:"white"}}>
            <View style={{padding: 24, marginLeft: 'auto',marginRight:'auto', backgroundColor:"white",borderWidth:24, borderColor:"rgb(230, 188, 47)"}}>
              <View style={{textTransform: 'uppercase', fontWeight:'bold', alignItems: 'center', borderStyle:'solid', borderWidth:1}}>
                <Text style={{textTransform: 'uppercase', fontWeight:'bold', marginTop:2}}>{pokemonName}</Text>
                <Image
                  style={{ height: 100, width: 100, margin: 'auto'}}
                  source={{uri: pokemonImage}}
                />
              </View>
              <View style={{flexDirection: 'row', justifyContent:'space-between',marginBottom:8}}>
                <Text style={{fontWeight:'bold'}}>Pokemon Type:</Text>
                <FlatList
                  data={pokemonTypes}
                  renderItem={({item}) => <Text style={{textAlign:'right',textTransform: 'capitalize'}}>{item.type.name}</Text>}
                  keyExtractor={(item,index) => index.toString()}
                />
              </View>
              <View style={{flexDirection: 'row', justifyContent:'space-between', borderStyle:'solid', borderBottomWidth:1,}}>
                <View><Text style={{fontWeight:'bold'}}>Starter</Text><Text style={{fontWeight:'bold'}}>Abilities:</Text></View>
                <View style={{marginLeft: 'auto',textAlign: 'right'}}>
                  <FlatList
                    data={pokemonAbilities}
                    renderItem={({item}) =><Text style={{textTransform: 'capitalize',textAlign:'right'}}>{item.ability.name}</Text>}
                    keyExtractor={(item,index) => index.toString()}
                  />
                </View>
              </View>
              <View style={{width:200}}>
                <FlatList
                  data={pokemonStats}
                  renderItem={({item}) => <View style={{flexDirection: 'row', justifyContent:'space-between', borderStyle:'solid', borderBottomWidth:1}}><Text style={{textTransform:'capitalize', fontWeight:'bold'}}>{item.stat.name}</Text><Text>{item.base_stat}</Text></View>}
                  keyExtractor={(item,index) => index.toString()}
                />
              </View>
            </View>
          </View>
        ) : null}
        {shouldShowMove ?
        (
          <View style={{flex: 1, paddingTop:20, marginLeft: 'auto',marginRight:'auto', backgroundColor:"white"}}>
            <View style={{padding: 24, backgroundColor:"white",borderWidth:24, borderColor:"rgb(230, 188, 47)"}}>
              <View style={{alignItems:'center', paddingTop:5, paddingBottom: 14}}>
                <Text style={{textTransform:'capitalize',fontWeight:'bold'}}>Move</Text>
                <Text style={{textTransform:'capitalize',}}>{moveName}</Text>
              </View>
              <View style={{width:200}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', borderStyle:'solid', borderBottomWidth:1, marginBottom:6}}><Text style={{textTransform:'capitalize', fontWeight:'bold'}}>Damage Type:</Text><Text style={{textTransform:'capitalize'}}> {damageClass.name}</Text></View>
                <View style={{flexDirection: 'row', justifyContent:'space-between', borderStyle:'solid', borderBottomWidth:1, marginBottom:6}}><Text style={{textTransform:'capitalize', fontWeight:'bold'}}>Accuracy:</Text><Text style={{textTransform:'capitalize'}}> {moveAccuracy}</Text></View>
                <View style={{borderStyle:'solid', borderBottomWidth:1, marginBottom:6}}>
                  <Text style={{textTransform:'capitalize', fontWeight:'bold'}}>Effect:</Text>
                  <FlatList
                    data={moveEffects}
                    renderItem={({item}) => <Text>{item.short_effect}</Text>}
                    keyExtractor={(item,index) => index.toString()}
                  />
                </View>
                <View style={{flexDirection: "row",justifyContent: 'space-between'}}>
                  <Text  style={{width:"50%", fontWeight:'bold'}}>Learned By:</Text>
                  <FlatList
                    data={learnedBy}
                    style={{height:80,scrollbarWidth: 'thin'}}
                    renderItem={({item}) => <Pressable onPress={newSearchtext}><Text nativeID={item.name} style={{textAlign: "right", textTransform:'capitalize'}}>{item.name}</Text></Pressable>}
                    keyExtractor={(item,index) => index.toString()}
                  />
                </View>
              </View>
            </View>
          </View>
        ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  logo: {
    height: 58,
    width:'auto',
    resizeMode: 'contain'
  },
  image: {
    justifyContent: "center",

  },
});
export default App;