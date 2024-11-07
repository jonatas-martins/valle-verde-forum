import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';

const CreateTopicScreen = ({ route, navigation }) => {
  const { addTopic } = route.params; // Função para adicionar tópico recebida como parâmetro
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateTopic = () => {
    if (title.trim() === '' || content.trim() === '') {
      Alert.alert(
        'Erro',
        'Por favor, preencha o título e o conteúdo do tópico.'
      );
      return;
    }

    const newTopic = {
      id: (Math.random() * 1000).toString(), // Gerar um ID simples para o tópico
      title,
      content,
    };

    addTopic(newTopic); // Chama a função de adicionar tópico passando o novo tópico

    // Navega de volta para a tela inicial
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Conteúdo"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Criar Tópico" onPress={handleCreateTopic} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default CreateTopicScreen;
