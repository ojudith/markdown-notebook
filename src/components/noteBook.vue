<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="reveal">
      <md-app-toolbar class="md-primary">
           <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Junik Markdown NoteBook</span>
      </md-app-toolbar>

      <md-app-drawer  :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
         <md-button class="md-dense md-raised  md-primary" 
            @click="addNote" 
            :title="addNoteTitle"><PlusIcon/>
            Add Note</md-button>
        </md-toolbar>

        <md-list>
          

          <!-- note-list -->
            <div class="notes">            
              <div class="note" 
              v-for="(note, index) of sortedNotes" 
              :key="index"  @click="selectNote(note)" 
              :class="{selected: note === selectedNote}">
              <div class="favorite-icon" v-if="note.favorite"><StarIcon/></div>
              <md-list-item>
            <MarkerIcon/>
            <span class="md-list-item-text"> {{note.title}}</span>
          </md-list-item>
             </div>           
            </div>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <section class="main" v-if="selectedNote">
            <div  class="toolbar">
                <!-- rename toolbar -->
               <input type="text" v-model="selectedNote.title" placeholder="new note title"> 
               <!-- favorite icon -->
               <button @click="favoriteNote" title="Favorite note">
                   <span v-if="selectedNote.favorite">
                   <StarIcon/></span>

               <span v-if="!selectedNote.favorite"><StarHalfIcon/></span></button>
                   <!-- {{selectedNote.favorite ? <StarIcon/> :'&'}} -->
               <!-- delete note -->
               <button @click="removeNote"><DeleteIcon/></button>
            </div>
            <textarea v-model="selectedNote.content"></textarea>
            <!-- footer of panel -->
            <div class="toolbar status-bar">
                <span class="date">
                    <span class="label">Created </span>
                    <span class="value">{{selectedNote.created | date }}</span>
                </span>
            </div>
        </section>
        <!-- preview pane -->
        <aside class="preview"
         v-if="selectedNote" 
         v-html="notePreview"></aside>
      </md-app-content>
    </md-app>
  </div>
</template>




<script>
import marked from "marked"
import  "../filter"
import PlusIcon from "vue-material-design-icons/Plus.vue"
import MarkerIcon from "vue-material-design-icons/Marker.vue"
import DeleteIcon from "vue-material-design-icons/DeleteOutline.vue"
import StarIcon from "vue-material-design-icons/Star.vue"
import StarHalfIcon from "vue-material-design-icons/StarOutline.vue"
import '../designs/styles.css'

    export default {
        name: 'note-book',
         components: {
              PlusIcon,
              MarkerIcon,
              DeleteIcon,
              StarIcon,
              StarHalfIcon
         },
       
        data (){
            return{
                menuVisible: false,
            // content: localStorage.getItem('content') || 'You can write in **markdown**',
               
                notes: JSON.parse(localStorage.getItem('notes')) || [
                    {
                        id: 1,
                        title: 'vue in action',
                        content: "This is a **vuex** interesting _course_",
                        created: '30th, April',
                        favorite: false
                    },
                    {
                        id: 2,
                        title: 'vuex state management',
                        content: "This is a **very** interesting _course_",
                        created: '30th, April',
                        favorite: false
                    },
                    {
                        id: 3,
                        title: 'vue router',
                        content: "This is a **vue-router** interesting _course_",
                        created: '30th, April',
                        favorite: false
                    },

                ],
                selectedId: localStorage.getItem('selected-id') || null,
            }
        },
        // created () {
        //     this.content = localStorage.getItem('content') || 'You can write in **markdown**';
        // },
        computed: {
            notePanel() {
                return this.selectedNote ? this.selectedNote.content : 'You can write in **markdown**'
            },
            notePreview (){
                // return marked(this.content)
                return this.selectedNote ? marked(this.selectedNote.content) : marked('You can write in **markdown**')
            },
            addNoteTitle() {
                return this.notes.length + 'note(s) already'
            },
            selectedNote () {
                return this.notes.find(note =>note.id === this.selectedId)
            },
            sortedNotes (){
                return this.notes.slice()
                    .sort((a,b) => a.created - b.created)
                    .sort((a,b) => (a.favorite === b.favorite) ? 0 : a.favorite ? -1 : 1)
            },
        },
        methods: {
            addNote(){
                const time = Date.now()
                const note = {
                    id: String(time),
                    title: 'New note' + (this.notes.length + 1),
                    content: '**Hi** !',
                    created: time,
                    favorite: false,
                }
                // Add to the list
                this.notes.push(note)
            },
            selectNote(note) {
             this.selectedId = note.id
            },
            saveNotes (){
                //stringify to JSON before storing
                localStorage.setItem('notes', JSON.stringify(this.notes))
                console.log('Notes saved!', new Date())
            },
            removeNote (){
                if (this.selectedNote && confirm('Delete the note?')) {
                    //remove note
                    const index = this.notes.indexOf(this.selectedNote)
                    if (index !== -1) {
                        this.notes.splice(index, 1)
                    }
                }
            },
            favoriteNote (){
                this.selectedNote.favorite = !this.selectedNote.favorite
            },
        }, 
        watch: {
           notes: {
               handler:'saveNotes',
               deep: true,
           },
           selectedId (val) {
               localStorage.setItem('selected-id', val)
           }
           
        },
    }
    
</script>

<style scoped>

.page-container {
    width: 100%;
    height:100%;
    background-color: red;
}
 .md-app {
  height:100%;
    border: 1px solid rgba(#000, .12);
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
    #notebook {
        display: flex;
        height: 100vh;
        
    }
    .main{
        width: 45%;
    }

    .preview{
        width: 35%;
        background: #f2f2f2;
        height:70%;
    }

    .sidebar {
        width: 20%;
    }
    textarea{
        width: 100%;
        height: 70%;
    }
    button{
        margin-bottom:20px;
    }
    .note {
        margin-top: 10px;
        cursor: pointer;
    }
    .selected {
        background-color: green;
        color: white;
        padding: 10px;
        margin-right: 15px;
    }

</style>