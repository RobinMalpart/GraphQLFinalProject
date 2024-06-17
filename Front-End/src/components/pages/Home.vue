<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    <!-- Main Content -->
    <main class="container grid grid-cols-4 min-h-screen">
        <!-- Colonne de gauche -->
        <div class="col-span-1 flex flex-col border-r-2 mt-5">
            <div class="flex">
                <img class="h-12 w-12 object-cover rounded-full me-3" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg" alt="Image de profil">
                <div class="flex flex-col">
                    <h4 class="font-bold">Flambyscuit</h4>
                    <a>Voir mon profil</a>
                </div>
            </div>
            <div class="mt-3 me-2">
                <a class="flex my-1 rounded-md p-1 hover:bg-slate-300" href="#">
                    <NewspaperIcon class="h-6 w-6 text-[#385999]" />
                    <h5 class="my-auto ms-2">Flux d'actualités</h5>
                </a>
                <a class="flex my-1 rounded-md p-1 hover:bg-slate-300" href="#">
                    <ChatBubbleLeftRightIcon class="h-6 w-6 text-[#385999]" />
                    <h5 class="my-auto ms-2">Messages</h5>
                </a>
                <a class="flex my-1 rounded-md p-1 hover:bg-slate-300" href="#">
                    <CalendarDaysIcon class="h-6 w-6 text-[#385999]" />
                    <h5 class="my-auto ms-2">Evenements</h5>
                </a>
                <a class="flex my-1 rounded-md p-1 hover:bg-slate-300" href="#">
                    <PhotoIcon class="h-6 w-6 text-[#385999]" />
                    <h5 class="my-auto ms-2">Photos</h5>
                </a>
                <a class="flex my-1 rounded-md p-1 hover:bg-slate-300" href="#">
                    <UsersIcon class="h-6 w-6 text-[#385999]" />
                    <h5 class="my-auto ms-2">Amis</h5>
                </a>
            </div>
        </div>

        <!-- Colonne du milieu -->
        <div class="col-span-2 mt-5 flex flex-col">
        <!-- Options de filtrage et tri -->
            <div class="flex justify-between mx-6">
                <div class="mb-4">
                    <label for="authorFilter" class="block text-sm font-medium text-gray-700">Filtrer par auteur</label>
                    <input v-model="filters.author" type="text" id="authorFilter" placeholder="Auteur" class="w-full p-2 border rounded" />
                </div>
                <div class="mb-4">
                    <label for="sortLikes" class="block text-sm font-medium text-gray-700">Nombre de likes</label>
                    <select v-model="filters.sortLikes" id="sortLikes" class="p-2 border rounded">
                        <option value="asc">Croissant</option>
                        <option value="desc">Décroissant</option>
                    </select>
                </div>
            </div>

            <!-- Formulaire de création d'article -->
            <div class="card bg-white shadow-md rounded-lg p-4 mb-4 mx-5">
                <h2 class="text-xl font-bold mb-4">Quoi de neuf ?</h2>
                <form @submit.prevent="createArticle">
                    <input v-model="newArticle.title" type="text" placeholder="Titre de l'article" class="w-full p-2 mb-2 border rounded" />
                    <textarea v-model="newArticle.content" placeholder="Contenu de l'article" class="w-full p-2 mb-2 border rounded"></textarea>
                    <input v-model="newArticle.author" type="text" placeholder="Auteur de l'article" class="w-full p-2 mb-2 border rounded" />
                    <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Créer l'article
                    </button>
                </form>
            </div>
            
            <div class="card bg-white shadow-md rounded-lg p-4 mb-4 mx-5" v-for="article in articles" :key="article.id">
                <div class="border-b-4">
                    <h2 class="text-xl font-bold">{{ article.title }}</h2>
                    <p class="text-sm">{{ article.author }}</p>
                    <p class="my-3">{{ article.content }}</p>
                </div>
                
                <div class="flex justify-around mt-3">
                    <button @click="likeArticle(article.id)" class="flex">
                        <HandThumbUpIcon class="h-8 w-8" /> 
                        <span class="my-auto ms-1">{{ article.nbLike }}</span>
                    </button>

                    <button @click="article.showComments = !article.showComments" class="flex">
                        <ChatBubbleOvalLeftEllipsisIcon class="h-8 w-8" /> <span class="my-auto ms-1">{{ article.comments.length }}</span>
                    </button>

                    <button @click="startEditing(article)" class="flex"><PencilSquareIcon class="h-8 w-8" /><span class="my-auto ms-1">Modifier</span></button>
                </div>
                
                <!-- Affichage des commentaires -->
                <div v-if="article.showComments">
                    <div v-for="comment in article.comments" :key="comment.id" class="bg-gray-100 p-2 rounded mt-2">
                        <p><strong>{{ comment.username }}:</strong> {{ comment.comment }}</p>
                    </div>
                    <!-- Formulaire d'ajout de commentaire -->
                    <form @submit.prevent="addComment(article.id)" class="mt-4">
                        <input v-model="newComment.username" type="text" placeholder="Votre nom" class="w-full p-2 mb-2 border rounded"/>
                        <textarea v-model="newComment.comment" placeholder="Votre commentaire" class="w-full p-2 mb-2 border rounded"></textarea>
                        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Ajouter un commentaire</button>
                    </form>
                </div>

                 <!-- Formulaire de modification d'article -->
                <div v-if="article.isEditing" class="mt-4">
                    <form @submit.prevent="editArticle(article.id)">
                    <input v-model="editArticleData.title" type="text" placeholder="Titre de l'article" class="w-full p-2 mb-2 border rounded"/>
                    <textarea v-model="editArticleData.content" placeholder="Contenu de l'article" class="w-full p-2 mb-2 border rounded"></textarea>
                    <button type="submit" class="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
                        Enregistrer les modifications
                    </button>
                    <button @click="cancelEditing(article)" type="button" class="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 mt-2">
                        Annuler
                    </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Colonne de droite -->
        <div class="col-span-1 mt-5">
            <h6 class="text-slate-400">Sponsored</h6>
                <div class="flex flex-col">
                    <div class="flex">
                        <span class="h-48 w-48 m-2 bg-slate-300 rounded-md">Ad 1</span>
                        <span class="h-48 w-48 m-2 bg-slate-300 rounded-md">Ad 2</span>
                    </div>
                    <span class="h-48 w-68 m-2 bg-slate-300 rounded-md">Ad 3</span>
                </div>
                
        </div>      
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue';
import { 
  NewspaperIcon, 
  UsersIcon, 
  ChatBubbleLeftRightIcon, 
  CalendarDaysIcon, 
  PhotoIcon, 
  ChatBubbleOvalLeftEllipsisIcon,
  HandThumbUpIcon,
  PencilSquareIcon
} from '@heroicons/vue/24/outline';

export default defineComponent({
  name: 'Home',
    components: {
        NewspaperIcon,
        UsersIcon,
        ChatBubbleLeftRightIcon,
        CalendarDaysIcon,
        PhotoIcon,
        ChatBubbleOvalLeftEllipsisIcon,
        HandThumbUpIcon,
        PencilSquareIcon
    },
  setup() {
    const state = reactive({
      articles: [
        {
          id: 1,
          title: 'Article 1',
          content: 'Content of Article 1',
          author: 'Author 1',
          nbLike: 435,
          comments: [
            { id: 1, username: 'User1', comment: 'Great article!' },
            { id: 2, username: 'User2', comment: 'Very informative.' },
          ],
        },
        {
          id: 2,
          title: 'Article 2',
          content: 'Content of Article 2',
          author: 'Author 2',
          nbLike: 123,
          comments: [
            { id: 1, username: 'User3', comment: 'Thanks for sharing!' },
          ],
        },
        {
          id: 3,
          title: 'Article 3',
          content: 'Content of Article 3',
          author: 'Author 3',
          nbLike: 345,
          comments: [],
        }
      ].map(article => ({ ...article, showComments: false, isEditing: false })),
      newComment: {
        username: '',
        comment: ''
      },
      newArticle: {
        title: '',
        content: '',
        author: ''
      },
      editArticleData: {
        id: null,
        title: '',
        content: ''
      },
      filters: {
        author: '',
        likes: 0,
        sortLikes: 'asc'
      }
    });

    const filteredArticles = computed(() => {
      let result = state.articles.filter(article => {
        const matchesAuthor = state.filters.author ? article.author.includes(state.filters.author) : true;
        const matchesLikes = state.filters.likes ? article.nbLike >= state.filters.likes : true;
        return matchesAuthor && matchesLikes;
      });
      if (state.filters.sortLikes === 'asc') {
        result = result.sort((a, b) => a.nbLike - b.nbLike);
      } else if (state.filters.sortLikes === 'desc') {
        result = result.sort((a, b) => b.nbLike - a.nbLike);
      }
      return result;
    });

    const addComment = (articleId: number) => {
      const article = state.articles.find(article => article.id === articleId);
      if (article && state.newComment.username && state.newComment.comment) {
        article.comments.push({
          id: article.comments.length + 1,
          username: state.newComment.username,
          comment: state.newComment.comment
        });
        state.newComment.username = '';
        state.newComment.comment = '';
      }
    };

    const startEditing = (article: any) => {
      state.editArticleData.id = article.id;
      state.editArticleData.title = article.title;
      state.editArticleData.content = article.content;
      article.isEditing = true;
    };

    const cancelEditing = (article: any) => {
      article.isEditing = false;
      state.editArticleData.id = null;
      state.editArticleData.title = '';
      state.editArticleData.content = '';
    };

    const editArticle = (articleId: number) => {
      const article = state.articles.find(article => article.id === articleId);
      if (article && state.editArticleData.title && state.editArticleData.content) {
        article.title = state.editArticleData.title;
        article.content = state.editArticleData.content;
        article.isEditing = false;
        state.editArticleData.id = null;
        state.editArticleData.title = '';
        state.editArticleData.content = '';
      }
    };

    const likeArticle = (articleId: number) => {
      const article = state.articles.find(article => article.id === articleId);
      if (article) {
        article.nbLike += 1;
      }
    };

    const createArticle = () => {
      const newArticle = {
        id: state.articles.length + 1,
        title: state.newArticle.title,
        content: state.newArticle.content,
        author: state.newArticle.author,
        nbLike: 0,
        comments: [],
        showComments: false,
        isEditing: false
      };
      state.articles.push(newArticle);
      state.newArticle.title = '';
      state.newArticle.content = '';
      state.newArticle.author = '';
    };

    const applyFilters = () => {
        console.log('Applying filters', state.filters);
    };

    return { 
      ...toRefs(state), 
      addComment, 
      startEditing, 
      cancelEditing, 
      editArticle, 
      likeArticle, 
      createArticle,
      filteredArticles,
      applyFilters
    };
  },
});
</script>
