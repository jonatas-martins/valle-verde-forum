import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopicItem from '../components/TopicItem'; // Componente para o item da lista de tópicos

const HomeScreen = () => {
  const [topics, setTopics] = useState([]);
  const navigation = useNavigation();

  // Carregar os tópicos ao montar o componente
  useEffect(() => {
    const loadTopics = async () => {
      try {
        const savedTopics = await AsyncStorage.getItem('topics');
        if (savedTopics) {
          setTopics(JSON.parse(savedTopics));
        }
      } catch (error) {
        console.error('Erro ao carregar os tópicos', error);
      }
    };

    loadTopics();
  }, []);

  // Função para salvar os tópicos no AsyncStorage
  const saveTopics = async newTopics => {
    try {
      await AsyncStorage.setItem('topics', JSON.stringify(newTopics));
    } catch (error) {
      console.error('Erro ao salvar os tópicos', error);
    }
  };

  const handleAddTopic = () => {
    // Navega para a tela de criação de tópico
    navigation.navigate('Topicos', {
      addTopic: addNewTopic, // Passa a função de adicionar novo tópico como parâmetro
    });
  };

  const addNewTopic = newTopic => {
    // Adiciona o novo tópico à lista de tópicos
    const updatedTopics = [...topics, newTopic];
    setTopics(updatedTopics);
    saveTopics(updatedTopics); // Salva os tópicos no AsyncStorage
  };

  const handleTopicClick = topic => {
    // Navega para a tela de comentários, passando os dados do tópico
    navigation.navigate('Comentarios', { topic });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Condomínio Vale Verde</Text>

      {/* Botão Novo Tema posicionado no final */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTopic}>
        <Text style={styles.addButtonText}>Novo Tema</Text>
      </TouchableOpacity>

      {/* Lista de tópicos */}
      <ScrollView style={styles.topicList}>
        {topics.length === 0 ? (
          <Text style={styles.noTopicsText}>Nenhum tópico criado ainda</Text>
        ) : (
          topics.map(topic => (
            <TouchableOpacity
              key={topic.id}
              onPress={() => handleTopicClick(topic)}
            >
              <TopicItem title={topic.title} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#232d11', // Cor de fundo escura
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ECF0F1', // Cor do título mais clara para destacar no fundo escuro
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Roboto', // Uma fonte mais destacada
  },
  addButton: {
    marginTop: 'auto', // Posiciona o botão "Novo Tema" no final da tela
    backgroundColor: '#7F7F7F', // Cor do botão em vermelho
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff', // Texto branco para contraste
    fontSize: 18,
    fontWeight: 'bold',
  },
  topicList: {
    marginTop: 10,
  },
  noTopicsText: {
    color: '#BDC3C7',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HomeScreen;
