import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommentScreen = ({ route, navigation }) => {
  const { topic } = route.params;
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');
  const [comments, setComments] = useState([]);

  // Carregar os comentários ao montar o componente
  useEffect(() => {
    const loadComments = async () => {
      try {
        const savedComments = await AsyncStorage.getItem(
          `comments-${topic.id}`
        );
        if (savedComments) {
          setComments(JSON.parse(savedComments));
        }
      } catch (error) {
        console.error('Erro ao carregar os comentários', error);
      }
    };

    loadComments();
  }, [topic.id]);

  // Função para salvar os comentários no AsyncStorage
  const saveComments = async newComments => {
    try {
      await AsyncStorage.setItem(
        `comments-${topic.id}`,
        JSON.stringify(newComments)
      );
    } catch (error) {
      console.error('Erro ao salvar os comentários', error);
    }
  };

  const handleAddComment = () => {
    if (author.trim() === '' || comment.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha seu nome e o comentário.');
      return;
    }

    const newComment = { author, comment };
    const updatedComments = [...comments, newComment];

    // Atualiza o estado e salva os novos comentários
    setComments(updatedComments);
    saveComments(updatedComments); // Salva os comentários no AsyncStorage

    // Limpa os campos
    setAuthor('');
    setComment('');
  };

  // Função para excluir um comentário
  const handleDeleteComment = async (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1); // Remove o comentário pela posição do índice

    // Atualiza o estado e salva novamente os comentários no AsyncStorage
    setComments(updatedComments);
    await saveComments(updatedComments); // Salva os comentários atualizados no AsyncStorage
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{topic.title}</Text>
          <Text style={styles.content}>{topic.content}</Text>

          {/* Lista de Comentários - Agora no topo */}
          <ScrollView style={styles.commentsList}>
            {comments.length === 0 ? (
              <Text style={styles.noCommentsText}>Nenhum comentário ainda.</Text>
            ) : (
              comments.map((c, index) => (
                <View key={index} style={styles.comment}>
                  <Text style={styles.commentAuthor}>{c.author}:</Text>
                  <Text style={styles.commentText}>{c.comment}</Text>

                  {/* Botão para excluir comentário */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteComment(index)}
                  >
                    <Text style={styles.deleteButtonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>

          {/* Campo de Texto para Adicionar Novo Comentário - Agora abaixo da lista */}
          <TextInput
            style={[styles.input, styles.input]}
            placeholder="Seu nome"
            value={author}
            onChangeText={setAuthor}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Escreva um comentário..."
            value={comment}
            onChangeText={setComment}
            multiline
          />

          <Button title="Adicionar Comentário" onPress={handleAddComment} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    marginVertical: 10,
  },
  commentsList: {
    flex: 1, // Ocupa o máximo de espaço possível
    marginBottom: 20, // Espaço entre os comentários e o campo de texto
  },
  comment: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  noCommentsText: {
    color: '#BDC3C7',
    fontSize: 18,
    textAlign: 'center',
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
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
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#E74C3C', // Cor do botão de exclusão
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    width: 100,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CommentScreen;
