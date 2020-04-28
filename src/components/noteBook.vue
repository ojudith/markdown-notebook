<template>
    <div id="notebook">
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
                content: 'This is a **notebook**',
            }
        },
        computed: {
            notePreview (){
                return marked(this.content)
            }
        }
    }
</script>

<style scoped>
    #notebook {
        display: flex;
        height: 100vh;
    }
    .main{
        width: 60%;
    }

    .preview{
        width:40%;
        background: #f2f2f2;
    
    }

</style>