<template>
    <div id="notebook">
        <!-- sidebar -->
        <aside class="sidebar">
            <button @click="addNote" :title="addNoteTitle">Add Note</button>
            <div class="notes" v-for="(note, index) in notes" :key="index">
                {{note.title}}
            </div>
        </aside>
        <!-- main pane -->
        <section class="main">
            <textarea v-model="content"></textarea>
        </section>
        <!-- preview pane -->
        <aside class="preview" v-html="notePreview"></aside>
    </div>
</template>


<script>
import marked from "marked"

    export default {
        name: 'note-book',
       
        data (){
            return{
                content: localStorage.getItem('content') || 'You can write in **markdown**',
                notes: [
                    {
                        id: 1,
                        title: 'vue in action',
                        content: 'This is a **very** interesting _course_',
                        created: '30th, April',
                        favorite: false
                    },
                    {
                        id: 2,
                        title: 'vuex state management',
                        content: 'This is a **very** interesting _course_',
                        created: '30th, April',
                        favorite: false
                    },
                    {
                        id: 3,
                        title: 'vue router',
                        content: 'This is a **very** interesting _course_',
                        created: '30th, April',
                        favorite: false
                    },

                ],
            }
        },
        // created () {
        //     this.content = localStorage.getItem('content') || 'You can write in **markdown**';
        // },
        computed: {
            notePreview (){
                return marked(this.content)
            },
            addNoteTitle() {
                return this.notes.length + 'note (s) already'
            }
        },
        methods: {
            saveNote() {
                 console.log('saving note:', this.content)
                localStorage.setItem('content', this.content)
                this.reportOperation('saving')
            },
            reportOperation(opName) {
                console.log('The', opName, 'operation was completed!')
            },
            addNote(){
                const time = Date.now()
                const note = {
                    id: String,
                    title: 'New note' + (this.notes.length + 1),
                    content: '**Hi** !',
                    created: time,
                    favorite: false,
                }
                // Add to the list
                this.notes.push(note)
            }
        },
        watch: {
           content: 'saveNote',
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
    .notes {
        margin-top: 10px;
    }

</style>