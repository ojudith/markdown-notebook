<template>
    <div id="notebook">
        <!-- sidebar -->
        <aside class="sidebar">
            <button @click="addNote">Add Note</button>
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
                notes: [],
            }
        },
        // created () {
        //     this.content = localStorage.getItem('content') || 'You can write in **markdown**';
        // },
        computed: {
            notePreview (){
                return marked(this.content)
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
                    id: String(time),
                    title: 'New note' + (this.notes.length + 1),
                    content: '**Hi** !',
                    created: time,
                    favorite: false,
                }
                // Add to the list
                this.note.push(note)
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

</style>