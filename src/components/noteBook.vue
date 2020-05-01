<template>
    <div id="notebook">
        <!-- sidebar -->
        <aside class="sidebar">
            <button @click="addNote" 
            :title="addNoteTitle">
            Add Note</button>
            <!-- note-list -->
            <div class="notes">            
              <div class="note" 
              v-for="(note, index) of notes" 
              :key="index"  @click="selectNote(note)" 
              :class="{selected: note === selectedNote}">
              {{note.title}}</div>           
            </div>
        </aside>
        <!-- main pane -->
        <section class="main" v-if="selectedNote">
            <textarea v-model="selectedNote.content"></textarea>
        </section>
        <!-- preview pane -->
        <aside class="preview"
         v-if="selectedNote" 
         v-html="notePreview"></aside>
    </div>
</template>


<script>
import marked from "marked"
// import styles from '../designs/styles.css'

    export default {
        name: 'note-book',
       
        data (){
            return{
                
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
                selectedId: null,
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
            }
        }, 
        watch: {
           notes: {
               handler:'saveNotes',
               deep: true,
           },
           
           
        },
    }
    
</script>

<style scoped>
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
    
    }

    .sidebar {
        width: 20%;
    }
    textarea{
        width: 100%;
        height: 100%;
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